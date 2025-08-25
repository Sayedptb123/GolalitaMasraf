import { getAllCountries,getAllLocations } from "../../api/global";
import { setCountries ,setLocations} from "./global-actions";

export const getCountries = () => async (dispatch) => {
  try {
    const countries = await getAllCountries();
   

    dispatch(setCountries(countries));

    if (!countries) {
      throw "Get countries error";
    }
  } catch (e) {
    console.log(e);
  }
};

export const getLocations = () => async (dispatch) => {
  try {
    const locations = await getAllLocations();
    console.log("countries:",locations);
    const selectedCountry = await getSelectedCountry();

    console.log(selectedCountry, "selected country");

    if (selectedCountry) {
      dispatch(setSelectedCountry(selectedCountry));
    }

    dispatch(setLocations(locations));

    if (!locations) {
      throw "Get locations error";
    }
  } catch (e) {
    console.log(e);
  }
};
