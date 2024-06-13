import ProductCard from "@/components/ecommerce-components/productCard";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/winClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import { useEffect } from "react";
import styles from "./index.module.css";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const HomePage = async () => {
  const wixClient = await wixClientServer();

  const res = await wixClient.products.queryProducts().find();

  console.log(res);

  return (
    <div className="relative flex flex-col items-center text-center px-5 overflow-hidden">
      <div className="dark:hidden w-screen">
        <div className={styles.polygon}></div>
      </div>
      <div className="hidden dark:block w-screen">
        <div className={styles.polygonDark}></div>
      </div>

      <div className="flex flex-col gap-8 mt-10  max-w-[1440px]">
        <h1 className="text-6xl text-[#D9D9D9] ">
          Podivejte sa na nase
          <span className="text-[#4E609F]"> Produkty</span>
        </h1>
        <p className="text-[#D9D9D9] text-lg lg:text-2xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting the
          industry sLorem Ipsum is simply dummy text of the printing and
          typesetting the industrysLorem Ipsum is simply dummy text of the
          printing
        </p>
      </div>

      <div
        className="mt-16 grid grid-cols-1 md:grid-cols-2 z-10
     xl:grid-cols-3 gap-6 md:gap-10 xl:gap-10 "
      >
        {res.items.map((item: products.Product) => (
          <ProductCard
            key={item._id}
            title={item.name}
            imgUrl={item.media?.mainMedia?.image?.url}
            discountInPercent={item.discount?.value || 0}
            price={item.price?.price}
          />
        ))}
      </div>

      <h2 className="text-3xl">PRODUKTY CO VIDIS SU PREBRATE Z WIXU</h2>
    </div>
  );
};

export default HomePage;
