"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/sidebar/useStore";
import { Footer } from "../(footer)/footer";
import { Sidebar } from "../(sidebar)/sidebar";
import { useSidebarToggle } from "@/hooks/sidebar/useSidebarToggle";

export const SidebarPanelLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Footer />
      </footer>
    </>
  );
};
