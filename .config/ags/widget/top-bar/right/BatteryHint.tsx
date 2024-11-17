import Battery from "gi://AstalBattery";
import { bind, Variable } from "/usr/share/astal/gjs";
import { HintWidget } from "./Hint";

type BatteryStatus = "normal" | "warning" | "critical";

const battery = Battery.get_default();

const BatteryStatusMap: {
  [key in BatteryStatus]: { icon: string; cssClass: string };
} = {
  normal: { icon: "", cssClass: "" },
  warning: { icon: "󰁺", cssClass: "warning" },
  critical: { icon: "󰂃", cssClass: "critical" },
};

export const BatteryStatusVariable = Variable.derive(
  [bind(battery, "percentage"), bind(battery, "charging")],
  (batteryPercent, charging: boolean): BatteryStatus => {
    const warningThreshold = 0.25;
    const criticalThreshold = 0.1;

    if (!charging) {
      if (batteryPercent < criticalThreshold) {
        return "critical";
      }

      if (batteryPercent < warningThreshold) {
        return "warning";
      }
    }

    return "normal";
  },
);

const BatteryHintClasses = Variable.derive(
  [BatteryStatusVariable],
  (batteryStatus: BatteryStatus) =>
    ["battery", "button-unset", BatteryStatusMap[batteryStatus].cssClass].join(
      " ",
    ),
);

const BatteryTooltip = Variable.derive(
  [bind(battery, "percentage")],
  (percentage: number) => `${percentage * 100}% left`,
);

export const BatteryHint = () => {
  return (
    <HintWidget>
      <button className={bind(BatteryHintClasses)}>
        <label
          tooltipText={bind(BatteryTooltip)}
          label={BatteryStatusVariable(
            (status: BatteryStatus) => BatteryStatusMap[status].icon,
          )}
        />
      </button>
    </HintWidget>
  );
};
