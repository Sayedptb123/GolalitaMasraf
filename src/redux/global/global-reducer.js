import { SET_COUNTRIES, SET_LOCATIONSFORFILTERS } from "./global-types";

const initialState = {
  selectedCountry: "QA",
  coutries: [],
  locations:[]
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTRIES:
      return { ...state, countries: action.countries };
        case SET_LOCATIONSFORFILTERS:
          return { ...state, locations: action.locations };
    default:
      return state;
  }
};
