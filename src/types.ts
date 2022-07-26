import { CSSProperties } from "react";

export type GridProps = {
  breakpoint: number;
  columns: number;
  gap: CSSProperties["gap"];
  gutter?: number;
  maxWidth?: CSSProperties["maxWidth"];
};

export type ColumnsProps = {
  active: boolean;
  gridColor?: CSSProperties["color"];
  opacity?: CSSProperties["opacity"];
  breakpoints: GridProps[];
};
