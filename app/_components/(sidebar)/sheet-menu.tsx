import Link from "next/link";
import { MenuIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Menu } from "./menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="relative h-6 w-6 mr-1">
                <Image
                  priority
                  alt="CIT-U ETEEAP Logo"
                  src="/citu-eteeap-logo.svg"
                  fill
                  className="dark:hidden"
                />
                <Image
                  priority
                  alt="CIT-U ETEEAP Logo"
                  src="/citu-eteeap-logo.svg"
                  fill
                  className="hidden dark:block"
                />
              </div>
              <SheetTitle className="font-bold text-lg">
                CIT-U ETEEAP
              </SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}