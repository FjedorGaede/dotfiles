import { Clock } from "./clock";
import { ControlsWidget } from "./controls-widget";
import { HomeAssistantWidget } from "./homeassistant";
import { Media } from "./media";
import { SystemInfo } from "./system-info";
import { SystemTray } from "./system-tray";
import { WeatherWidget } from "./weather";

export function DesktopWidgetWindow(monitor = 0) {
  return Widget.Window({
    monitor,
    exclusivity: "normal",
    name: `desktopWidgetWindow${monitor}`,
    layer: "overlay",
    anchor: ["right", "left", "top", "bottom"],
    className: "desktop-widget-window",
    visible: false,
    child: Widget.Box({
      vertical: true,
      vpack: "center",
      hpack: "center",
      children: [
        Widget.Box({
          children: [Clock, WeatherWidget, Media],
        }),
        Widget.Box({
          children: [
            ControlsWidget,
            Widget.Box({
              vertical: true,
              children: [SystemInfo, SystemTray],
            }),
          ],
        }),
        // Media,
        // WeatherWidget,
        // HomeAssistantWidget, // Just beta
      ],
      className: "desktop-widget",
    }),
  });
}
