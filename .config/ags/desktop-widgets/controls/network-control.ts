import { BluetoothControl } from "./bluetooth-control";
import { WifiControl } from "./wifi-control";
import { WiredControl } from "./wired-control";

export const ConnectionControl = Widget.Box({
  vertical: true,
  className: "connection-controls",
  children: [
    // WifiControl,
    WiredControl,
    BluetoothControl,
  ],
});
