import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { BooleanControl, Form } from "@storybook/components";
import { ColumnHeaders, ColumnsToggle, Container, Input } from "./ui";
import { DEFAULT_VALUES } from "./defaults";

export const PanelContent: React.FC = () => {
  const [{ columnsActive, columns, gap, maxWidth, breakpoint }, updateGlobals] =
    useGlobals();

  const toggleColumns = useCallback(
    () => updateGlobals({ columnsActive: !columnsActive }),
    [columnsActive]
  );

  const setColumns = useCallback(
    (cols: string) => updateGlobals({ columns: cols }),
    [columns]
  );

  const setGap = useCallback(
    (gap: string) => updateGlobals({ gap: gap }),
    [gap]
  );

  const setMaxWidth = useCallback(
    (maxWidth: string) => updateGlobals({ maxWidth: maxWidth }),
    [maxWidth]
  );

  const setBreakpoint = useCallback(
    (breakpoint: string) => updateGlobals({ breakpoint: breakpoint }),
    [breakpoint]
  );

  return (
    <Container padding="32px">
      <ColumnsToggle onChange={toggleColumns} />
      <ColumnHeaders />
      {DEFAULT_VALUES.map((breakpoint, i) => (
        <Container display="flex" gap="16px" padding="4px 0">
          <Input
            flex="0.5"
            defaultValue={DEFAULT_VALUES[i].breakpoint}
            onChange={(e) => setBreakpoint(e.target.value)}
          />
          <Input
            defaultValue={DEFAULT_VALUES[i].columns}
            onChange={(e) => setColumns(e.target.value)}
          />
          <Input
            defaultValue={DEFAULT_VALUES[i].gap}
            onChange={(e) => setGap(e.target.value)}
          />
          <Input
            defaultValue={DEFAULT_VALUES[i].maxWidth}
            onChange={(e) => setMaxWidth(e.target.value)}
          />
        </Container>
      ))}
    </Container>
  );
};
