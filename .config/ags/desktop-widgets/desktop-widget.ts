import { Clock } from "./clock";
import { ControlsWidget } from "./controls-widget";
import { MediaPlayers } from "./media";
import { SystemInfo } from "./system-info";
import { SystemTray } from "./system-tray";
import { WeatherWidget } from "./weather";

export function DesktopWidgetWindow(monitor = 0) {
  return Widget.Window({
    monitor,
    exclusivity: "normal",
    name: `desktopWidgetWindow${monitor}`,
    anchor: ["right"],
    layer: "overlay",
    // anchor: [],
    // layer: "background",
    className: "desktop-widget-window",
    child: Widget.Box({
      vertical: true,
      children: [
        Widget.Box({ children: [SystemInfo, Clock] }),
        ControlsWidget,
        // MediaPlayers,
        WeatherWidget,
        SystemTray,
      ],
      className: "desktop-widget",
    }),
  });
}
