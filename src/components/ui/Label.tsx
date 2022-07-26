import React, { CSSProperties } from "react";
import { styled } from "@storybook/theming";

type LabelProps = {
  margin?: CSSProperties["margin"];
};

const Label: React.FC<LabelProps> = ({ margin, children }) => (
  <StyledLabel margin={margin}>{children}</StyledLabel>
);

export default Label;

const StyledLabel = styled.div<LabelProps>`
  font-weight: bold;
  ${({ margin }) => `margin: ${margin}`};
`;
