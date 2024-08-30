import AdminPanelLayout from "../_components/(sidebar)/admin-panel/admin-panel-layout";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
