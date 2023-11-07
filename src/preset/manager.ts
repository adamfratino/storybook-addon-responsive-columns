import { Addon, addons, types } from "@storybook/addons";
import { ADDON_ID, PANEL_ID } from "../constants";
import { Panel } from "../Panel";

const options: Addon = {
  type: types.PANEL,
  title: "Columns",
  match: ({ viewMode }) => viewMode === "story",
  render: Panel,
};

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, options);
});
