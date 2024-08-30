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
      groupLabel: "Admin Tools",
      menus: [
        {
          href: "/applicants",
          label: "Applicants",
          active: pathname.includes("/applicants"),
          icon: BookUser,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Admin Controls",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
      ]
    }
  ];
}
