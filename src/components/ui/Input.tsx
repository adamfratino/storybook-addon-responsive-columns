import React, { CSSProperties } from "react";
import { styled } from "@storybook/theming";
import { Form } from "@storybook/components";

type InputProps = {
  flex?: CSSProperties["flex"];
  defaultValue?: any;
  onChange?: (e: any) => void;
};

const Input: React.FC<InputProps> = ({
  flex = "1",
  defaultValue,
  onChange,
}) => (
  <InputContainer flex={flex}>
    <Form.Input
      defaultValue={defaultValue}
      onChange={onChange}
      size="100%"
      type="number"
    />
  </InputContainer>
);

export default Input;

const InputContainer = styled.div<Pick<InputProps, "flex">>`
  flex: ${({ flex }) => flex};
`;
