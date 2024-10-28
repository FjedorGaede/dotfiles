import { BarWidget } from "./bar-widget";

const timeFormat = `date +"%H:%M"`;
const dateFormat = `date "+%d. %B %Y - %H:%M"`;
const second = 1000;

const time = Variable("", {
  poll: [second, timeFormat],
});

const date = Variable("", {
  poll: [second, dateFormat],
});

const TimeWidget = Widget.Label({
  className: "time-widget",
  label: time.bind(),
  tooltipText: date.bind(),
});

export const MiddleWidget = BarWidget(TimeWidget, "center");
