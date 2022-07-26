import React from "react";
import { BooleanControl } from "@storybook/components";
import { Container, Label } from "./";

type ToggleProps = {
  isActive: boolean;
  onChange?: () => void;
};

const ColumnsToggle: React.FC<ToggleProps> = ({ isActive, onChange }) => (
  <Container display="flex" alignItems="center" gap="16px">
    <Label>Toggle Columns:</Label>
    <BooleanControl
      name="Toggle Columns"
      value={isActive}
      onChange={onChange}
    />
  </Container>
);

export default ColumnsToggle;
