const timeFormat = `date +"%H:%M"`;
const dateFormat = `date +"%d.%m.%Y"`;
const dayFormat = `date +"%A"`;
const second = 1000;
const minute = 60 * second;

const time = Variable("", {
  poll: [second, timeFormat],
});

const day = Variable("", {
  poll: [minute, dayFormat],
});

const date = Variable("", {
  poll: [minute, dateFormat],
});

export const Clock = Widget.Box({
  vertical: true,
  vexpand: true,
  child: Widget.Box({
    vpack: "center",
    vexpand: true,
    vertical: true,
    children: [
      Widget.Label({
        label: time.bind(),
        className: "time",
      }),
      Widget.Label({
        label: day.bind(),
        className: "day",
      }),
      Widget.Label({
        label: date.bind(),
        className: "date",
      }),
    ],
  }),
  classNames: ["clock", "box"],
});
