import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { ColumnHeaders, ColumnsToggle, Container, Input } from "./ui";
import { DEFAULT_VALUES } from "./defaults";

export const PanelContent: React.FC = () => {
  const [{ columnsActive, breakpoints }, updateGlobals] = useGlobals();

  const toggleColumns = useCallback(
    () => updateGlobals({ columnsActive: !columnsActive }),
    [columnsActive]
  );

  const setBreakpointValue = useCallback(
    (property: any, value: string, i: number) => {
      let newBreakpoints = [...breakpoints];
      newBreakpoints[i][property] = !(property === "maxWidth" && +value <= 0)
        ? +value
        : undefined;
      updateGlobals({ breakpoints: newBreakpoints });
    },
    [breakpoints]
  );

  return (
    <Container padding="32px">
      <ColumnsToggle onChange={toggleColumns} />
      <ColumnHeaders />
      {DEFAULT_VALUES.map((breakpoint, i) => (
        <Container
          display="flex"
          gap="16px"
          padding="4px 0"
          key={`${breakpoint}_${i}`}
        >
          <Input
            flex="0.5"
            defaultValue={DEFAULT_VALUES[i].breakpoint}
            onChange={(e) =>
              setBreakpointValue("breakpoint", e.target.value, i)
            }
          />
          <Input
            defaultValue={DEFAULT_VALUES[i].columns}
            onChange={(e) => setBreakpointValue("columns", e.target.value, i)}
          />
          <Input
            defaultValue={DEFAULT_VALUES[i].gap}
            onChange={(e) => setBreakpointValue("gap", e.target.value, i)}
          />
          <Input
            defaultValue={DEFAULT_VALUES[i].maxWidth}
            onChange={(e) => setBreakpointValue("maxWidth", e.target.value, i)}
          />
        </Container>
      ))}
    </Container>
  );
};
