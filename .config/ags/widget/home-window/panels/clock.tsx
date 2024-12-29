import { bind, Variable } from "/usr/share/astal/gjs";
import { Panel } from "../panel";
import Gtk from "gi://Gtk?version=3.0";

const timeFormat = `date +"%H:%M"`;
const dateFormat = `date +"%d.%m.%Y"`;
const dayFormat = `date +"%A"`;
const second = 1000;
const minute = 60 * second;

const time = Variable("").poll(second, timeFormat);
const day = Variable("").poll(minute, dayFormat);
const date = Variable("").poll(minute, dateFormat);

export const Clock = () => {
  return (
    <Panel>
      <box vertical={true} vexpand={true} className="clock">
        <box valign={Gtk.Align.CENTER} vertical={true} vexpand={true}>
          <label className="time" label={bind(time)} />
          <label className="day" label={bind(day)} />
          <label className="date" label={bind(date)} />
        </box>
      </box>
    </Panel>
  );
};
