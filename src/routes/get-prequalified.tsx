import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const APPLY_URL = "https://ensurehomeloans.my1003app.com/950536/register?time=1779206112172";

export const Route = createFileRoute("/get-prequalified")({
  head: () => ({
    meta: [
      { title: "Apply Now — Ensure Home Loans" },
      { name: "description", content: "Start your mortgage application with Ensure Home Loans." },
    ],
  }),
  component: PrequalRedirect,
});

function PrequalRedirect() {
  useEffect(() => {
    window.location.replace(APPLY_URL);
  }, []);
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-muted-foreground">
        Redirecting you to our secure application…{" "}
        <a href={APPLY_URL} className="text-primary underline">Click here if not redirected</a>.
      </p>
    </div>
  );
}
