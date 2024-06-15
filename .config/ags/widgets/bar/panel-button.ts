export const PanelButton = ({
  child,
  on_primary_click = () => {},
  on_scroll_up = () => {},
  on_scroll_down = () => {},
}) => {
  return Widget.Button({
    child,
    className: "panel-button",
    cursor: "pointer",
    on_primary_click,
    on_scroll_up,
    on_scroll_down,
  });
};
