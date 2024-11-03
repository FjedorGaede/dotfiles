import { App } from "types/app";
import { sleep } from "./sleep";

export async function openAnotherProgram(app: App, openProgram: () => void) {
  app.closeWindow("desktopWidgetWindow0");

  await sleep(10); // For some reason we have to wait a random amount of time because otherwise it does not close the window

  openProgram();
}
