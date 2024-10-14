const network = await Service.import("network");

export const WiredControl = Widget.Box({
  vertical: true,
  className: "connection-control",
  children: [
    Widget.Label({
      label: "Wired",
      hpack: "start",
      className: "connection-header",
    }),
    Widget.Box({
      setup: (self) =>
        self.hook(network.wired, (self) => {
          const state = network.wired.state;
          const classNames = ["connection"];
          if (state !== "activated") {
            classNames.push("disabled");
          }
          self.class_names = classNames;
        }),
      children: [
        Widget.Icon({
          icon: network.wired.bind("icon_name"),
          className: "connection-icon",
        }),
        Widget.Label({
          className: "connection-name",
          setup: (self) => {
            self.hook(network.wired, (self) => {
              const state = network.wired.state;
              const internetConnected = network.wired.internet;

              self.label = "";

              if (state !== "activated") {
                self.label = "Unavailable";
                return;
              }

              if (internetConnected === "connecting") {
                self.label = "Connecting...";
                return;
              }

              if (internetConnected === "connected") {
                self.label = "Connected";
                return;
              }
            });
          },
        }),
      ],
    }),
  ],
});
