import { FOOTER_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

type Props = {};

const SOCIALS = [
  "/instagram.png",
  "/youtube.png",
  "/linkedin.png",
  "/facebook.png",
];

const Footer = (props: Props) => {
  return (
    <MaxWidthWrapper classname="mt-auto">
      <footer className="px-5 flex flex-col w-full gap-6 py-6  ">
        <div className="h-[2px] bg-[#060E29] w-full" />
        <div className="flex-col flex max-md:items-center max-lg:gap-6 text-center lg:flex-row justify-between">
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
          <div className="flex gap-3 justify-center">
            {SOCIALS.map((img) => (
              <Image
                src={img}
                key={img}
                width={50}
                height={20}
                alt="social media"
              />
            ))}
          </div>
          <div className="flex flex-col gap-6 lg:text-end">
            {FOOTER_LINKS.map((link) => {
              return (
                <Link href={link.url} key={link.label}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        <p className="mx-auto ">@ 2024 Quinton</p>
      </footer>
    </MaxWidthWrapper>
  );
};

export default Footer;
