import { execAsync, Variable } from "/usr/share/astal/gjs";
import { geoLocation } from "./geo-location";

type Endpoints = "sources" | "currentWeather";

const ApiEndpoints: { [key in Endpoints]: string } = {
  sources: "https://api.brightsky.dev/sources",
  currentWeather: "https://api.brightsky.dev/current_weather",
};

const addParametersToEndpoint = (
  endpoint: Endpoints,
  parameters: { [key: string]: string },
) => {
  const path = ApiEndpoints[endpoint];

  const parameterString: string = Object.entries(parameters)
    .map(([key, parameter]) => `${key}=${parameter}`)
    .join("&");

  return `${path}?${parameterString}`;
};

const callEndpoint = async <
  RequestParameter extends Record<string, string>,
  Response extends Record<string, any>,
>(
  endpoint: Endpoints,
  parameters: RequestParameter,
): Promise<Response> => {
  return JSON.parse(
    await execAsync(`curl ${addParametersToEndpoint(endpoint, parameters)}`),
  );
};

// -- Sources Request -- //
type SourceRequestParameters = {
  lon: string;
  lat: string;
};

type SourceResponse = {
  id: string;
  station_name: string;
};

type SourcesEndpointResponse = {
  sources: SourceResponse[];
};

export type DWDStation = {
  id: string; // Source id of bluesky
  name: string;
};

function capitalize(word: string): string {
  if (word.length === 0) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

const convertResponseToStation = (
  response: SourcesEndpointResponse,
): DWDStation | undefined => {
  const nearestStation = response.sources.find((it) => !!it);
  if (!nearestStation) {
    return undefined;
  }

  return {
    id: nearestStation.id,
    name: nearestStation.station_name
      .split(" ")
      .map((w) => capitalize(w))
      .join(" "),
  };
};

export const dwdStation = Variable<DWDStation>({ name: "Unknown", id: "" });

geoLocation.subscribe((geoLoc) => {
  callEndpoint<SourceRequestParameters, SourcesEndpointResponse>("sources", {
    lat: geoLoc.coordinates.lat,
    lon: geoLoc.coordinates.long,
  })
    .then((source: SourcesEndpointResponse) => {
      const station = convertResponseToStation(source);
      if (station) {
        dwdStation.set(station);
      }
    })
    .catch((err) => console.error(err));
});

// -- Curent Weather Request -- //
type CurrentWeatherRequestParameters = {
  lon: string;
  lat: string;
};

type WeatherConditon =
  | "dry"
  | "fog"
  | "rain"
  | "sleet"
  | "snow"
  | "hail"
  | "thunderstorm"
  | null;

type WeatherIcons =
  | "clear-day"
  | "clear-night"
  | "partly-cloudy-day"
  | "partly-cloudy-night"
  | "cloudy"
  | "fog"
  | "wind"
  | "rain"
  | "sleet"
  | "snow"
  | "hail"
  | "thunderstorm";

const weatherIconNfMap: Record<WeatherIcons, string> = {
  "clear-day": "",
  "clear-night": "",
  "partly-cloudy-day": "",
  "partly-cloudy-night": "",
  cloudy: "",
  fog: "󰖑",
  wind: "",
  rain: "",
  sleet: "",
  snow: "",
  hail: "",
  thunderstorm: "󰖓",
};

const weatherIconMaterialMap: Record<WeatherIcons, string> = {
  "clear-day": "󰖙",
  "clear-night": "󰖔",
  "partly-cloudy-day": "󰖕",
  "partly-cloudy-night": "󰼱",
  cloudy: "󰖐",
  fog: "󰖑",
  wind: "󰖝",
  rain: "󰖖",
  sleet: "󰙿",
  snow: "󰖘",
  hail: "󰖒",
  thunderstorm: "󰖓",
};

type CurrentWeatherResponse = {
  weather: {
    condition: WeatherConditon;
    icon: WeatherIcons;
    timestamp: string;
    temperature: number;
  };
};

export type CurrentWeather = {
  condition: WeatherConditon;
  icon: string;
  iconName: WeatherIcons;
  timestamp: Date;
  formattedTimestamp: string;
  temperature: number;
};

const convertResponseToCurrentWeather = (
  response: CurrentWeatherResponse,
): CurrentWeather | undefined => {
  const weather = response?.weather;

  if (!weather) {
    return undefined;
  }

  const germanFormatter = new Intl.DateTimeFormat("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const timestamp = new Date(weather.timestamp);
  const formattedTimestamp = germanFormatter.format(timestamp);

  return {
    iconName: weather.icon,
    icon: weatherIconNfMap[weather.icon || ""],
    condition: weather.condition,
    timestamp: timestamp,
    formattedTimestamp: formattedTimestamp,
    temperature: Math.round(weather.temperature),
  };
};

export const CurrentWeather = Variable<CurrentWeather | undefined>(undefined);

geoLocation.subscribe((location) => {
  callEndpoint<CurrentWeatherRequestParameters, CurrentWeatherResponse>(
    "currentWeather",
    { lat: location.coordinates.lat, lon: location.coordinates.long },
  )
    .then((weather) => {
      const currWeather = convertResponseToCurrentWeather(weather);
      if (currWeather) {
        CurrentWeather.set(currWeather);
      }
    })
    .catch((err) => console.error(err));
});
