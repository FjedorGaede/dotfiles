const network = await Service.import("network");

const OtherConnectionRevealState = Variable<boolean>(false);

const ShowOtherConnections = Widget.Box({
  vertical: true,
  className: "other-connections",
  children: [
    Widget.Button({
      classNames: ["button-unset"],
      child: Widget.Box({
        children: [
          Widget.Label({
            label: OtherConnectionRevealState.bind().as((state) =>
              state ? "" : "",
            ),
            classNames: ["revealer-caret"],
          }),
          Widget.Label({
            label: "Connections...",
          }),
        ],
      }),
      onClicked: () => {
        OtherConnectionRevealState.setValue(!OtherConnectionRevealState.value);
      },
    }),
    Widget.Revealer({
      revealChild: OtherConnectionRevealState.bind(),
      child: Widget.Box({ vertical: true }).hook(network.wifi, (self) => {
        self.children = network.wifi.access_points
          .filter((ap) => !!ap.ssid)
          .map((ap) =>
            Widget.EventBox({
              className: "other-connection",
              child: Widget.Button({
                onClicked: () => {
                  const command = `nmcli device wifi connect "${ap.ssid}"`;
                  console.warn("command", command);
                  Utils.exec(command);
                },
                classNames: ["button-unset"],
                child: Widget.Box({
                  children: [
                    Widget.Icon(ap.iconName),
                    Widget.Label({
                      hpack: "start",
                      label: ap.ssid,
                    }),
                  ],
                }),
              }),
            }),
          );
      }),
    }),
  ],
});

export const WifiControl = Widget.Box({
  className: "connection-control",
  vertical: true,
  children: [
    Widget.Label({
      label: "Wifi",
      hpack: "start",
      className: "connection-header",
    }),
    Widget.EventBox({
      cursor: "pointer",
      className: "connection-wrapper",
      child: Widget.Button({
        className: "button-unset",
        onClicked: () =>
          Utils.exec("bash -c ~/programs/rofi-wifi-menu/rofi-wifi-menu.sh"),
        child: Widget.Box({
          setup: (self) =>
            self.hook(network.wifi, (self) => {
              const ssid = network.wifi.ssid;
              const classNames = ["connection"];
              if (!ssid) {
                classNames.push("disconnected");
              }
              self.class_names = classNames;
            }),
          children: [
            Widget.Icon({
              className: "connection-icon",
            }).hook(network.wifi, (self) => {
              self.icon = network.wifi.icon_name;
            }),
            Widget.Label().hook(network.wifi, (self) => {
              self.label = network.wifi.ssid || "Disconnected";
              self.class_name = "connection-name";
            }),
          ],
        }),
      }),
    }),
    // ShowOtherConnections,
  ],
});
