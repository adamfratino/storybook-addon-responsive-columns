import type { DecoratorFunction } from "@storybook/addons";
import { useEffect, useGlobals } from "@storybook/addons";
import { useAddonState } from "@storybook/client-api";
import { ADDON_ID } from "./constants";
import { defaults } from "./defaults";

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
  const [{ columnsActive }] = useGlobals();
  const [currentBreakpoints] = useAddonState(ADDON_ID);
  // const [columnsActive] = useAddonState(ADDON_ID)

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (currentBreakpoints)
        displayColumnState({ columnsActive, currentBreakpoints });
    });
    return window.removeEventListener("resize", () => {
      if (currentBreakpoints)
        displayColumnState({ columnsActive, currentBreakpoints });
    });
  }, [currentBreakpoints]);

  useEffect(() => {
    displayColumnState({ columnsActive, currentBreakpoints });
  }, [columnsActive, currentBreakpoints]);

  return StoryFn();
};

function displayColumnState(state: any) {
  const rootElement = document.querySelector("#root");
  let columnsElement = rootElement.querySelector("aside");
  const column = document.createElement("div");
  const { columnsActive, currentBreakpoints } = state;
  const breakpointsArray = defaults.breakpoints.map(
    ({ breakpoint }) => breakpoint
  );
  let activeIndex = 0;

  breakpointsArray.every((bp, i) => {
    if (!window.matchMedia(`(min-width: ${bp}px)`).matches) return false;
    activeIndex = i;
    return true;
  });

  const buildColumns = () => {
    if (currentBreakpoints) {
      columnsElement.style.cssText = `
        display: ${columnsActive ? "flex" : "none"};
        position: absolute;
        inset: 0;
        min-height: ${rootElement.getBoundingClientRect().height}px;
        max-width: ${
          currentBreakpoints[activeIndex].maxWidth
            ? `${currentBreakpoints[activeIndex].maxWidth}px`
            : "none"
        };
        margin: 0 auto;
        gap: ${currentBreakpoints[activeIndex].gap}px;
        opacity: 0.3;
      `;

      column.style.cssText = `
        flex: 1;
        background: tomato;
      `;

      for (let i = 0; i < currentBreakpoints[activeIndex].columns; i++) {
        columnsElement.appendChild(column.cloneNode(true));
      }
    }
  };

  if (!columnsElement) {
    columnsElement = document.createElement("aside");
    rootElement.appendChild(columnsElement);
  } else {
    columnsElement.innerHTML = "";
  }

  buildColumns();
}
