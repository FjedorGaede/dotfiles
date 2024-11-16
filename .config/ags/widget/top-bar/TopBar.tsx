import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { RightSide } from "./right/Right";
import { Center } from "./Center";
import { LeftSide } from "./Left";

export default function TopBar(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      application={App}
    >
      <centerbox>
        <LeftSide />
        <Center />
        <RightSide />
      </centerbox>
    </window>
  );
}
