import { AudioControl } from "./controls/audio-control";
import { BrightnessControl } from "./controls/brightness-control";
import { MicrophoneControl } from "./controls/microphone-control";
import { ConnectionControl } from "./controls/network-control";

export const ControlsWidget = Widget.Box({
  classNames: ["controls", "box"],
  vertical: true,
  children: [
    BrightnessControl,
    AudioControl,
    MicrophoneControl,
    ConnectionControl,
  ],
});
