import { bind, Variable } from "../../../../../../usr/share/astal/gjs";
import { BarWidget } from "./BarWidget";

export const Center = (): JSX.Element => {
  const timeFormat = `date +"%H:%M"`;
  const dateFormat = `date "+%d. %B %Y - %H:%M"`;
  const second = 1000;

  const time = Variable("").poll(second, timeFormat);

  const date = Variable("").poll(second, dateFormat);

  return (
    <BarWidget position={"center"}>
      <label
        className={"time-widget"}
        label={bind(time)}
        tooltipText={bind(date)}
      />
    </BarWidget>
  );
};
