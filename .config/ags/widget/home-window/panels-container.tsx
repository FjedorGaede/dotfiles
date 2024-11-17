import Gtk from "gi://Gtk?version=3.0";

type PanelsContainerType = {
  children?: JSX.Element[];
  child?: JSX.Element;
};

export const PanelsContainer = ({ child, children }: PanelsContainerType) => {
  const childElements = children?.length ? children : [child];
  return (
    <box
      className="panels-container"
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      vertical={true}
    >
      {childElements}
    </box>
  );
};

export const PanelRow = ({ child, children }: PanelsContainerType) => {
  const childElements = children?.length ? children : [child];
  return (
    <box
      className="panel-row"
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
    >
      {childElements}
    </box>
  );
};
