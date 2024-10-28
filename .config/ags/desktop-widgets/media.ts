import { MprisPlayer } from "types/service/mpris";

const mpris = await Service.import("mpris");
const players = mpris.bind("players");

const PLAY_ICON = "";
const PAUSE_ICON = "";
const PREV_ICON = "";
const NEXT_ICON = "";

function lengthStr(length: number) {
  const min = Math.floor(length / 60);
  const sec = Math.floor(length % 60);
  const sec0 = sec < 10 ? "0" : "";
  return `${min}:${sec0}${sec}`;
}

function Player(player: MprisPlayer | undefined) {
  if (!player) {
    return Widget.Label("No spotify running");
  }

  const cover = Widget.Box({
    class_name: "cover",
    vpack: "start",
    css: player.bind("cover_path").transform(
      (p) => `
            background-image: url('${p}');
        `,
    ),
  });

  const title = Widget.Label({
    className: "title",
    wrap: true,
    hpack: "start",
    label: player.bind("track_title"),
  });

  const artist = Widget.Label({
    className: "artist",
    wrap: true,
    hpack: "start",
    label: player.bind("track_artists").transform((a) => a.join(", ")),
  });

  const album = Widget.Label({
    className: "album",
    wrap: true,
    hpack: "start",
    label: player.bind("track_album"),
  });

  const positionSlider = Widget.Slider({
    className: "slider",
    hexpand: true,
    drawValue: false,
    onChange: ({ value }) => (player.position = value * player.length),
    visible: player.bind("length").as((l) => l > 0),
    setup: (self) => {
      function update() {
        const value = player.position / player.length;
        self.value = value > 0 ? value : 0;
      }
      self.hook(player, update);
      self.hook(player, update, "position");
      self.poll(1000, update);
    },
  });

  const positionLabel = Widget.Label({
    className: "positionLabel",
    hpack: "start",
    setup: (self) => {
      const update = (_, time: number | undefined) => {
        self.label = lengthStr(time || player.position);
        self.visible = player.length > 0;
      };

      self.hook(player, update, "position");
      self.poll(1000, update);
    },
  });

  const lengthLabel = Widget.Label({
    class_name: "positionLabel",
    hpack: "end",
    visible: player.bind("length").transform((l) => l > 0),
    label: player.bind("length").transform(lengthStr),
  });

  const playPause = Widget.Button({
    className: "control-button",
    onClicked: () => player.playPause(),
    visible: player.bind("can_play"),
    child: Widget.Label({
      label: player.bind("play_back_status").transform((s) => {
        switch (s) {
          case "Playing":
            return PAUSE_ICON;
          case "Paused":
          case "Stopped":
            return PLAY_ICON;
        }
      }),
    }),
  });

  const prev = Widget.Button({
    hpack: "end",
    hexpand: true,
    className: "control-button",
    onClicked: () => player.previous(),
    visible: player.bind("can_go_prev"),
    child: Widget.Label(PREV_ICON),
  });

  const next = Widget.Button({
    hpack: "start",
    hexpand: true,
    className: "control-button",
    onClicked: () => player.next(),
    visible: player.bind("can_go_next"),
    child: Widget.Label(NEXT_ICON),
  });

  return Widget.Box({
    class_name: "player",
    children: [
      cover,
      Widget.Box({
        className: "rightSide",
        vertical: true,
        hexpand: true,
        children: [
          title,
          artist,
          album,
          positionSlider,
          Widget.CenterBox({
            start_widget: positionLabel,
            center_widget: Widget.Box({
              hpack: "center",
              classNames: ["controls"],
              child: Widget.Box({
                children: [prev, playPause, next],
              }),
            }),
            end_widget: lengthLabel,
          }),
        ],
      }),
    ],
  });
}

const getSpotifyPlayer = (players: MprisPlayer[]) =>
  players.find((player) => player.name === "spotify");

export const Media = Widget.Box({
  classNames: ["media-player", "box"],
  vertical: true,
  child: players.as((p) => Player(getSpotifyPlayer(p))),
});
