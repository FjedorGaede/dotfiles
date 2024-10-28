import Gtk from "gi://Gtk?version=3.0";
import { BarWidget } from "./bar-widget";
const battery = await Service.import("battery");

const HintWidget = (child: Gtk.Widget) => {
  return Widget.Box({
    className: "hint",
    child: child,
  });
};

// -- Battery Status -- //
type BatteryStatus = "normal" | "warning" | "critical";

const BatteryStatusMap: {
  [key in BatteryStatus]: { icon: string; cssClass: string };
} = {
  normal: { icon: "", cssClass: "" },
  warning: { icon: "󰁺", cssClass: "warning" },
  critical: { icon: "󰂃", cssClass: "critical" },
};

const BatteryStatusVariable = Utils.merge(
  [battery.bind("percent"), battery.bind("charging")],
  (batteryPercent, charging: boolean): BatteryStatus => {
    const warningThreshold = 25;
    const criticalThreshold = 10;

    if (!charging) {
      if (batteryPercent < criticalThreshold) {
        return "critical";
      }

      if (batteryPercent < warningThreshold) {
        return "warning";
      }
    }

    return "normal";
  },
);

const BatteryHint = HintWidget(
  Widget.Button({
    classNames: BatteryStatusVariable.as((status: BatteryStatus) => {
      return ["battery", "button-unset", BatteryStatusMap[status].cssClass];
    }),
    label: BatteryStatusVariable.as(
      (status: BatteryStatus) => BatteryStatusMap[status].icon,
    ),
    onClicked: () => Utils.exec("swaync-client -t"),
  }),
);

// -- Notifications -- //
const NumberOfNotifications = Variable<number>(0, {
  listen: [
    'bash -c "swaync-client -s"',
    (out) => {
      return Number(JSON.parse(out).count) || 0;
    },
  ],
});

const HasNotifications = Utils.derive(
  [NumberOfNotifications],
  (numberOfNotifications: number) => numberOfNotifications > 0,
);

const Notifications = HintWidget(
  Widget.Button({
    classNames: ["notifications", "button-unset"],
    label: HasNotifications.bind().as((hasNotifications) => {
      if (hasNotifications) {
        return "󱅫";
      }

      return "asdf";
    }),
    onClicked: () => Utils.exec("swaync-client -t"),
  }),
);

type ShowHint = {
  show: boolean;
  widget: Gtk.Widget;
};

// Order of the array returned determines also the order of the hints
const ShowHintsVariable = Utils.merge(
  [BatteryStatusVariable, HasNotifications.bind()],
  (batteryStatus, hasNotifications): ShowHint[] => {
    return [
      {
        show: batteryStatus !== "normal",
        widget: BatteryHint,
      },
      {
        show: hasNotifications,
        widget: Notifications,
      },
    ];
  },
);

// Used to decide if the widget should be shown at all on the bar
export const ShowHintsWidget = ShowHintsVariable.as((showHints: ShowHint[]) => {
  return showHints.some((showHint) => showHint.show === true);
});

const Hints = Widget.Box({
  className: "hints",
  children: ShowHintsVariable.as((showHints: ShowHint[]) => {
    const children: Gtk.Widget[] = [];

    if (showHints) {
      showHints.forEach((hint) => {
        if (hint.show) {
          children.push(hint.widget);
        }
      });
    }

    return children;
  }),
});

export const RightWidget = BarWidget(Hints, "right", ShowHintsWidget);
