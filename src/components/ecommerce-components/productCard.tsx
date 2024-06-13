"use client";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

import toast from "react-hot-toast";

type Props = {
  title: string | null | undefined;
  desc?: string | null | undefined;
  imgUrl: string | undefined;

  discount?: boolean;
  price?: number | null | undefined;
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
    <div className="group relative lg:w-[330px] lg:h-[491px] w-[290px] h-[390px] flex flex-col   gap-5 text-left  ">
      <Image
        src={imgUrl || ""}
        alt={title || ""}
        width={330}
        height={330}
        className="aspect-square w-[330px] h-[330px] rounded-t-xl object-cover overflow-hidden"
      ></Image>

      <div className="flex flex-col gap-8 h-full] w-full mb-4 ">
        <p className="text-[28px] text-[#060E29] dark:text-white line-clamp-1 ">
          {title}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-2xl text-zinc-500 font-light dark:text-white ">
            {price} KČ
          </p>
          <div className="peer h-12 w-12 border-[1px] border-zinc-800 rounded-full p-4 group-hover:bg-black duration-all duration-300  ">
            <ShoppingCart className="text-black w-4 h-4 group-hover:text-white duration-all duration-300" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 ease-in-out group-hover:w-full"></div>
    </div>
  );
};

export default ProductCard;
