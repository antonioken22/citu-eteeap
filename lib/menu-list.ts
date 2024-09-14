import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  BookUser
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

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
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
    },
  ];
}
