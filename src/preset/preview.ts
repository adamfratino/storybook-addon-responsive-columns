import { withColumns } from "../withColumns";

export const decorators = [withColumns];
export const parameters = {
  columns: {
    active: false,
    gridColor: "tomato",
    opacity: 50,
    breakpoints: [
      {
        breakpoint: 0,
        columns: 4,
        gap: 8,
      },
      {
        breakpoint: 768,
        columns: 8,
        gap: 16,
      },
      {
        breakpoint: 1024,
        columns: 12,
        gap: 24,
        maxWidth: 1224,
        gutter: 24,
      },
    ],
  },
};
