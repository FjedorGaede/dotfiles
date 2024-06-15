import { Bar, ControlsSettings } from "widgets/bar/bar";

// -- SCSS & CSS -- //
const scss = `${App.configDir}/styles/style.scss`;
const css = "/tmp/style.css";
Utils.exec(`sassc ${scss} ${css}`);

// - Auto Reload CSS - //
Utils.monitorFile(
  // directory that contains the scss files
  `${App.configDir}/styles`,

  // reload function
  () => {
    // compile, reset, apply
    Utils.exec(`sassc ${scss} ${css}`);
    console.warn("reload css");
    App.resetCss();
    App.applyCss(css);
  },
);

App.config({
  style: css,
  windows: [Bar(0), ControlsSettings()],
  onConfigParsed: () => {
    // App.closeWindow("control-settings");
  },
});
