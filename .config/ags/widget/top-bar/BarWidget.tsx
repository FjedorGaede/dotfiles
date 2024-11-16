import { bind, Binding, Variable } from "../../../../../../usr/share/astal/gjs";
import { Gtk } from "../../../../../../usr/share/astal/gjs/gtk3";

type BarWidgetProps = {
  position: "left" | "right" | "center";
  child?: JSX.Element; // when only one child is passed
  visible?: Binding<boolean>;
};

export const BarWidget = ({
  position,
  visible,
  child,
}: BarWidgetProps): JSX.Element => {
  const setRoundedRight = ["left", "center"].includes(position);
  const setRoundedLeft = ["right", "center"].includes(position);

  const childClassesList: string[] = ["panel"];

  if (setRoundedRight) {
    childClassesList.push("rounded-right");
  }

  if (setRoundedLeft) {
    childClassesList.push("rounded-left");
  }

  const align = position === "right" ? Gtk.Align.END : Gtk.Align.START;

  const childClasses = childClassesList.join(" ");

  const classes = bind(visible || Variable(true)).as((visible) => {
    const classesList = ["bar-widget"];

    if (!visible) {
      classesList.push("invisible");
    }

    return classesList.join(" ");
  });

  return (
    <box className={bind(classes)} hexpand={true} halign={align}>
      <box className={childClasses}>{child}</box>
    </box>
  );
};
