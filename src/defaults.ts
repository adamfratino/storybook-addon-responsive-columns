import { ColumnsProps } from "./types";

export const defaults: ColumnsProps = {
  active: false,
  gridColor: "tomato",
  breakpoints: [
    {
      breakpoint: 0,
      columns: 4,
      gap: 4,
    },
    {
      breakpoint: 768,
      columns: 6,
      gap: 8,
    },
    {
      breakpoint: 1024,
      columns: 12,
      gap: 16,
      maxWidth: 1224,
    },
  ],
};
