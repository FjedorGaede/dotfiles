import Hyprland from "gi://AstalHyprland";

const hyprland = Hyprland.get_default();

const dispatch_broken = () =>
  hyprland.message_async(`dispatch exec notify-send "test"`);

const dispatch_working = () =>
  hyprland.message_async(`dispatch exec notify-send "test"`, () => {});

export const HyprTest = () => (
  <box>
    <button onClick={dispatch_broken} label="broken" />
    <button onClick={dispatch_working} label="working" />
  </box>
);
