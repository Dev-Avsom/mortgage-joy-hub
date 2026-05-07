import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Download, Search, LogOut, Phone, Mail, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — HomeBridge Mortgage" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string;
  status: "new" | "contacted" | "qualified" | "closed" | "lost";
  created_at: string;
  admin_notes: string | null;
};

const statusColors: Record<Lead["status"], string> = {
  new: "bg-blue-500/10 text-blue-700 border-blue-500/30",
  contacted: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  qualified: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  closed: "bg-violet-500/10 text-violet-700 border-violet-500/30",
  lost: "bg-red-500/10 text-red-700 border-red-500/30",
};

function AdminPage() {
  const navigate = useNavigate();
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      if (!session) {
        navigate({ to: "/admin/login" });
        return;
      }
      setUserEmail(session.user.email ?? null);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const admin = (roles ?? []).some((r) => r.role === "admin");
      setIsAdmin(admin);
      setAuthReady(true);
      if (admin) await loadLeads();
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate({ to: "/admin/login" });
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setLoading(false);
    if (error) return toast.error(error.message);
    setLeads((data ?? []) as Lead[]);
  };

  const updateStatus = async (id: string, status: Lead["status"]) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success("Status updated");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  const exportCSV = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Source", "Status", "Message"];
    const rows = filtered.map((l) => [
      new Date(l.created_at).toISOString(),
      l.name, l.email, l.phone ?? "", l.source, l.status, (l.message ?? "").replace(/\n/g, " "),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (filter !== "all" && l.status !== filter) return false;
      if (search) {
        const s = search.toLowerCase();
        return l.name.toLowerCase().includes(s) || l.email.toLowerCase().includes(s) || (l.phone ?? "").includes(s);
      }
      return true;
    });
  }, [leads, filter, search]);

  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "new").length;
    const qualified = leads.filter((l) => l.status === "qualified").length;
    const today = leads.filter((l) => {
      const d = new Date(l.created_at);
      return d.toDateString() === new Date().toDateString();
    }).length;
    return { total, newCount, qualified, today };
  }, [leads]);

  if (!authReady) {
    return <div className="p-12 text-center text-muted-foreground">Loading…</div>;
  }

  if (isAdmin === false) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-amber-500" />
        <h1 className="mt-4 text-2xl font-bold">Access denied</h1>
        <p className="mt-2 text-muted-foreground">
          You're signed in as <strong>{userEmail}</strong> but don't have admin access.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          To grant admin access, an existing admin (or the project owner via the backend) must add a row to
          <code className="mx-1 rounded bg-secondary px-1.5 py-0.5 text-xs">user_roles</code>
          with your user ID and role <code className="mx-1 rounded bg-secondary px-1.5 py-0.5 text-xs">'admin'</code>.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button onClick={signOut} variant="outline"><LogOut className="mr-2 h-4 w-4" /> Sign out</Button>
          <Button asChild><Link to="/">Back to site</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Lead Dashboard</h1>
          <p className="text-sm text-muted-foreground">Signed in as {userEmail}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportCSV}><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
          <Button variant="outline" onClick={signOut}><LogOut className="mr-2 h-4 w-4" /> Sign out</Button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total leads" value={stats.total} />
        <StatCard label="New" value={stats.newCount} accent="text-blue-600" />
        <StatCard label="Qualified" value={stats.qualified} accent="text-emerald-600" />
        <StatCard label="Today" value={stats.today} />
      </div>

      <Card className="mt-6 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search name, email, phone…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" onClick={loadLeads} disabled={loading}>{loading ? "Refreshing…" : "Refresh"}</Button>
        </div>
      </Card>

      <Card className="mt-4 overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Lead</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Contact</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">No leads match these filters.</td></tr>
              ) : filtered.map((l) => (
                <tr key={l.id} className="border-b border-border last:border-b-0 hover:bg-secondary/30">
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(l.created_at).toLocaleDateString()}<br />
                    <span className="text-[10px]">{new Date(l.created_at).toLocaleTimeString()}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.email}</div>
                    {l.message && <div className="mt-1 max-w-md text-xs text-muted-foreground">{l.message}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="font-normal">{l.source}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Select value={l.status} onValueChange={(v) => updateStatus(l.id, v as Lead["status"])}>
                      <SelectTrigger className={`w-[130px] border ${statusColors[l.status]}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {l.phone && (
                        <a href={`tel:${l.phone}`} className="rounded p-1.5 hover:bg-secondary" title={l.phone}>
                          <Phone className="h-4 w-4" />
                        </a>
                      )}
                      <a href={`mailto:${l.email}`} className="rounded p-1.5 hover:bg-secondary">
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <Card className="p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={`mt-1 text-3xl font-bold ${accent ?? ""}`}>{value}</div>
    </Card>
  );
}