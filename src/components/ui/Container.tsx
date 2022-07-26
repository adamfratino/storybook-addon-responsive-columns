import React, { CSSProperties } from "react";
import { styled } from "@storybook/theming";

type ContainerProps = {
  display?: CSSProperties["display"];
  gap?: CSSProperties["gap"];
  padding?: CSSProperties["padding"];
  margin?: CSSProperties["margin"];
  alignItems?: CSSProperties["alignItems"];
};

const Container: React.FC<ContainerProps> = ({
  display = "block",
  gap = 0,
  padding = 0,
  margin = 0,
  alignItems,
  children,
}) => (
  <StyledContainer
    display={display}
    padding={padding}
    gap={gap}
    margin={margin}
    alignItems={alignItems}
  >
    {children}
  </StyledContainer>
);

export default Container;

const StyledContainer = styled.div<ContainerProps>`
  display: ${({ display }) => display};
  gap: ${({ gap }) => gap};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  ${({ alignItems }) => `align-items: ${alignItems}`};
`;
