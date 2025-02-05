"use server";

import { redirect } from "next/navigation";

// This component will always redirect to /dashboard
export default async function RedirectToDashboard() {
  // Trigger the server-side redirect
  redirect("/dashboard");

  // TODO: Return a Landing Page.
  return null;
}
