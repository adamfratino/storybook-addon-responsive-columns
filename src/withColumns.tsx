import React from "react";
import { DecoratorFunction } from "@storybook/addons";
import { useAddonState } from "@storybook/client-api";
import { GridOverlay } from "./components/ui";
import { ADDON_ID } from "./constants";
import { ColumnsProps, GridProps } from "./types";

export const withColumns: DecoratorFunction = (StoryFn) => {
  const [active] = useAddonState(`${ADDON_ID}_active`);
  const [breakpoints] = useAddonState(`${ADDON_ID}_breakpoints`);
  const [gridColor] = useAddonState(`${ADDON_ID}_gridColor`);

  return (
    <>
      {StoryFn()}
      {active && breakpoints && gridColor && (
        <GridOverlay
          active={active as boolean}
          breakpoints={breakpoints as GridProps[]}
          gridColor={gridColor as ColumnsProps["gridColor"]}
        />
      )}
    </>
  );

  // return StoryFn();
};
