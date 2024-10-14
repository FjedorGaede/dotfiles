import { hourInMs } from "./helpers/time";

export type Coordinates = {
  lat: string;
  long: string;
};

export type GeoLocation = {
  city: string;
  region: string;
  country: string;
  coordinates: Coordinates;
};

export const geoLocation = Variable<GeoLocation>({} as GeoLocation, {
  poll: [
    hourInMs,
    `${App.configDir}/scripts/geolocation.sh`,
    (out) => {
      return JSON.parse(out);
    },
  ],
});

export const city = Utils.derive(
  [geoLocation],
  (geoLoc: GeoLocation) => geoLoc.city,
);
export const region = Utils.derive(
  [geoLocation],
  (geoLoc: GeoLocation) => geoLoc.region,
);
export const coordinates = Utils.derive(
  [geoLocation],
  (geoLoc) => geoLoc.coordinates,
);
