import React from "react";
import { BooleanControl } from "@storybook/components";
import { styled } from "@storybook/theming";
import { useGlobals } from "@storybook/api";

const ColumnsToggle: React.FC<{ onChange?: () => void }> = ({ onChange }) => {
  const [globals] = useGlobals();
  const { columnsActive } = globals;

  return (
    <StyledContainer>
      <StyledLabel>Toggle Columns:</StyledLabel>
      <BooleanControl
        name="Toggle Columns"
        value={columnsActive ? columnsActive : false}
        onChange={onChange}
      />
    </StyledContainer>
  );
};

export default ColumnsToggle;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const StyledLabel = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;
