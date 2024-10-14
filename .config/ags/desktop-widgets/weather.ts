import { city, coordinates } from "services/geo-location";
import { currentWeather } from "services/weather";

const WeatherIcon = Widget.Label({
  label: currentWeather.bind().as((weather) => weather?.icon || ""),
  className: "weather-icon",
});

const Temperature = Widget.Label({
  label: currentWeather.bind().as((weather) => `${weather?.temperature}°C`),
  className: "temperature",
});

const Position = Widget.Box({
  className: "position",
  tooltipText: coordinates
    .bind()
    .as((coords) => `${coords?.lat}, ${coords?.long}`),
  children: [
    Widget.Label({
      className: "location-icon",
      label: "",
    }),
    Widget.Label({
      className: "city",
      label: city.bind().as((city) => city || ""),
    }),
  ],
});

const LastRefresh = Widget.Label({
  hpack: "start",
  className: "last-refresh",
  label: currentWeather
    .bind()
    .as((weather) => ` ${weather?.formattedTimestamp}`),
});

export const WeatherWidget = Widget.Box({
  classNames: ["weather", "box"],
  vertical: true,
  children: [
    Position,
    Widget.Box({
      vertical: true,
      children: [
        Widget.Box({
          children: [WeatherIcon, Temperature],
        }),
        LastRefresh,
      ],
    }),
  ],
});
