import React from "react";
import { styled } from "@storybook/theming";

const Label: React.FC = ({ children }) => <StyledLabel>{children}</StyledLabel>;

export default Label;

const StyledLabel = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;
