import type Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import type { Binding } from "types/service";

export const BarWidget = (
  widget: Gtk.Widget,
  position: "left" | "right" | "center",
  visible?: Binding<any, any, boolean>,
) => {
  const setRoundedRight = ["left", "center"].includes(position);
  const setRoundedLeft = ["right", "center"].includes(position);

  const childClasses: string[] = ["panel"];

  if (setRoundedRight) {
    childClasses.push("rounded-right");
  }

  if (setRoundedLeft) {
    childClasses.push("rounded-left");
  }

  const classes = (visible || Variable(true).bind()).as((visible) => {
    const classes = ["widgets"];

    if (!visible) {
      classes.push("invisible");
    }

    return classes;
  });

  return Widget.Box({
    hpack: position === "right" ? "end" : "start",
    classNames: classes,
    children: [
      Widget.Box({
        classNames: childClasses,
        child: widget,
      }),
    ],
  });
};
