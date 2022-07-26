import { ColumnsProps } from "./types";

export const defaults: ColumnsProps = {
  active: false,
  gridColor: "tomato",
  opacity: 30,
  breakpoints: [
    {
      breakpoint: 0,
      columns: 4,
      gap: 4,
      gutter: 16,
    },
    {
      breakpoint: 768,
      columns: 6,
      gap: 8,
      gutter: 32,
    },
    {
      breakpoint: 1024,
      columns: 12,
      gap: 16,
      maxWidth: 1224,
    },
  ],
};
