"use client";

import { UserButton } from "@clerk/nextjs";

export function UserNav() {
  return <UserButton afterSwitchSessionUrl="/sign-in" />;
}
