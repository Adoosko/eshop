import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LoginLayout = ({ children }: Props) => {
  return <div className="px-6">{children}</div>;
};

export default LoginLayout;
