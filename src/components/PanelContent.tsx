import React, { useCallback, useEffect } from "react";
import { useGlobals, useAddonState } from "@storybook/api";
import { ColumnHeaders, ColumnsToggle, Container, Input } from "./ui";
import { defaults } from "../defaults";
import { ADDON_ID } from "../constants";

export const PanelContent: React.FC = () => {
  const [{ columnsActive = false }, updateGlobals] = useGlobals();
  const [currentBreakpoints, setCurrentBreakpoints] = useAddonState(ADDON_ID, [
    ...defaults.breakpoints,
  ]);

  useEffect(() => {
    setCurrentBreakpoints(defaults.breakpoints);
  }, [columnsActive]);

  const toggleColumns = useCallback(() => {
    updateGlobals({ columnsActive: columnsActive ? undefined : true });
  }, [columnsActive]);

  const setBreakpointValue = useCallback(
    (property: any, value: string, i: number) => {
      let newBreakpoints = [...currentBreakpoints];

      (newBreakpoints[i] as any)[property] = !(
        property === "maxWidth" && +value <= 0
      )
        ? +value
        : undefined;

      setCurrentBreakpoints(newBreakpoints);
    },
    [currentBreakpoints]
  );

  return (
    <Container padding="32px">
      <ColumnsToggle onChange={toggleColumns} />
      <ColumnHeaders />
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
      ))}
    </Container>
  );
};
