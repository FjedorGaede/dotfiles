import { BluetoothDevice } from "types/service/bluetooth";
import { Dialog } from "./dialog";
const bluetooth = await Service.import("bluetooth");

export const BLUETOOTH_DIALOG_NAME = "BluetoothDialog";

const onActivate = (device: BluetoothDevice) => {
  return (opts: { active: boolean }) => {
    console.warn("active", opts.active);
    device.setConnection(opts.active);
  };
};

const bluetoothDialogContent = Widget.Box({
  vertical: true,
  children: Utils.merge(
    [bluetooth.bind("devices"), bluetooth.bind("connected_devices")],
    (devices: BluetoothDevice[], connectedDevices: BluetoothDevice[]) => {
      console.warn("devices updated");
      return devices.map((device) => {
        return Widget.Box({
          children: [
            Widget.Switch({
              cursor: "pointer",
              active: device.connected,
              onActivate: onActivate(device),
            }),
            Widget.Icon(device.icon_name),
            Widget.Label({ label: device.alias }),
            Widget.Label({ label: `${device.battery_percentage.toFixed(0)}%` }),
            Widget.Label({
              label: device.connected ? "(Connected)" : "",
            }),
          ],
        });
      });
    },
  ),
});

export const BluetoothDialog = Dialog({
  dialogName: BLUETOOTH_DIALOG_NAME,
  dialogHeader: "Bluetooth",
  content: bluetoothDialogContent,
});
