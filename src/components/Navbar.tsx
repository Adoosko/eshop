"use client";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  const handleClick = () => {};
  return (
    <MaxWidthWrapper>
      <nav className="px-5 sticky bg-white dark:bg-slate-950 top-0 left-0 z-50 flex justify-between items-center h-20 w-full   ">
        <div className="items-center flex justify-center ">
          <Image
            className="dark:hidden block"
            src={"/logo.png"}
            alt="logo"
            width={140}
            height={20}
          />
          <Image
            className="hidden dark:block "
            src={"/logo.png"}
            alt="logo"
            width={150}
            height={20}
          />
        </div>
        <ul className="flex gap-4  items-center max-md:hidden">
          {NAV_LINKS.map((link) => {
            return (
              <li className="" key={link.label}>
                <Link href={link.url || ""}>
                  <span
                    className={cn(
                      "font-semibold text-md  text-[#060E29] dark:text-slate-200",
                      {
                        active: "underline",
                      }
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
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
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </MaxWidthWrapper>
  );
};

export default Navbar;
