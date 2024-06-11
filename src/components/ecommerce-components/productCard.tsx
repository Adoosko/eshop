"use client";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
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
    <div className="md:w-[365px] md:h-[591px] w-[290px] h-[469px] flex flex-col px-4 text-center overflow-hidden ">
      <Image
        src={imgUrl || ""}
        alt={title || ""}
        width={365}
        height={365}
        className="w-[365px] h-[400px] rounded-t-xl object-cover overflow-hidden"
      ></Image>

      <div className="flex flex-col gap-8 h-[158px] w-full ">
        <p className="text-[28px] text-[#060E29]">{title}</p>
        <p className="text-2xl font-thin">{price} KČ</p>
      </div>
    </div>
  );
};

export default ProductCard;
