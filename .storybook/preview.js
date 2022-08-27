export const parameters = {
  layout: "fullscreen",
  actions: { disable: true },
  backgrounds: { disable: true },
  toolbars: { disable: true },
  previewTabs: { "storybook/docs/panel": { hidden: true } },
  columns: {
    active: true,
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
        gap: 16,
        maxWidth: 1224,
        gutter: 24,
      },
    ],
  },
};
