import { Binding } from "types/service";
import { LeftWidget } from "./left";
import { MiddleWidget } from "./middle";
import { RightWidget } from "./right";

export function Bar(monitor = 0) {
  return Widget.Window({
    monitor,
    exclusivity: "exclusive",
    name: `bar${monitor}`,
    anchor: ["top", "left", "right"],
    layer: "overlay",
    className: "bar",
    child: Widget.CenterBox({
      className: "bar",
      startWidget: LeftWidget,
      centerWidget: MiddleWidget,
      endWidget: RightWidget,
    }),
  });
}
