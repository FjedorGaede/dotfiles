import { BarWidget } from "./bar-widget";

const NumberOfNotifications = Variable<number>(0, {
  listen: [
    'bash -c "swaync-client -s"',
    (out) => {
      return Number(JSON.parse(out).count) || 0;
    },
  ],
});

const Notifications = Widget.Box({
  className: "hint",
  children: [
    Widget.Button({
      classNames: ["button-unset"],
      label: NumberOfNotifications.bind().as((numberOfNotifications) => {
        if (numberOfNotifications > 0) {
          return "󱅫";
        }

        return "󰂜";
      }),
      onClicked: () => Utils.exec("swaync-client -t"),
    }),
  ],
});

const Hints = Widget.Box({
  children: [Notifications],
});

export const RightWidget = BarWidget(Hints, "right");
