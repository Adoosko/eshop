"use client";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import Image from "next/image";
import React from "react";

import toast from "react-hot-toast";

type Props = {
  title: string | null | undefined;
  desc: string | null | undefined;
  imgUrl: string | undefined;

  discount?: boolean;
  price: number | null | undefined;
  discountInPercent: number;
  rating?: number;
  shipping?: string | null | undefined;
  availability?: number;
};

const ProductCard = ({
  title,
  desc,
  imgUrl,
  discountInPercent,
  discount,
  price,
  rating,
  availability,
  shipping,
}: Props) => {
  const handleClick = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-center " : "animate-out "
        } max-w-md w-full bg-background shadow-lg border-zinc-900
         rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <Image
                className=" rounded-full"
                src="/success.png"
                alt=""
                width={15}
                height={15}
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-foreground">
                Produkt bol pridany do kosika
              </p>
            </div>
          </div>
        </div>
        <div className="flex ">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent
             rounded-none rounded-r-lg p-4 flex
              items-center justify-center text-sm 
              font-bold text-primary dark:text-white
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ));
  };
  return (
    <div
      className="shadow-md relative m-10 flex w-full max-w-xs
     flex-col overflow-hidden rounded-lg border
      border-gray-100 bg-card dark:border-zinc-900 "
    >
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
      >
        <Image
          fill
          className="object-cover"
          src={imgUrl || ""}
          alt={title || ""}
        />
        <span
          className={cn(
            "absolute top-0 left-0 m-2 shadow-sm  hidden rounded-full bg-background  px-10",
            " text-center text-2xl font-extrabold  text-foreground ",

            discountInPercent > 0 ? "block" : "hidden"
          )}
        >
          {discountInPercent}%<span className="ml-1 text-indigo-600"> OFF</span>
        </span>
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="/" className="text-muted-foreground">
          <h5 className="text-xl tracking-tight font-semibold text-foreground">
            {title}
          </h5>
        </a>

        <div className="mt-2 mb-5 flex items-center justify-between">
          {/* produkt v zlave  */}
          <span className={cn("text-3xl font-bold text-primary")}>
            {discountInPercent > 0
              ? ((price || 20) * (100 - discountInPercent)) / 100
              : price}
            €
          </span>
          {/* cena produktu */}
          <span
            className={cn(
              "text-2xl font-bold text-zinc-700 line-through",

              discountInPercent > 0 ? "block" : "hidden"
            )}
          >
            {price}€
          </span>
        </div>
        <div
          onClick={handleClick}
          className="flex items-center justify-center rounded-md
         bg-slate-900 px-5 py-2.5 text-center text-sm 
         font-medium text-white hover:bg-gray-700 focus:outline-none
          focus:ring-4 focus:ring-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Pridať do košíka
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
