import React from "react";
import { DecoratorFunction } from "@storybook/addons";
import { useAddonState } from "@storybook/client-api";
import { useStorybookState } from "@storybook/api";
import { GridOverlay } from "./components/ui";
import { ADDON_ID } from "./constants";
import { ColumnsProps, GridProps } from "./types";

export const withColumns: DecoratorFunction = (StoryFn, context) => {
  const [active] = useAddonState(`${ADDON_ID}_active`);
  // const [breakpoints] = useAddonState(`${ADDON_ID}_breakpoints`);
  const [gridColor] = useAddonState(`${ADDON_ID}_gridColor`);
  const [opacity] = useAddonState(`${ADDON_ID}_opacity`);
  const { parameters } = context;
  const { breakpoints } = parameters.columns;

  return (
    <>
      {StoryFn()}
      <GridOverlay
        active={active as boolean}
        breakpoints={breakpoints as GridProps[]}
        gridColor={gridColor as ColumnsProps["gridColor"]}
        opacity={opacity as ColumnsProps["opacity"]}
      />
    </>
  );
};
