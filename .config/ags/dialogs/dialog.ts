import Gtk from "gi://Gtk?version=3.0";

const DialogHeader = (dialogHeaderLabel: string, windowName: string) =>
  Widget.Box({
    className: "dialog-header",
    hpack: "start",
    children: [
      Widget.Label({
        label: dialogHeaderLabel,
        hexpand: true,
        className: "dialog-header-label",
      }),
      Widget.EventBox({
        cursor: "pointer",
        className: "dialog-header-close",
        child: Widget.Button({
          onClicked: () => {
            App.closeWindow(windowName);
          },
          label: "",
          classNames: ["button-unset"],
        }),
      }),
    ],
  });

const DialogContent = (child: Gtk.Widget) =>
  Widget.Box({
    className: "dialog-content",
    child: child,
  });

export const Dialog = (opts: {
  dialogHeader: string;
  dialogName: string;
  content: Gtk.Widget;
}) =>
  Widget.Window({
    className: "dialog-window",
    name: opts.dialogName,
    child: Widget.Box({
      className: "dialog",
      vertical: true,
      children: [
        DialogHeader(opts.dialogHeader, opts.dialogName),
        DialogContent(opts.content),
      ],
    }),
    visible: false,
    setup: (window) =>
      window.keybind("Escape", () => {
        App.closeWindow(opts.dialogName);
      }),
  });
