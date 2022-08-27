# Storybook Addon Responsive Columns

A responsive, grid-based columns overlay. Define your grids using either global or local parameters, and tweak your grid properties using `Columns` controls panel.

View an [interactive demo](https://storybook-addon-responsive-columns.netlify.app/?path=/story/playground--iframe-test).

![example screenshot](https://github.com/adamfratino/storybook-addon-responsive-columns/blob/main/screenshot.png?raw=true)

## Installation

```
yarn add -D storybook-addon-responsive-columns
```

within `.storybook/main.js:`

```
module.exports = {
  addons: ['storybook-addon-responsive-columns'],
};
```

## Usage

`storybook-addon-responsive-columns` comes with some defaults to get your started.

| Property    | Default                                                                                                                                                | Type     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| active      | false                                                                                                                                                  | boolean  |
| gridColor   | string                                                                                                                                                 | "tomato" |
| opacity     | number                                                                                                                                                 | 30       |
| breakpoints | _[see here](https://github.com/adamfratino/storybook-addon-responsive-columns/blob/099dc1bdce931662e77f7ebed53575b48bbf0e45/src/preset/preview.ts#L9)_ | object   |

If you'd like to use custom [parameters](https://storybook.js.org/docs/react/writing-stories/parameters), you can do so globally using the `columns` object in `preview.js`.

```js
export const parameters = {
  columns: {
    active: true,
    gridColor: "salmon",
    opacity: 30,
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
```
