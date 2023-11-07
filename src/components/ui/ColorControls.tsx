import React from "react";
import { Container, Label } from "./";
import { ColorControl } from '@storybook/blocks';

type ColorControlsProps = {
  defaultColor?: string;
  onChange?: (e: any) => void;
};

const ColorControls: React.FC<ColorControlsProps> = ({
  defaultColor,
  onChange,
}) => (
  <Container display="flex" alignItems="center" gap="16px">
    <Label>Set Color:</Label>
    <ColorControl
      name="gridColor"
      defaultValue={defaultColor}
      value={defaultColor}
      onChange={onChange}
      presetColors={presetColors}
    />
  </Container>
);

export default ColorControls;

const presetColors = [
  { color: "#ff4785", title: "Coral" },
  { color: "#1EA7FD", title: "Ocean" },
  { color: "rgb(252, 82, 31)", title: "Orange" },
  { color: "RGBA(255, 174, 0, 0.5)", title: "Gold" },
  { color: "hsl(101, 52%, 49%)", title: "Green" },
  { color: "teal", title: "Teal" },
  { color: "HSLA(179,65%,53%,0.5)", title: "Seafoam" },
  { color: "#6F2CAC", title: "Purple" },
  { color: "#2A0481", title: "Ultraviolet" },
  { color: "black", title: "Black" },
  { color: "#333", title: "Darkest" },
  { color: "#666", title: "Darker" },
  { color: "#999", title: "Dark" },
  { color: "#ddd", title: "Light" },
  { color: "#F3F3F3", title: "Lighter" },
  { color: "#F8F8F8", title: "Lightest" },
  { color: "#FFFFFF", title: "White" },
];
