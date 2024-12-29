import { exec, Variable } from "/usr/share/astal/gjs";
import { HintWidget } from "./Hint";

const NumberOfNotifications = Variable<number>(0).watch(
  'bash -c "swaync-client -s"',
  (out) => {
    return Number(JSON.parse(out)?.count) || 0;
  },
);

export const HasNotifications = Variable.derive(
  [NumberOfNotifications],
  (numberOfNotifications: number) => numberOfNotifications > 0,
);

export const NotificationsWidget = () => {
  const getLabel = (bool: boolean) => {
    if (bool) {
      return "󱅫";
    }

    return "!!should never be visible!!";
  };

  const onBellClicked = () => exec("swaync-client -t");

  return (
    <HintWidget>
      <button
        className={"notifications button-unset"}
        onClicked={onBellClicked}
      >
        <label label={HasNotifications(getLabel)} />
      </button>
    </HintWidget>
  );
};
