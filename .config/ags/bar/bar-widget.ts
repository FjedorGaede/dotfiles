import type Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import type { Binding } from "types/service";

export const BarWidget = (
  widget: Gtk.Widget,
  position: "left" | "right" | "center",
  visible?: Binding<any, any, boolean>,
) => {
  const setRoundedRight = ["left", "center"].includes(position);
  const setRoundedLeft = ["right", "center"].includes(position);

  const classes: string[] = ["panel"];

  if (setRoundedRight) {
    classes.push("rounded-right");
  }

  if (setRoundedLeft) {
    classes.push("rounded-left");
  }

  return Widget.Box({
    classNames: ["widget"],
    hpack: position === "right" ? "end" : "start",
    visible: visible ? visible : true,
    children: [
      Widget.Box({
        classNames: classes,
        child: widget,
      }),
    ],
  });
};
