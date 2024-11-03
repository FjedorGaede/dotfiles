import { openAnotherProgram } from "_shared/open-another-program";
import { buildControl } from "./_shared/build-control";
import { sleep } from "_shared/sleep";
const audio = await Service.import("audio");

const microphoneIcon = Utils.merge(
  [audio.microphone.bind("volume"), audio.microphone.bind("is_muted")],
  (volume: number, isMuted: boolean) => {
    if (isMuted || volume <= 0) {
      return "";
    }

    return "";
  },
);

export const MicrophoneControl = buildControl({
  min: 0,
  icon: microphoneIcon,
  label: audio.microphone.bind("description").as((desc) => desc || ""),
  settingClick: () =>
    openAnotherProgram(App, () => Utils.exec("pavucontrol --tab=4")),
  onClicked: () => {
    const isMutedAndLowVolume =
      audio.microphone.is_muted && audio.microphone.volume < 0.15;
    const isNotMutedButZeroVolume =
      !audio.microphone.is_muted && audio.microphone.volume <= 0;
    if (isMutedAndLowVolume || isNotMutedButZeroVolume) {
      audio.microphone.volume = 0.15;
      audio.microphone.is_muted = false;
      return;
    }
    audio.microphone.is_muted = !audio.microphone.is_muted;
  },
  sliderValue: audio.microphone
    .bind("volume")
    .as((vol) => Math.round(vol * 100)),
  onChange: (change) => {
    audio.microphone.volume = change.value / 100;
    audio.microphone.is_muted = false;
  },
});
