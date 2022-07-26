import React, { CSSProperties } from "react";
import { styled } from "@storybook/theming";

type LabelProps = {
  margin?: CSSProperties["margin"];
};

const Label: React.FC<LabelProps> = ({ margin = 0, children }) => (
  <StyledLabel margin={margin}>{children}</StyledLabel>
);

export default Label;

const StyledLabel = styled.div<LabelProps>`
  font-weight: bold;
  white-space: nowrap;
  line-height: 40px;
  ${({ margin }) => `margin: ${margin}`};
`;
