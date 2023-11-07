import React from "react";
import { styled } from "@storybook/theming";
import { Container, Label } from "./";
import { BooleanControl } from "@storybook/blocks";

type ToggleProps = {
  isActive: boolean;
  onChange?: () => void;
};

const ColumnsToggle: React.FC<ToggleProps> = ({ isActive, onChange }) => (
  <Container display="flex" alignItems="center" gap="16px">
    <Label>Toggle Columns:</Label>
    <BooleanControlContainer>
      <BooleanControl
        name="Toggle Columns"
        defaultValue={isActive}
        value={isActive}
        onChange={onChange}
      />
    </BooleanControlContainer>
  </Container>
);

export default ColumnsToggle;

const BooleanControlContainer = styled.div`
  label {
    margin-bottom: 0;
  }
`;
