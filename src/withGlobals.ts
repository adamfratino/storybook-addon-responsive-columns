import type { DecoratorFunction } from "@storybook/addons";
import { useEffect, useGlobals } from "@storybook/addons";
import { DEFAULT_VALUES } from "./components/defaults";

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
  const [{ columnsActive, breakpoints }, updateGlobals] = useGlobals();

  useEffect(() => {
    updateGlobals({
      columnsActive: false,
      breakpoints: DEFAULT_VALUES,
    });

    window.addEventListener("resize", () =>
      displayColumnState({ columnsActive, breakpoints })
    );
    return window.removeEventListener("resize", () =>
      displayColumnState({ columnsActive, breakpoints })
    );
  }, []);

  useEffect(() => {
    displayColumnState({ columnsActive, breakpoints });
  }, [columnsActive, breakpoints]);

  return StoryFn();
};

function displayColumnState(state: any) {
  const rootElement = document.querySelector("#root");
  let columnsElement = rootElement.querySelector("aside");
  const column = document.createElement("div");
  const { columnsActive, breakpoints } = state;
  const breakpointsArray = DEFAULT_VALUES.map(({ breakpoint }) => breakpoint);
  let activeIndex = 0;
  console.log(breakpoints);

  breakpointsArray.every((bp, i) => {
    if (!window.matchMedia(`(min-width: ${bp}px)`).matches) return false;
    activeIndex = i;
    return true;
  });

  const buildColumns = () => {
    if (breakpoints) {
      columnsElement.style.cssText = `
        display: ${columnsActive ? "flex" : "none"};
        position: absolute;
        inset: 0;
        min-height: ${rootElement.getBoundingClientRect().height}px;
        max-width: ${
          breakpoints[activeIndex].maxWidth
            ? `${breakpoints[activeIndex].maxWidth}px`
            : "none"
        };
        margin: 0 auto;
        gap: ${breakpoints[activeIndex].gap}px;
        opacity: 0.3;
      `;

      column.style.cssText = `
        flex: 1;
        background: tomato;
      `;

      for (let i = 0; i < breakpoints[activeIndex].columns; i++) {
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
