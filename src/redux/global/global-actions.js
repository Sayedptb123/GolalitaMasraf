import { SET_LOCATIONS } from "../locations/locations-types";
import { SET_COUNTRIES, SET_LOCATIONSFORFILTERS } from "./global-types";

export const setCountries = (countries) => ({
  type: SET_COUNTRIES,
  countries,
});


export const setLocations = (locations) => ({
  type: SET_LOCATIONSFORFILTERS,
  locations,
});
