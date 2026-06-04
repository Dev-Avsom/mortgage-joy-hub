import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/loan-officers/")({
  loader: async () => {
    throw redirect({ to: "/find-officer" });
  },
});
