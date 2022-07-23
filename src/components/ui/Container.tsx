import React, { CSSProperties } from "react";
import { styled } from "@storybook/theming";

type ContainerProps = {
  display?: CSSProperties["display"];
  gap?: CSSProperties["gap"];
  padding?: CSSProperties["padding"];
};

const Container: React.FC<ContainerProps> = ({
  display = "block",
  gap = 0,
  padding = "16px",
  children,
}) => (
  <StyledContainer display={display} padding={padding} gap={gap}>
    {children}
  </StyledContainer>
);

export default Container;

const StyledContainer = styled.div<ContainerProps>`
  display: ${({ display }) => display};
  gap: ${({ gap }) => gap};
  padding: ${({ padding }) => padding};
`;
