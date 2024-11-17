import { Variable } from "/usr/share/astal/gjs";
import { hourInMs } from "./_helpers/time";

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

export const geoLocation = Variable<GeoLocation>({} as GeoLocation).poll(
  hourInMs,
  "./scripts/geolocation.sh",
  (out) => JSON.parse(out || ""),
);

export const City = Variable.derive([geoLocation], (geoLoc: GeoLocation) => {
  return geoLoc.city || "";
});
export const Region = Variable.derive(
  [geoLocation],
  (geoLoc: GeoLocation) => geoLoc.region || "",
);
export const Coordinates = Variable.derive(
  [geoLocation],
  (geoLoc) => geoLoc.coordinates || "",
);
