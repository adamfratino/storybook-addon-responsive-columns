import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { styled } from "@storybook/theming";
import { Button, Form } from "@storybook/components";

export const DEFAULT_VALUES = {
  columns: 12,
  gap: 16,
  maxWidth: 1224,
};

export const PanelContent: React.FC = () => {
  const [{ columnsActive, columns, gap, maxWidth }, updateGlobals] =
    useGlobals();

  const toggleColumns = useCallback(
    () =>
      updateGlobals({
        columnsActive: columnsActive ? undefined : true,
      }),
    [columnsActive]
  );

  const setColumns = useCallback(
    (cols: string) =>
      updateGlobals({
        columns: cols,
      }),
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

  return (
    <div style={{ padding: "16px" }}>
      <Button primary onClick={toggleColumns}>
        toggle columns
      </Button>
      <br />
      <Form.Input
        defaultValue={DEFAULT_VALUES.columns}
        onChange={(e) => setColumns((e.target as HTMLInputElement).value)}
        size="100%"
        type="number"
      />
      <Form.Input
        defaultValue={DEFAULT_VALUES.gap}
        onChange={(e) => setGap((e.target as HTMLInputElement).value)}
        size="100%"
        type="number"
      />
      <Form.Input
        defaultValue={DEFAULT_VALUES.maxWidth}
        onChange={(e) => setMaxWidth((e.target as HTMLInputElement).value)}
        size="100%"
        type="number"
      />
    </div>
  );
};
