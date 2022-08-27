import { withColumns } from "../withColumns";

export const decorators = [withColumns];
export const parameters = {
  columns: {
    breakpoints: [
      {
        breakpoint: 0,
        columns: 2,
        gap: 4,
      },
      {
        breakpoint: 768,
        columns: 9,
        gap: 8,
      },
    ],
  },
};
