import React, { useCallback, useEffect } from "react";
import { useAddonState } from "@storybook/api";
import { ADDON_ID } from "../constants";
import { defaults } from "../defaults";
import { ColumnsProps } from "../types";
import {
  ColorControls,
  ColumnHeaders,
  ColumnsToggle,
  Container,
  Input,
} from "./ui";

export const PanelContent: React.FC = () => {
  const [active, setActive] = useAddonState(`${ADDON_ID}_active`, false);
  const [breakpoints, setBreakpoints] = useAddonState(
    `${ADDON_ID}_breakpoints`,
    defaults.breakpoints
  );
  const [gridColor, setGridColor] = useAddonState(
    `${ADDON_ID}_gridColor`,
    defaults.gridColor
  );

  const toggleColumns = useCallback(() => setActive(!active), [active]);

  const updateGridColor = useCallback(
    (gridColor) => setGridColor(gridColor),
    [gridColor]
  );

  const setBreakpointValue = useCallback(
    (property: any, value: string, i: number) => {
      let newBreakpoints = [...breakpoints];
      (newBreakpoints[i] as any)[property] = !(
        property === "maxWidth" && +value <= 0
      )
        ? +value
        : "none";
      setBreakpoints(newBreakpoints);
    },
    [breakpoints]
  );

  return (
    <Container padding="32px">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ColumnsToggle onChange={toggleColumns} isActive={active} />
        <ColorControls onChange={(color) => updateGridColor(color)} />
      </div>
      <ColumnHeaders />
      {breakpoints &&
        breakpoints.map((breakpoint, i) => (
          <Container
            display="flex"
            gap="16px"
            padding="4px 0"
            key={`${breakpoint}_${i}`}
          >
            <Input
              flex="0.5"
              defaultValue={breakpoints[i].breakpoint}
              onChange={(e) =>
                setBreakpointValue("breakpoint", e.target.value, i)
              }
            />
            <Input
              defaultValue={breakpoints[i].columns}
              onChange={(e) => setBreakpointValue("columns", e.target.value, i)}
            />
            <Input
              defaultValue={breakpoints[i].gap}
              onChange={(e) => setBreakpointValue("gap", e.target.value, i)}
            />
            <Input
              defaultValue={breakpoints[i].maxWidth}
              onChange={(e) =>
                setBreakpointValue("maxWidth", e.target.value, i)
              }
            />
          </Container>
        ))}
    </Container>
  );
};
