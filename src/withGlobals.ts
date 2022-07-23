import type { DecoratorFunction } from "@storybook/addons";
import { useEffect, useGlobals } from "@storybook/addons";
import { DEFAULT_VALUES } from "./components/defaults";

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
  const [{ columnsActive, columns, gap, maxWidth, breakpoint }] = useGlobals();

  useEffect(() => {
    displayColumnState(`#root`, {
      columnsActive,
      columns,
      gap,
      maxWidth,
      breakpoint,
    });
  }, [columnsActive, columns, gap, maxWidth, breakpoint]);

  return StoryFn();
};

function displayColumnState(selector: string, state: any) {
  const rootElement = document.querySelector(selector);
  let columnsElement = rootElement.querySelector("aside");
  // const previewWidth = rootElement.getBoundingClientRect().width;
  const column = document.createElement("div");
  const { columnsActive, columns, gap, maxWidth, breakpoint } = state;
  const breakpointsArray = DEFAULT_VALUES.map(({ breakpoint }) => breakpoint);

  console.log(breakpointsArray);

  if (!columnsElement) {
    columnsElement = document.createElement("aside");
  } else {
    columnsElement.replaceChildren();
  }

  columnsElement.style.cssText = `
    display: ${columnsActive ? "flex" : "none"};
    position: absolute;
    inset: 0;
    max-width: ${maxWidth ? maxWidth : "none"}px;
    margin: 0 auto;
    gap: ${gap ? gap : DEFAULT_VALUES[0].gap}px;
    opacity: 0.3;
  `;

  column.style.cssText = `
    flex: 1;
    background: tomato;
  `;

  rootElement.appendChild(columnsElement);
  for (let i = 0; i < (columns ? columns : DEFAULT_VALUES[0].columns); i++) {
    columnsElement.appendChild(column.cloneNode(true));
  }
}
