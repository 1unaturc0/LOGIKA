import React from "react";

export interface IRulesPageProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}
