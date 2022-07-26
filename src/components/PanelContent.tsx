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
  const [state, setState] = useAddonState(ADDON_ID, {
    ...defaults,
  });

  const toggleColumns = useCallback(() => {
    setState({
      ...state,
      active: !state.active,
      gridColor: state.gridColor,
      breakpoints: state.breakpoints,
    });
  }, [state.active]);

  const updateGridColor = useCallback(
    (gridColor: ColumnsProps["gridColor"]) => {
      setState({
        ...state,
        active: true,
        gridColor: gridColor,
        breakpoints: state.breakpoints,
      });
    },
    [state.gridColor]
  );

  return (
    <Container padding="32px">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ColumnsToggle onChange={toggleColumns} isActive={state.active} />
        <ColorControls onChange={(color) => updateGridColor(color)} />
      </div>
      {/* <ColumnHeaders />
      {defaults.breakpoints.map((breakpoint, i) => (
        <Container
          display="flex"
          gap="16px"
          padding="4px 0"
          key={`${breakpoint}_${i}`}
        >
          <Input
            flex="0.5"
            defaultValue={defaults.breakpoints[i].breakpoint}
            onChange={(e) =>
              setBreakpointValue("breakpoint", e.target.value, i)
            }
          />
          <Input
            defaultValue={defaults.breakpoints[i].columns}
            onChange={(e) => setBreakpointValue("columns", e.target.value, i)}
          />
          <Input
            defaultValue={defaults.breakpoints[i].gap}
            onChange={(e) => setBreakpointValue("gap", e.target.value, i)}
          />
          <Input
            defaultValue={defaults.breakpoints[i].maxWidth}
            onChange={(e) => setBreakpointValue("maxWidth", e.target.value, i)}
          />
        </Container>
      ))} */}
    </Container>
  );
};
