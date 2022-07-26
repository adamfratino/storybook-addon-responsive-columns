import React, { useCallback, useEffect } from "react";
import { useAddonState } from "@storybook/api";
import { ADDON_ID } from "../constants";
import { defaults } from "../defaults";
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
 * @todo clean up UI, responsive layout
 * @todo add inset padding
 * @todo display viewport width
 * @todo get dynamic breakpoint values working?
 *   @todo timebox: 2, otherwise set as a row label
 *   @todo add option to add/remove breakpoint row
 * */
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
  const [opacity, setOpacity] = useAddonState(
    `${ADDON_ID}_opacity`,
    defaults.opacity
  );

  const toggleColumns = useCallback(() => setActive(!active), [active]);

  const updateGridColor = useCallback(
    (gridColor) => setGridColor(gridColor),
    [gridColor]
  );

  const updateOpacity = useCallback(
    (opacity) => {
      setOpacity(opacity);
    },
    [opacity]
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
          <ColumnsToggle onChange={toggleColumns} isActive={active} />
        </div>
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <OpacityControls
            onChange={(opacity) => updateOpacity(opacity)}
            defaultValue={opacity}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <ColorControls onChange={(color) => updateGridColor(color)} />
        </div>
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
