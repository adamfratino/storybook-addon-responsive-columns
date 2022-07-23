import type { DecoratorFunction } from "@storybook/addons";
import { useEffect, useGlobals } from "@storybook/addons";
import { DEFAULT_VALUES } from "./components/PanelContent";

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
  const [{ columnsActive, columns, gap, maxWidth }] = useGlobals();

  useEffect(() => {
    displayToolState(`#root`, { columnsActive, columns, gap, maxWidth });
  }, [columnsActive, columns, gap, maxWidth]);

  return StoryFn();
};

function displayToolState(selector: string, state: any) {
  const rootElement = document.querySelector(selector);
  let columnsElement = rootElement.querySelector("aside");
  // const previewWidth = rootElement.getBoundingClientRect().width;
  const column = document.createElement("div");
  const { columnsActive, columns, gap, maxWidth } = state;

  if (!columnsElement) {
    columnsElement = document.createElement("aside");
  } else {
    columnsElement.replaceChildren();
  }

  columnsElement.style.cssText = `
    display: ${columnsActive ? "flex" : "none"};
    position: absolute;
    inset: 0;
    max-width: ${maxWidth ? maxWidth : DEFAULT_VALUES.maxWidth}px;
    margin: 0 auto;
    gap: ${gap ? gap : DEFAULT_VALUES.gap}px;
    opacity: 0.3;
  `;

  column.style.cssText = `
    flex: 1;
    background: tomato;
  `;

  rootElement.appendChild(columnsElement);
  for (let i = 0; i < (columns ? columns : DEFAULT_VALUES.columns); i++) {
    columnsElement.appendChild(column.cloneNode(true));
  }
}
