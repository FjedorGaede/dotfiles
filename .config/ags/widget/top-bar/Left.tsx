import { bind, Variable } from "../../../../../../usr/share/astal/gjs";
import { BarWidget } from "./BarWidget";

import Hyprland from "gi://AstalHyprland";

const hyprland = Hyprland.get_default();

const dispatch = (wsId: number) =>
  hyprland.message_async(`dispatch workspace ${wsId}`, () => {}); // For some reason it always complains about not having enought input parameters

const getArrayOfSize = (size: number) =>
  Array.from({ length: size }, (_, i) => i + 1);

const getMaxWorkspaceNumber = (workspaces: Hyprland.Workspace[]) =>
  Math.max(...workspaces.map((ws) => Number(ws.id)));

const workspaceIsFocused = (id: number, focusedWorkspace: Hyprland.Workspace) =>
  id === focusedWorkspace.id;

type WorkspaceState = "focused" | "active" | "inactive";

const WorkspaceStateMap: {
  [key in WorkspaceState]: { icon: string; cssClass: string };
} = {
  active: { icon: "", cssClass: "active" },
  focused: { icon: "", cssClass: "focused" },
  inactive: { icon: "", cssClass: "inactive" },
};

const WorkspaceButton = (props: {
  wsId: number;
  state: WorkspaceState;
}): JSX.Element => (
  <button
    label={WorkspaceStateMap[props.state].icon}
    className={`${WorkspaceStateMap[props.state].cssClass} workspace button-unset`}
    onClick={() => dispatch(props.wsId)}
    cursor="pointer"
  />
);

const getWorkspaceButtons = (
  workspaces: Hyprland.Workspace[],
  focusedWorkspace: Hyprland.Workspace,
) => {
  const maxWorkspace = getMaxWorkspaceNumber(workspaces);
  const workspacesArray = getArrayOfSize(maxWorkspace);

  return workspacesArray
    .map((wsId) => {
      const workspace = workspaces.find((ws) => ws.id === wsId);

      if (!workspace) {
        return <WorkspaceButton wsId={wsId} state={"inactive"} />;
      }

      if (workspaceIsFocused(workspace.id, focusedWorkspace)) {
        return <WorkspaceButton wsId={wsId} state={"focused"} />;
      }

      return <WorkspaceButton wsId={wsId} state={"active"} />;
    })
    .filter((it) => !!it);
};

const workspaceElements = Variable.derive(
  [bind(hyprland, "workspaces"), bind(hyprland, "focusedWorkspace")],
  (workspaces: Hyprland.Workspace[], focusedWorkspace: Hyprland.Workspace) =>
    getWorkspaceButtons(workspaces, focusedWorkspace),
);

export const LeftSide = (): JSX.Element => {
  return (
    <BarWidget position={"left"}>
      <eventbox className="workspaces">
        <box className="workspaces-box">{bind(workspaceElements)}</box>
      </eventbox>
    </BarWidget>
  );
};
