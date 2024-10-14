const bluetooth = await Service.import("bluetooth");

export const BluetoothControl = Widget.Box({
  className: "connection-control",
  vertical: true,
  children: [
    Widget.Label({
      label: "Bluetooth",
      hpack: "start",
      className: "connection-header",
    }),
    Widget.EventBox({
      cursor: "pointer",
      className: "connection-wrapper",
      child: Widget.Button({
        className: "button-unset",
        // onClicked: () => App.openWindow(BLUETOOTH_DIALOG_NAME),
        onClicked: () => Utils.exec("blueman-manager"),
        child: Widget.Box({
          setup: (self) =>
            self.hook(bluetooth, (self) => {
              const bluetoothEnabled = bluetooth.enabled;
              const numberOfConnectedDevices = (
                bluetooth.connected_devices || []
              ).length;
              const classNames = ["connection"];
              if (!bluetoothEnabled) {
                classNames.push("disabled");
              }

              if (numberOfConnectedDevices === 0) {
                classNames.push("disconnected");
              }

              self.class_names = classNames;
            }),
          children: [
            Widget.Icon({
              className: "connection-icon",
            }).hook(bluetooth, (self) => {
              const on = bluetooth.enabled;
              self.icon = `bluetooth-${on ? "active" : "disabled"}-symbolic`;
            }),
            Widget.Label().hook(bluetooth, (self) => {
              const classNames: string[] = [];
              if (!bluetooth.enabled) {
                self.label = "Disabled";
              } else {
                const connectedDevices = bluetooth.connected_devices;
                const numberOfConnectedDevices = (connectedDevices || [])
                  .length;

                if (numberOfConnectedDevices > 0) {
                  self.label = `Connected devices: ${numberOfConnectedDevices}`;
                  // classNames.push("conncted-devices");
                } else {
                  self.label = "No connected devices";
                  // classNames.push("no-conncted-devices");
                }
              }

              classNames.push("connection-name");
              self.class_names = classNames;
            }),
          ],
        }),
      }),
    }),
  ],
});
