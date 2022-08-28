import React from "react";
import { styled } from "@storybook/theming";

export default {
  title: "Playground",
  args: {
    url: "https://fratino.dev/columns",
  },
  argTypes: {
    url: { name: "url" },
  },
};

const Template = (args) => (
  <IFrameContainer>
    {args.url ? (
      <iframe title="iframe" width="100%" height="100%" src={args.url}></iframe>
    ) : (
      <NoIFrameMessage />
    )}
  </IFrameContainer>
);

const IFrameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  iframe {
    border: 0;
  }
`;

const NoIFrameContainer = styled.div`
  font-family: "Helvetica Neue";
  padding: 16px;
  text-align: center;

  h2 {
    font-size: 18px;
    margin-bottom: 2px;
  }

  span {
    font-size: 12px;
  }
`;

const NoIFrameMessage = () => (
  <NoIFrameContainer>
    <h2>Use this space to test websites underneath the grid!</h2>
    <span>
      (Not all websites will work. Some websites block the ability to use it as
      an iframe.)
    </span>
  </NoIFrameContainer>
);

export const Demo = Template.bind({});
Demo.args = {};
