import { openAnotherProgram } from "_shared/open-another-program";
import { buildControl } from "./_shared/build-control";
const audio = await Service.import("audio");

const audioIconMap = {
  muted: "",
  low: "",
  medium: "",
  high: "",
};

const audioIcon = Utils.merge(
  [audio.speaker.bind("volume"), audio.speaker.bind("is_muted")],
  (vol: number, isMuted: boolean) => {
    if (isMuted) {
      return audioIconMap.muted;
    }

    const volume = vol * 100;

    return [
      [101, audioIconMap.high],
      [67, audioIconMap.high],
      [25, audioIconMap.medium],
      [1, audioIconMap.low],
      [0, audioIconMap.muted],
    ].find(([threshold, icon]) => threshold <= volume)?.[1] as string;
  },
);

export const AudioControl = buildControl({
  min: 0,
  icon: audioIcon,
  label: audio.speaker.bind("description").as((desc) => desc || ""),
  settingClick: () =>
    openAnotherProgram(App, () => Utils.exec("pavucontrol --tab=3")),
  onClicked: () => {
    const isMutedAndLowVolume =
      audio.speaker.is_muted && audio.speaker.volume < 0.15;
    const isNotMutedButZeroVolume =
      !audio.speaker.is_muted && audio.speaker.volume <= 0;
    if (isMutedAndLowVolume || isNotMutedButZeroVolume) {
      audio.speaker.volume = 0.15;
      audio.speaker.is_muted = false;
      return;
    }
    audio.speaker.is_muted = !audio.speaker.is_muted;
  },
  sliderValue: audio.speaker.bind("volume").as((vol) => Math.round(vol * 100)),
  onChange: (change) => {
    audio.speaker.volume = change.value / 100;
    audio.speaker.is_muted = false;
  },
});
