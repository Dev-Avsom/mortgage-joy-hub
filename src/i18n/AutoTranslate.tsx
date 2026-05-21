import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import autoEs from "./auto-es.json";
import autoHi from "./auto-hi.json";
import autoTe from "./auto-te.json";

/**
 * Runtime DOM translator. When the active language is Spanish, this component
 * walks all text nodes (and a few attributes) under <body> and swaps any
 * English string that matches our prebuilt dictionary for its Spanish version.
 * Originals are cached on the node via a WeakMap so we can switch back to
 * English without a full reload. A MutationObserver keeps dynamically rendered
 * content (route changes, dropdowns, toasts) in sync.
 */

const DICTS: Record<string, Record<string, string>> = {
  es: autoEs as Record<string, string>,
  hi: autoHi as Record<string, string>,
  te: autoTe as Record<string, string>,
};
let DICT: Record<string, string> = {};
const ATTRS = ["placeholder", "title", "alt", "aria-label"] as const;
const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "CODE",
  "PRE",
  "TEXTAREA",
  "SVG",
  "PATH",
]);

type Original = { text?: string; attrs?: Record<string, string> };
const originals = new WeakMap<Node, Original>();

function lookup(s: string): string | null {
  const trimmed = s.trim();
  if (!trimmed) return null;
  const hit = DICT[trimmed];
  if (!hit || hit === trimmed) return null;
  // Preserve surrounding whitespace
  const leading = s.match(/^\s*/)?.[0] ?? "";
  const trailing = s.match(/\s*$/)?.[0] ?? "";
  return leading + hit + trailing;
}

function translateTextNode(node: Text) {
  if (!node.nodeValue) return;
  if (node.parentElement && SKIP_TAGS.has(node.parentElement.tagName)) return;
  const translated = lookup(node.nodeValue);
  if (translated === null) return;
  const prev = originals.get(node) ?? {};
  if (!prev.text) prev.text = node.nodeValue;
  originals.set(node, prev);
  node.nodeValue = translated;
}

function translateAttributes(el: Element) {
  for (const attr of ATTRS) {
    const v = el.getAttribute(attr);
    if (!v) continue;
    const translated = lookup(v);
    if (translated === null) continue;
    const prev = originals.get(el) ?? {};
    prev.attrs = prev.attrs ?? {};
    if (!(attr in prev.attrs)) prev.attrs[attr] = v;
    originals.set(el, prev);
    el.setAttribute(attr, translated);
  }
}

function translateSubtree(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root as Text);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const el = root as Element;
  if (SKIP_TAGS.has(el.tagName)) return;
  translateAttributes(el);
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      n.parentElement && SKIP_TAGS.has(n.parentElement.tagName)
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });
  let n: Node | null;
  while ((n = walker.nextNode())) translateTextNode(n as Text);
  // Attributes on all descendants
  el.querySelectorAll("*").forEach((child) => translateAttributes(child));
}

function restoreSubtree(root: Node) {
  const apply = (node: Node) => {
    const o = originals.get(node);
    if (o) {
      if (o.text && node.nodeType === Node.TEXT_NODE) {
        (node as Text).nodeValue = o.text;
      }
      if (o.attrs && node.nodeType === Node.ELEMENT_NODE) {
        for (const [k, v] of Object.entries(o.attrs)) {
          (node as Element).setAttribute(k, v);
        }
      }
    }
  };
  apply(root);
  if (root.nodeType === Node.ELEMENT_NODE) {
    const el = root as Element;
    const walker = document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
    );
    let n: Node | null;
    while ((n = walker.nextNode())) apply(n);
  }
}

export function AutoTranslate() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const raw = (i18n.resolvedLanguage || i18n.language || "en").toLowerCase();
    const code = raw.startsWith("es") ? "es"
      : raw.startsWith("hi") ? "hi"
      : raw.startsWith("te") ? "te"
      : "en";
    document.documentElement.lang = code;

    if (code === "en" || !DICTS[code]) {
      DICT = {};
      restoreSubtree(document.body);
      return;
    }
    DICT = DICTS[code];

    let scheduled = false;
    let pending: Node[] = [];

    const flush = () => {
      scheduled = false;
      const batch = pending;
      pending = [];
      observer.disconnect();
      for (const n of batch) {
        if (n.isConnected) translateSubtree(n);
      }
      observer.observe(document.body, observerOpts);
    };

    const schedule = (node: Node) => {
      pending.push(node);
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(flush);
      }
    };

    const observerOpts: MutationObserverInit = {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...ATTRS],
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "characterData" && m.target.nodeType === Node.TEXT_NODE) {
          schedule(m.target);
        } else if (m.type === "attributes" && m.target.nodeType === Node.ELEMENT_NODE) {
          schedule(m.target);
        } else if (m.type === "childList") {
          m.addedNodes.forEach((n) => schedule(n));
        }
      }
    });

    // Initial sweep
    translateSubtree(document.body);
    observer.observe(document.body, observerOpts);

    return () => observer.disconnect();
  }, [i18n.resolvedLanguage, i18n.language]);

  return null;
}