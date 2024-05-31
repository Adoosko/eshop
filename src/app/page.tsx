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
    <div className="">
      {res.items.map((item: products.Product) => (
        <div key={item._id}>
          <h1>{item.name}</h1>
          <Image
            src={item.media?.mainMedia?.image?.url || "/product.png"}
            alt="risova opicka"
            width={200}
            height={200}
          ></Image>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
