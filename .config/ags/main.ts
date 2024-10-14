import { Bar } from "bar/bar";
import { DesktopWidgetWindow } from "desktop-widgets/desktop-widget";

// -- SCSS & CSS -- //
const scss = `${App.configDir}/styles/style.scss`;
const css = "/tmp/style.css";
compileScss();

// - Auto Reload CSS - //
Utils.monitorFile(
  // directory that contains the scss files
  `${App.configDir}/styles`,

  // reload function
  () => {
    // compile, reset, apply

    compileScss();
    console.warn("reload css");
    App.resetCss();
    App.applyCss(css);
  },
);

App.config({
  style: css,
  windows: [
    Bar(0),
    // DesktopWidgetWindow(0),
  ],
});

function compileScss() {
  const result = Utils.exec(`sassc ${scss} ${css}`);
  if (result) {
    console.error(`There went something wrong compiling the SCSS: ${result}`);
  }
}
