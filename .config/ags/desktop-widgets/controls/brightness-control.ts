import { buildControl } from "./_shared/build-control";
import brightnessService from "../../services/brightness.ts";

export const BrightnessControl = buildControl({
  min: 5,
  icon: Variable("").bind(),
  sliderValue: brightnessService
    .bind("screen_value")
    .as((val) => Math.round(val * 100)),
  onChange: (change) => {
    brightnessService.screen_value = change.value / 100;
  },
  onClicked: () => {
    brightnessService.screen_value = 0.25;
  },
});
