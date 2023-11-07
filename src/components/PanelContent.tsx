import { styled } from "@storybook/theming";
import { useAddonState, useParameter } from "@storybook/api";
import React, { useCallback, useEffect } from "react";
import { ADDON_ID, PARAM_KEY } from "../constants";
import { ColumnsProps, GridProps } from "../types";
import {
  ColorControls,
  ColumnHeaders,
  ColumnsToggle,
  Container,
  Input,
  OpacityControls,
} from "./ui";

/**
 * our controls panel (the bread & butter)
 * @todo display viewport width
 * */
export const PanelContent: React.FC = () => {
  const parameters: ColumnsProps = useParameter(PARAM_KEY);
  const [isLoaded, setIsLoaded] = useAddonState(`${ADDON_ID}_isLoaded`);
  const [breakpoints, setBreakpoints] = useAddonState(
    `${ADDON_ID}_breakpoints`
  );
  const [active, setActive] = useAddonState(`${ADDON_ID}_active`);
  const [gridColor, setGridColor] = useAddonState(`${ADDON_ID}_gridColor`);
  const [opacity, setOpacity] = useAddonState(`${ADDON_ID}_opacity`);

  const toggleColumns = useCallback(() => {
    setActive(!active);
  }, [active]);

  const updateGridColor = useCallback(
    (gridColor: string) => setGridColor(gridColor),
    [gridColor]
  );

  const updateOpacity = useCallback(
    (opacity: string) => setOpacity(opacity),
    [opacity]
  );

  const setBreakpointValue = useCallback(
    (property: any, value: string, i: number) => {
      let newBreakpoints = [...(breakpoints as [])];
      (newBreakpoints[i] as any)[property] = !(
        property === "maxWidth" && +value <= 0
      )
        ? +value
        : "none";
      setBreakpoints(newBreakpoints);
    },
    [breakpoints]
  );

  useEffect(() => {
    if (parameters && !isLoaded) {
      const { active, gridColor, opacity, breakpoints } = parameters;
      const getParameters = async () => {
        await setBreakpoints(breakpoints);
        await setGridColor(gridColor);
        await setOpacity(opacity);
        return await setActive(active);
      };
      getParameters().then((data) => setIsLoaded(true));
    }
  }, [parameters]);

  return (
    <>
      {isLoaded ? (
        <Container padding="32px">
          <Row>
            <FlexAlignCenter style={{ flex: 2, marginRight: "auto" }}>
              <ColumnsToggle
                onChange={toggleColumns}
                isActive={active as boolean}
              />
            </FlexAlignCenter>
            <FlexAlignCenter style={{ flex: 1, justifyContent: "flex-end" }}>
              <OpacityControls
                onChange={(opacity) => updateOpacity(opacity)}
                defaultValue={opacity}
              />
            </FlexAlignCenter>
            <FlexAlignCenter style={{ justifyContent: "flex-end" }}>
              <ColorControls
                defaultColor={gridColor as string}
                onChange={(color) => updateGridColor(color)}
              />
            </FlexAlignCenter>
          </Row>
          <ColumnHeaders />
          {breakpoints &&
            (breakpoints as GridProps[]).map((breakpoint, i) => (
              <Container
                display="flex"
                gap="16px"
                padding="4px 0"
                key={`${breakpoint}_${i}`}
              >
                {/* <Input
                  defaultValue={breakpoint.breakpoint}
                  onChange={(e) =>
                    setBreakpointValue("breakpoint", e.target.value, i)
                  }
                /> */}
                <BreakpointValue>{breakpoint.breakpoint}:</BreakpointValue>
                <Input
                  defaultValue={breakpoint.columns}
                  onChange={(e) =>
                    setBreakpointValue("columns", e.target.value, i)
                  }
                />
                <Input
                  defaultValue={breakpoint.gap}
                  onChange={(e) => setBreakpointValue("gap", e.target.value, i)}
                />
                <Input
                  defaultValue={breakpoint.maxWidth}
                  onChange={(e) =>
                    setBreakpointValue("maxWidth", e.target.value, i)
                  }
                />
                <Input
                  defaultValue={breakpoint.gutter}
                  onChange={(e) =>
                    setBreakpointValue("gutter", e.target.value, i)
                  }
                />
              </Container>
            ))}
        </Container>
      ) : (
        <div style={{ display: "none" }}>loading placeholder</div>
      )}
    </>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 32px;
`;

const FlexAlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

const BreakpointValue = styled.p`
  flex: 0.15;
  align-self: center;
  font-weight: bold;
  text-align: right;
  margin: 0;
`;
