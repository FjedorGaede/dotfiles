import { MprisPlayer } from "types/service/mpris";
const mpris = await Service.import("mpris");

const Player = (player: MprisPlayer) =>
  Widget.Button({
    onClicked: () => player.playPause(),
    child: Widget.Label().hook(player, (label) => {
      const { track_artists, track_title } = player;
      label.label = `${track_artists.join(", ")} - ${track_title}`;
    }),
  });

export const MediaPlayers = Widget.Box({
  children: mpris.bind("players").as((p) => p.map(Player)),
});
