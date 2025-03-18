import { JSX, ReactElement, ReactNode } from "react";

export type Menu = {
  id: number;
  title: string;
  path: string;
  newTab: boolean;
  icon?: ReactNode | ReactElement | JSX.Element;
};
