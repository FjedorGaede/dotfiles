import { bind, Variable } from "/usr/share/astal/gjs";
import { BarWidget } from "../BarWidget";
import { BatteryHint, BatteryStatusVariable } from "./BatteryHint";
import { HasNotifications, NotificationsWidget } from "./NotificationHint";

// Order of the array returned determines also the order of the hints
const HintsToShow = Variable.derive(
  [BatteryStatusVariable, HasNotifications],
  (batteryStatus, hasNotifications: boolean): JSX.Element[] => {
    const hints: JSX.Element[] = [];

    if (batteryStatus !== "normal") {
      hints.push(BatteryHint());
    }

    if (hasNotifications) {
      hints.push(NotificationsWidget());
    }

    return hints;
  },
);

const HintsWidget = () => {
  return <box className={"hints"}>{bind(HintsToShow)}</box>;
};

export const RightSide = (): JSX.Element => {
  return (
    <BarWidget
      position="right"
      visible={HintsToShow((hints: JSX.Element[]) => !!hints?.length)}
    >
      <HintsWidget />
    </BarWidget>
  );
};
