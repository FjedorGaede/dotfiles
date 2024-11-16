type HintWidgetProps = {
  child?: JSX.Element;
};

export const HintWidget = ({ child }: HintWidgetProps): JSX.Element => {
  return <box className="hint"> {child} </box>;
};
