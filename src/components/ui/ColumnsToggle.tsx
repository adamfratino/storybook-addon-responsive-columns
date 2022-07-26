import React from "react";
import { BooleanControl } from "@storybook/components";
import { Container, Label } from "./";

type ToggleProps = {
  isActive: boolean;
  onChange?: () => void;
};

const ColumnsToggle: React.FC<ToggleProps> = ({ isActive, onChange }) => (
  <Container display="flex" alignItems="center" gap="16px" margin="0 0 32px">
    <Label margin="0 0 8px">Toggle Columns:</Label>
    <BooleanControl
      name="Toggle Columns"
      value={isActive}
      onChange={onChange}
    />
  </Container>
);

export default ColumnsToggle;
