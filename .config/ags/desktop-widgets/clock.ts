const timeFormat = `date +"%H:%M"`;
const dateFormat = `date +"%A - %d.%m.%Y"`;
const second = 1000;
const minute = 60 * second;

const time = Variable("", {
  poll: [second, timeFormat],
});
const date = Variable("", {
  poll: [minute, dateFormat],
});

export const Clock = Widget.Box({
  vertical: true,
  children: [
    Widget.Label({
      label: time.bind(),
      className: "time",
    }),
    Widget.Label({
      label: date.bind(),
      className: "date",
    }),
  ],
  classNames: ["clock", "box"],
});
