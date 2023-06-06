import { FC, ReactNode } from "react";

const BlankLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return <main className="container">{children}</main>;
};

export default BlankLayout;
