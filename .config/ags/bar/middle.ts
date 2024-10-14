import { BarWidget } from "./bar-widget";

const timeFormat = `date +"%H:%M"`;
const second = 1000;

const time = Variable("", {
  poll: [second, timeFormat],
});

const TimeWidget = Widget.Label({
  className: "time-widget",
  label: time.bind(),
});

export const MiddleWidget = BarWidget(TimeWidget, "center");
