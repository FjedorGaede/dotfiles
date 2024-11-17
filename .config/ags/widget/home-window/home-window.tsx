import Astal from "gi://Astal?version=3.0";
import Gdk from "gi://Gdk?version=3.0";
import { App, Gtk } from "/usr/share/astal/gjs/gtk3";
import { PanelRow, PanelsContainer } from "./panels-container";
import { Clock } from "./panels/clock";
import { Weather } from "./panels/weather";

export default function HomeWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      name="HomeWindow"
      className="home-window"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT |
        Astal.WindowAnchor.BOTTOM
      }
      application={App}
      visible={false}
    >
      <PanelsContainer>
        <PanelRow>
          <Clock />
          <Weather />
        </PanelRow>
      </PanelsContainer>
    </window>
  );
}

type Props = {
  myprop: string;
  child?: JSX.Element; // when only one child is passed
  children?: Array<JSX.Element>; // when multiple children are passed
};
