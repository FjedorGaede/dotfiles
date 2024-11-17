export type PanelElement = JSX.Element;
export const Panel = (props: { child?: JSX.Element }): PanelElement => {
  return <box className="panel">{props.child}</box>;
};
