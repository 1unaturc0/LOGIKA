import React from "react";

export interface IModalWindowButtonProps {
  isConfirm: boolean;
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}
