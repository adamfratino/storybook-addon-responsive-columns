import React from "react";
import { styled } from "@storybook/theming";
import { Container } from "./";

const ColumnHeaders: React.FC = () => (
  <Container display="flex" gap="16px" padding="16px 0 4px">
    <Label style={{ flex: 0.15 }}></Label>
    <Label>Columns:</Label>
    <Label>Gap size (in px):</Label>
    <Label>Max Width (in px):</Label>
    <Label>Gutter (in px):</Label>
  </Container>
);

export default ColumnHeaders;

const Label = styled.div`
  flex: 1;
  display: block;
  font-weight: bold;
`;
