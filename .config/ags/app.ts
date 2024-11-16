import { App } from "astal/gtk3";
import TopBar from "./widget/top-bar/TopBar";
import { exec, monitorFile } from "/usr/share/astal/gjs";

const scss = `./styles/style.scss`; // Path to you style file
const css = "/tmp/style.css"; // Could be anywhere else
compileScss(); // Have to pre-compile the SCSS when starting up

// Monitor your SCSS file for changes
monitorFile(
  scss,

  // reload function
  () => {
    console.log("CSS RELOADED"); // For debug purpose only
    compileScss();
    App.reset_css(); // Have to reset the whole CSS before applying new one
    App.apply_css(css); // Apply newly compiled CSS to the running App
  },
);

App.start({
  css: css,
  main() {
    App.get_monitors().map(TopBar);
  },
});

function compileScss() {
  const result = exec(`sass ${scss} ${css}`); // Command to compile the SCSS file into the CSS file
  if (result) {
    console.error(`There went something wrong compiling the SCSS: ${result}`);
  }
}
