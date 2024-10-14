import { Actives, Workspace } from "types/service/hyprland";
import { BarWidget } from "./bar-widget";

const hyprland = await Service.import("hyprland");

const dispatch = (ws) => hyprland.messageAsync(`dispatch workspace ${ws}`);

const getArrayOfSize = (size: number) =>
  Array.from({ length: size }, (_, i) => i + 1);

const getMaxWorkspaceNumber = (workspaces: Workspace[]) =>
  Math.max(...workspaces.map((ws) => Number(ws.id)));

const workspaceIsActive = (id: number, actives: Actives) =>
  id === actives.workspace.id;

const getWorkspaceChildren = (workspaces: Workspace[], actives: Actives) => {
  const maxWorkspace = getMaxWorkspaceNumber(workspaces);
  const workspacesArray = getArrayOfSize(maxWorkspace);

  return workspacesArray
    .map((wsId) => {
      const workspace = workspaces.find((ws) => ws.id === wsId);

      if (!workspace) {
        return Widget.Button({
          classNames: ["workspace", "unused", "button-unset"],
          label: "",
          onClicked: () => dispatch(wsId),
        });
      }

      if (workspaceIsActive(workspace.id, actives)) {
        return Widget.Button({
          classNames: ["workspace", "active", "button-unset"],
          label: "",
        });
      }

      return Widget.Button({
        classNames: ["workspace", "inactive", "button-unset"],
        label: "",
        onClicked: () => dispatch(wsId),
      });
    })
    .filter((it) => !!it);
};

const Workspaces = () =>
  Widget.EventBox({
    className: "workspaces",
    onScrollUp: () => dispatch("+1"),
    onScrollDown: () => dispatch("-1"),
    child: Widget.Box({
      className: "workspaces-box",
      children: Utils.merge(
        [hyprland.bind("workspaces"), hyprland.bind("active")],
        (workspaces: Workspace[], actives: Actives) =>
          getWorkspaceChildren(workspaces, actives),
      ),
    }),
  });

export const LeftWidget = BarWidget(Workspaces(), "left");
