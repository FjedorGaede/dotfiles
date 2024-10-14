import type Gtk from "types/@girs/gtk-3.0/gtk-3.0";

export const BarWidget = (
  widget: Gtk.Widget,
  position: "left" | "right" | "center",
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
    children: [
      Widget.Box({
        classNames: classes,
        child: widget,
      }),
    ],
  });
};
