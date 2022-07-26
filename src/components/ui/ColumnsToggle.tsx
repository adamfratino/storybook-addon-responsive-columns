import React from "react";
import { BooleanControl } from "@storybook/components";
import { styled } from "@storybook/theming";
import { Label } from "./";

type ToggleProps = {
  isActive: boolean;
  onChange?: () => void;
};

const ColumnsToggle: React.FC<ToggleProps> = ({ isActive, onChange }) => (
  <StyledContainer>
    <Label>Toggle Columns:</Label>
    <BooleanControl
      name="Toggle Columns"
      value={isActive}
      onChange={onChange}
    />
  </StyledContainer>
);

export default ColumnsToggle;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;
