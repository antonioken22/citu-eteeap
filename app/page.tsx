import { redirect } from "next/navigation";

// This component will always redirect to /dashboard
export default function RedirectToDashboard() {
  // Trigger the server-side redirect
  redirect("/dashboard");

  // Optional: Return null or some loading state while the redirect is processed
  // TODO: Return a loading spinner or home page design (optional).
  return null;
}
