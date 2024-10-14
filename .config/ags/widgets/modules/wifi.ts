import type GObject from "gi://GObject?version=2.0";
import type { ButtonProps } from "types/widgets/button";
import type { IconProps } from "types/widgets/icon";
import type { LabelProps } from "types/widgets/label";

const network = await Service.import("network");

const Indicator = (icon: IconProps["icon"], label?: LabelProps["label"]) => {
  return Widget.Box({
    className: "indicator",
    children: [
      Widget.Icon({
        icon: icon,
      }),
      ...(label
        ? [
            Widget.Label({
              label: label,
            }),
          ]
        : []),
    ],
  });
};

type ArrowButtonProps = {
  leftPart: ButtonProps["child"];
  activate: () => void;
  deactivate: () => void;
  connection: [GObject.Object, () => boolean];
};

const ArrowButton = ({
  leftPart,
  activate,
  deactivate,
  connection: [service, condition],
}: ArrowButtonProps) => {
  return Widget.Box({
    setup: (self) => {
      self.hook(service, () => {
        self.toggleClassName("active", condition());
      });
    },
    className: "arrow-button",
    children: [
      Widget.Button({
        className: "left button",
        child: leftPart,
        on_clicked: () => (condition() ? deactivate() : activate()),
      }),
      Widget.Button({
        className: "right button",
        child: Widget.Label("arrow"),
      }),
    ],
  });
};

const wifiLabel = Utils.merge(
  [
    network.wifi.bind("enabled"),
    network.wifi.bind("ssid"),
    network.wifi.bind("internet"),
  ],
  (enabled, ssid, internet) => {
    if (internet === "connecting") {
      return "Connecting...";
    }
    return enabled ? ssid || "Unknown" : "Disconnected";
  },
);

const WifiIndicator = (showSSID = false) => {
  return Indicator(network.wifi.bind("icon_name"), showSSID ? wifiLabel : null);
};

const WiredIndicator = () => {
  return Indicator(network.wired.bind("icon_name"));
};

export const NetworkIndicator = (showSSID = false) => {
  return Widget.Stack({
    children: {
      wifi: WifiIndicator(showSSID),
      wired: WiredIndicator(),
    },
    shown: network.bind("primary").as((p) => p || "wifi"),
  });
};

export function WifiModule() {
  return Widget.Box({
    children: [
      ArrowButton({
        leftPart: NetworkIndicator(true),
        connection: [
          network,
          () => {
            return network.wifi.enabled || network.wired.state === "activated";
          },
        ],
        activate: () => {
          network.wifi.enabled = true;
          network.wifi.scan();
        },
        deactivate: () => {
          network.wifi.enabled = false;
        },
      }),
    ],
  });
}
