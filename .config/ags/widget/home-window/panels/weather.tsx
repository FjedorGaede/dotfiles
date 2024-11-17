import Gtk from "gi://Gtk?version=3.0";
import { CurrentWeather } from "../../../services/weather";
import { Panel } from "../panel";
import { City, Coordinates } from "../../../services/geo-location";
import { bind } from "/usr/share/astal/gjs";

const WeatherIcon = () => (
  <label
    className="weather-icon"
    label={CurrentWeather((currentWeather) => currentWeather?.icon || "")}
  />
);

const Temperature = () => (
  <label
    className="temperature"
    label={CurrentWeather((weather) => `${weather?.temperature}°C`)}
  />
);

const Position = () => (
  <box
    className="position"
    halign={Gtk.Align.CENTER}
    tooltipText={Coordinates((coords) => `${coords?.lat}, ${coords?.long}`)}
  >
    <label className="location-icon" label="" />
    <label className="city" label={bind(City)} />
  </box>
);

const LastRefresh = () => (
  <label
    halign={Gtk.Align.START}
    className="last-refresh"
    label={CurrentWeather((weather) => ` ${weather?.formattedTimestamp}`)}
  />
);

export const Weather = () => {
  return (
    <Panel>
      <box className="weather" vertical={true} halign={Gtk.Align.CENTER}>
        <WeatherIcon />
        <Temperature />
        <Position />
        {/* <LastRefresh /> */}
      </box>
    </Panel>
  );
};
