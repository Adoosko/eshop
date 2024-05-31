import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants";

const Navbar = () => {
  const handleClick = () => {};
  return (
    <nav className="flex justify-between items-center h-20 w-full pr-6  border-b-2 dark:border-b-zinc-600">
      <div className="items-center flex justify-center">
        <Image
          className="dark:hidden block"
          src={"/logo.svg"}
          alt="logo"
          width={150}
          height={20}
        />
        <Image
          className="hidden dark:block"
          src={"/logo-dark.svg"}
          alt="logo"
          width={150}
          height={20}
        />
      </div>
      <ul className="flex gap-4  items-center max-md:hidden">
        {NAV_LINKS.map((link) => (
          <li
            className="font-semibold text-md text-muted-foreground dark:text-slate-200"
            key={link.label}
          >
            <Link href={link.url}>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
        <li>
          <ModeToggle />
        </li>
      </ul>
      {/* ˇMobiile nav  */}
      <div className="items-center md:hidden flex gap-3">
        <ModeToggle />
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="dark-hidden block w-8 h-8 " />
          </SheetTrigger>
          <SheetContent className="bg-white dark:bg-zinc-900">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
