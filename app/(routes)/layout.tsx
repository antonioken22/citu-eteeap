import SidebarPanelLayout from "../_components/(sidebar-panel-layout)/sidebar-panel-layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarPanelLayout>{children}</SidebarPanelLayout>;
}
