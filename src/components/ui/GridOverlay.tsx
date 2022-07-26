import React, { useEffect, useState } from "react";
import { styled } from "@storybook/theming";
import { GridProps, ColumnsProps } from "../../types";

const createResponsiveStyles = (array: GridProps[]) => {
  let stylesString = "";
  array.map((bp) => {
    const { breakpoint, gap, maxWidth } = bp;
    stylesString += `
      @media (min-width:${breakpoint}px) {
        gap: ${gap}px;
        max-width: ${maxWidth ? `${maxWidth}px` : "none"};
      }`;
  });
  return stylesString;
};

const Grid: React.FC<ColumnsProps> = ({ active, breakpoints, gridColor }) => {
  const breakpointsArray = breakpoints.map(({ breakpoint }) => breakpoint);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkActiveIndex = () => {
    breakpointsArray.every((bp, i) => {
      if (!window.matchMedia(`(min-width: ${bp}px)`).matches) return false;
      setActiveIndex(i);
      return true;
    });
  };

  useEffect(() => {
    checkActiveIndex();
    window.addEventListener("resize", checkActiveIndex);
    return () => window.removeEventListener("keydown", checkActiveIndex);
  }, []);

  return (
    <Columns
      gridColor={gridColor}
      active={active}
      responsiveStyles={createResponsiveStyles(breakpoints)}
    >
      {Array.from({ length: breakpoints[activeIndex].columns }).map((_, i) => (
        <div key={i} />
      ))}
    </Columns>
  );
};

export default Grid;

type StyledProps = Omit<ColumnsProps, "breakpoints"> & {
  responsiveStyles?: string;
};

const Columns = styled.aside<StyledProps>`
  display: ${({ active }) => (active ? "flex" : "none")};
  position: absolute;
  inset: 0;
  margin: 0 auto;
  opacity: 0.3;
  pointer-events: none;
  height: 100vh;
  ${({ responsiveStyles }) => responsiveStyles};

  & > div {
    flex: 1;
    background-color: ${({ gridColor }) => gridColor};
  }
`;
