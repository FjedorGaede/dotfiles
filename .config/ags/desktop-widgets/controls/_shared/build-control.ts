import { Binding } from "types/service";

export type ControlOptions = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  icon: Binding<any, any, string>;
  min?: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  label?: Binding<any, any, string>;
  settingClick?: () => Promise<void>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  sliderValue: Binding<any, any, number>;

  onChange: (change: { value: number }) => void;
  onClicked?: () => void;
};

export const buildControl = (opts: ControlOptions) => {
  const labelAndSettings = Widget.Box({
    children: [
      Widget.Label({ label: opts.label, hpack: "start", hexpand: true }),
      ...(opts.settingClick
        ? [
            Widget.Button({
              label: "",
              classNames: ["button-unset"],
              cursor: "pointer",
              onClicked: opts.settingClick,
            }),
          ]
        : []),
    ],
  });

  return Widget.Box({
    vertical: true,
    children: [
      ...(opts.label ? [labelAndSettings] : []),
      Widget.Box({
        children: [
          Widget.Button({
            label: opts.icon,
            onClicked: opts.onClicked,
            classNames: ["button-unset", "control-icon"],
          }),
          Widget.Slider({
            drawValue: false,
            hexpand: true,
            min: opts.min ?? 0,
            max: 100,
            value: opts.sliderValue,
            onChange: opts.onChange,
            classNames: ["slider"],
            cursor: "pointer",
          }),
          Widget.Label({
            label: opts.sliderValue.as((val) => `${val}%`),
          }),
        ],
      }),
    ],
  });
};
