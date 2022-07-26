import React from "react";
import type { DecoratorFunction } from "@storybook/addons";
import { useAddonState } from "@storybook/client-api";
import { ADDON_ID } from "./constants";
import { GridOverlay } from "./components/ui";

export const withColumns: DecoratorFunction = (StoryFn) => {
  const [state] = useAddonState(ADDON_ID);

  return (
    <>
      {StoryFn()}
      {state && (
        <GridOverlay
          active={state?.active}
          breakpoints={state?.breakpoints}
          gridColor={state?.gridColor}
        />
      )}
    </>
  );

  // return StoryFn();
};
