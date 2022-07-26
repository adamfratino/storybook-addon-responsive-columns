import React, { useState } from "react";
import { RangeControl } from "@storybook/components";
import { Container, Label } from "./";

type OpacityControlsProps = {
  defaultValue?: any;
  onChange?: (e: any) => void;
};

const OpacityControls: React.FC<OpacityControlsProps> = ({
  defaultValue,
  onChange,
}) => {
  const [opacity, setOpacity] = useState(defaultValue || 40);

  return (
    <Container display="flex" alignItems="center" gap="16px">
      <Label>Set Opacity:</Label>
      <RangeControl
        name="opacity"
        onChange={(e) => {
          onChange(e);
          setOpacity(e);
        }}
        value={opacity}
        defaultValue={defaultValue}
        min={0}
        max={100}
        step={10}
      />
    </Container>
  );
};

export default OpacityControls;
