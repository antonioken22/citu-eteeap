import {
  Users,
  LayoutGrid,
  LucideIcon,
  BookUser,
  SquareUserRound,
  FileUser
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string, role?: string): Group[] {
  // Base menu that's always shown
  const baseMenus: Group[] = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: "/application-forms",
          label: "Application Forms",
          active: pathname.includes("/application-forms"),
          icon: FileUser,
          submenus: []
        },
        {
          href: "/user-profile",
          label: "User Profile",
          active: pathname.includes("/user-profile"),
          icon: SquareUserRound,
          submenus: []
        }
      ]
    }
  ];

  // Only add admin menus if user is an admin
  if (role === "admin") {
    baseMenus.push({
      groupLabel: "Admin",
      menus: [
        {
          href: "/admin/manage-applications",
          label: "Manage Applications",
          active: pathname.includes("/manage-applications"),
          icon: BookUser,
          submenus: []
        },
        {
          href: "/admin/monitor-users",
          label: "Monitor Users",
          active: pathname.includes("/monitor-users"),
          icon: Users,
          submenus: []
        },
      ]
    });
  }

  return baseMenus;
}
