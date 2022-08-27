import React, { useCallback, useEffect, useState } from "react";
import { useAddonState, useParameter } from "@storybook/api";
import { ADDON_ID, PARAM_KEY } from "../constants";
import { ColumnsProps, GridProps } from "../types";
import {
  ColorControls,
  ColumnHeaders,
  ColumnsToggle,
  Container,
  Input,
  OpacityControls,
} from "./ui";

/**
 * our controls panel (the bread & butter)
 * @todo display viewport width
 * @todo clean up UI, responsive layout
 * */
export const PanelContent: React.FC = () => {
  const parameters: ColumnsProps = useParameter(PARAM_KEY);
  const [isLoaded, setIsLoaded] = useAddonState(`${ADDON_ID}_isLoaded`);
  const [breakpoints, setBreakpoints] = useAddonState(
    `${ADDON_ID}_breakpoints`
  );
  const [active, setActive] = useAddonState(`${ADDON_ID}_active`);
  const [gridColor, setGridColor] = useAddonState(`${ADDON_ID}_gridColor`);
  const [opacity, setOpacity] = useAddonState(`${ADDON_ID}_opacity`);

  const toggleColumns = useCallback(() => {
    setActive(!active);
  }, [active]);

  const updateGridColor = useCallback(
    (gridColor) => setGridColor(gridColor),
    [gridColor]
  );

  const updateOpacity = useCallback(
    (opacity) => setOpacity(opacity),
    [opacity]
  );

  const setBreakpointValue = useCallback(
    (property: any, value: string, i: number) => {
      let newBreakpoints = [...(breakpoints as [])];
      (newBreakpoints[i] as any)[property] = !(
        property === "maxWidth" && +value <= 0
      )
        ? +value
        : "none";
      setBreakpoints(newBreakpoints);
    },
    [breakpoints]
  );

  useEffect(() => {
    if (parameters && !isLoaded) {
      const { active, gridColor, opacity, breakpoints } = parameters;
      const getParameters = async () => {
        await setBreakpoints(breakpoints);
        await setGridColor(gridColor);
        await setOpacity(opacity);
        return await setActive(active);
      };
      getParameters().then((data) => setIsLoaded(true));
    }
  }, [parameters]);

  return (
    <>
      {isLoaded ? (
        <Container padding="32px">
          <div
            style={{
              display: "flex",
              alignItems: " center",
              marginBottom: "16px",
              gap: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 2,
                marginRight: "auto",
              }}
            >
              <ColumnsToggle
                onChange={toggleColumns}
                isActive={active as boolean}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <OpacityControls
                onChange={(opacity) => updateOpacity(opacity)}
                defaultValue={opacity}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <ColorControls
                defaultColor={gridColor as string}
                onChange={(color) => updateGridColor(color)}
              />
            </div>
          </div>
          <ColumnHeaders />
          {breakpoints &&
            (breakpoints as GridProps[]).map((breakpoint, i) => (
              <Container
                display="flex"
                gap="16px"
                padding="4px 0"
                key={`${breakpoint}_${i}`}
              >
                <Input
                  flex="0.5"
                  defaultValue={breakpoint.breakpoint}
                  onChange={(e) =>
                    setBreakpointValue("breakpoint", e.target.value, i)
                  }
                />
                <Input
                  defaultValue={breakpoint.columns}
                  onChange={(e) =>
                    setBreakpointValue("columns", e.target.value, i)
                  }
                />
                <Input
                  defaultValue={breakpoint.gap}
                  onChange={(e) => setBreakpointValue("gap", e.target.value, i)}
                />
                <Input
                  defaultValue={breakpoint.maxWidth}
                  onChange={(e) =>
                    setBreakpointValue("maxWidth", e.target.value, i)
                  }
                />
                <Input
                  defaultValue={breakpoint.gutter}
                  onChange={(e) =>
                    setBreakpointValue("gutter", e.target.value, i)
                  }
                />
              </Container>
            ))}
        </Container>
      ) : (
        <div style={{ display: "none" }}>loading placeholder</div>
      )}
    </>
  );
};
