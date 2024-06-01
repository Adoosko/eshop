import ProductCard from "@/components/ecommerce-components/productCard";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/winClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import { useEffect } from "react";

const HomePage = async () => {
  const wixClient = await wixClientServer();

  const res = await wixClient.products.queryProducts().find();

  console.log(res);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2
     lg:grid-cols-3 "
    >
      {res.items.map((item: products.Product) => (
        <ProductCard
          key={item._id}
          title={item.name}
          desc={item.description}
          imgUrl={item.media?.mainMedia?.image?.url}
          discountInPercent={item.discount?.value || 0}
          price={item.price?.price}
        />
      ))}
      {res.items.map((item) => (
        <div key={item._id}>{item.description}</div>
      ))}
    </div>
  );
};

export default HomePage;
