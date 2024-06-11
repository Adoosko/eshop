import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  classname?: string;
};

const MaxWidthWrapper = ({ children, classname }: Props) => {
  return (
    <div className={cn("h-full max-w-screen-2xl mx-auto", classname)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
