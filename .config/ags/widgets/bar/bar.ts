import { PanelButton } from "./panel-button.js";
import brightness from "../../services/brightness.ts";
import { WifiModule, NetworkIndicator } from "widgets/modules/wifi.ts";

const dateFormat = `date '+%H:%M - %d.%m.%y'`;
const date = Variable("", {
  poll: [1000, dateFormat],
});

const battery = await Service.import("battery");

const BatteryIcon = () =>
  Widget.Icon({
    icon: battery.bind("icon_name"),
    visible: battery.bind("available"),
    class_name: battery.bind("charging").as((ch) => (ch ? "charging" : "")),
  });

const bluetooth = await Service.import("bluetooth");

const a: { text: string } = { text: "hello" };
a.text;

const connectedList = Widget.Box({
  setup: (self) =>
    self.hook(
      bluetooth,
      (self) => {
        self.children = bluetooth.connected_devices.map(({ icon_name, name }) =>
          Widget.Box([
            Widget.Icon(`${icon_name}-symbolic`),
            Widget.Label(name),
          ]),
        );

        self.visible = bluetooth.connected_devices.length > 0;
      },
      "notify::connected-devices",
    ),
});

const BluetoothIndicator = () =>
  Widget.Icon({
    icon: bluetooth
      .bind("enabled")
      .as((on) => `bluetooth-${on ? "active" : "disabled"}-symbolic`),
  });

const audio = await Service.import("audio");

const VolumeIndicator = () =>
  Widget.Icon().hook(audio.speaker, (self) => {
    const vol = audio.speaker.volume * 100;
    const thresholdIcon: [number, string][] = [
      [101, "overamplified"],
      [67, "high"],
      [34, "medium"],
      [1, "low"],
      [0, "muted"],
    ];
    const icon = audio.speaker.is_muted
      ? "muted"
      : thresholdIcon.find(([threshold]) => threshold <= vol)?.[1];

    self.icon = `audio-volume-${icon}-symbolic`;
    self.tooltip_text = `Volume ${Math.floor(vol)}%`;
  });

const showControlSettings = Variable(false);
showControlSettings.connect("changed", ({ value }) => print(`!aaaa ${value}`));
const ControlsWidget = () => {
  const panelButton = PanelButton({
    on_primary_click: () => {
      // App.toggleWindow("control-settings");
      showControlSettings.setValue(!showControlSettings.getValue());
    },
    on_scroll_up: () => {
      audio.speaker.volume += 0.02;
    },
    on_scroll_down: () => {
      audio.speaker.volume -= 0.02;
    },
    child: Widget.Box({
      className: "controls",
      children: [NetworkIndicator(), BluetoothIndicator(), VolumeIndicator()],
    }),
  });

  return panelButton;
};

const InteractiveSlider = (
  valueSignal: number,
  onChange = ({ value }) => {},
) => {
  return Widget.Slider({
    className: "interactive-slider",
    hexpand: true,
    drawValue: false,
    onChange,
    value: valueSignal,
  });
};

const VolumeSlider = (type = "speaker") =>
  Widget.Box({
    children: [
      Widget.Button({
        className: "icon-button",
        child: VolumeIndicator(),
      }),
      InteractiveSlider(audio[type].bind("volume"), ({ value }) => {
        audio[type].volume = value;
        audio[type].is_muted = false;
      }),
    ],
  });

const BrightnessSlider = () =>
  Widget.Box({
    children: [
      Widget.Button({
        className: "icon-button",
        child: Widget.Icon("display-brightness-symbolic"),
        on_primary_click: () => {
          const currentBrightness = brightness.screen_value;
          if (currentBrightness === brightness.min) {
            brightness.screen_value = 0.5;
          } else {
            brightness.screen_value = brightness.min;
          }
        },
      }),
      InteractiveSlider(brightness.bind("screen_value"), ({ value }) => {
        brightness.screen_value = value;
      }),
    ],
  });

export const ControlsSettings = () =>
  Widget.Window({
    name: "control-settings",
    layer: "top",
    // margins: [5, 25],
    classNames: ["control-window"],
    anchor: ["top", "left"],
    child: Widget.Box({
      css: "padding: 0px;",
      child: Widget.Revealer({
        revealChild: showControlSettings.bind(),
        transition: "slide_down",
        child: Widget.Box({
          className: "control-settings",
          vertical: true,
          children: [
            Widget.Box({
              vertical: true,
              className: "setting-sliders",
              children: [VolumeSlider("speaker"), BrightnessSlider()],
            }),
            WifiModule(),
          ],
        }),
        // setup: (self) => {
        //   self.hook(showControlSettings, () => {
        //     self.reveal_child = !self.reveal_child;
        //     print(`reveal child ${self.reveal_child}`);
        //   });
        // },
      }),
    }),
    // App.closeWindow("control-settings");
  });

const BatteryWidget = () => {
  return PanelButton({
    on_primary_click: () => {},
    child: Widget.Box({
      className: "battery",
      children: [BatteryIcon()],
    }),
  });
};

function DateWidget() {
  return PanelButton({
    on_primary_click: () => {},
    child: Widget.Label({
      label: date.bind(),
    }),
  });
}

const hyprland = await Service.import("hyprland");

const dispatch = (ws: string) =>
  hyprland.messageAsync(`dispatch workspace ${ws}`);

const Workspaces = () => {
  return Widget.Box({
    className: "workspaces",
    setup: (self) => {
      self.hook(hyprland, (self) => {
        const existingWorkspaces = hyprland.workspaces
          .map((wp) => wp.id)
          .sort()
          .reverse();
        const highestWorkspaceNumber = existingWorkspaces.find((id) => !!id);
        const workspaceIds = Array.from(
          { length: Number(highestWorkspaceNumber) },
          (_, i) => i + 1,
        );

        const isActive = (id: number) => hyprland.active.workspace.id === id;
        const hasContent = (id: number) => existingWorkspaces.includes(id);

        const icons = workspaceIds.map((id) => ({
          id,
          icon: "media-record",
          size: hasContent(id) ? 12 : 10,
          className: isActive(id)
            ? "is-active"
            : hasContent(id)
              ? "has-content"
              : "inactive",
        }));

        const workspaceIndicators = icons.map((iconDef) =>
          Widget.Button({
            child: Widget.Icon({
              icon: iconDef.icon,
              size: iconDef.size,
              className: iconDef.className,
            }),
            on_primary_click: () => dispatch(iconDef.id.toString()),
            cursor: "pointer",
            className: "button-unset",
          }),
        );

        self.children = workspaceIndicators;
      });
    },
  });
};

export function Bar(monitor = 0) {
  return Widget.Window({
    monitor,
    exclusivity: "exclusive",
    name: `bar${monitor}`,
    anchor: ["top", "left", "right"],
    child: Widget.Box({
      children: [Workspaces(), ControlsWidget(), DateWidget(), BatteryWidget()],
    }),
    className: "bar",
  });
}
