import {
  createConnection,
  createLongLivedTokenAuth,
  subscribeEntities,
} from "node_modules/home-assistant-js-websocket/dist/index";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YTEwNDYwYzNhNGQ0ODFkOTU2YjE5YzBmNGM3OTc4YSIsImlhdCI6MTcyOTQzNTczNiwiZXhwIjoyMDQ0Nzk1NzM2fQ.o5DEtKKC_-aaVUebY93LavnfRcloYYsZ7gQNECzya24";

const homeAssistantURL = "http://homeassistant:8123";

type EntityType = "switch" | "light";

const toggle = async (entityId: string, entityType: EntityType) => {
  return await Utils.fetch(
    `http://homeassistant:8123/api/services/${entityType}/toggle`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ entity_id: `${entityType}.${entityId}` }),
    },
  );
};

imports.gi.versions.Soup = "3.0";
const GLib = imports.gi.GLib;
const Soup = imports.gi.Soup;

const session = new Soup.Session();
const message = Soup.Message.new(
  "GET",
  "ws://homeassistant:8123/api/websocket",
);

function onMessage(connection, type, message) {
  const data = JSON.parse(message.get_data());
  print(`Received: ${JSON.stringify(data)}`);

  if (data.type === "auth_required") {
    connection.send_text(
      JSON.stringify({
        type: "auth",
        access_token: TOKEN,
      }),
    );
  } else if (data.type === "auth_ok") {
    print("Authentication successful");

    connection.send_text(
      JSON.stringify({
        id: 1,
        type: "subscribe_entities",
        entity_ids: ["light.stehlampe_2", "light.wohnzimmer_sideboard"],
      }),
    );
  }
}

function onConnect(session, result) {
  try {
    const connection = session.websocket_connect_finish(result);
    print("Connected to Home Assistant WebSocket");

    connection.connect("message", onMessage);
  } catch (e) {
    print(`Error connecting: ${e.message}`);
  }
}

session.websocket_connect_async(message, null, null, 0, null, onConnect);

// Start the main loop
const loop = GLib.MainLoop.new(null, false);
// loop.run(); Does not seem to work
//
// TODO Note: Breaks when the Erros are thrown. Maybe we need a reconnect logic.

export const HomeAssistantWidget = Widget.Box({
  classNames: ["Box"],
  children: [
    Widget.Button({
      label: "Licht",
      on_clicked: async () => {
        const response = await toggle("stehlampe_2", "light");
      },
    }),
    Widget.Button({
      label: "Licht 2",
      on_clicked: async () => {
        const response = await toggle("wohnzimmer_sideboard", "light");
      },
    }),
    Widget.Button({
      label: "TV",
      on_clicked: async () => {
        const response = await toggle("the_frame", "switch");
      },
    }),
  ],
});
