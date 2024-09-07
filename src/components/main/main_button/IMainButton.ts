import React from "react";

export interface IMainButton {
  content: string;
  isActive: boolean;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}
