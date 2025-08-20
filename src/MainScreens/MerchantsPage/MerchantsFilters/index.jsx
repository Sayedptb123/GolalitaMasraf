import React, { useState, useEffect, useMemo } from "react";
import { View } from "react-native";
import FilterScreen from "../../../components/FiltersScreen";
import FormikCountryPicker from "../../../components/Formik/FormikCountryPicker";
import FormikLocationPicker from "../../../components/Formik/FormikLocationPicker";
import { useSelector } from "react-redux";
import { convertCategoriesToOptions, getAllCategories } from "./utils";
import FormikTags from "../../../components/Formik/FormikTags";
import { useTranslation } from "react-i18next";
import FormikSearchInput from "../../../components/Formik/FormikSearchInput";
import { getFlexDirection } from "../../../../utils";
import CategoriesTypes from "./components/CategoriesTypes";
import OtherFilterTypes from "./components/OtherFilterTypes";
import { getAllLocations } from "../../../api/global";

const MerchantsFilters = ({ navigation,route }) => {
  
  const { categoriesType } = useSelector((state) => state.merchantReducer);
  const [selectedCountry, setSelectedCountry] = useState({"callingCode": ["974"], "cca2": "QA", "currency": ["QAR"], "flag": "flag-qa", "name": "Qatar", "region": "Asia", "subregion": "Western Asia"});
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState(null);
  const [isGopoints, setIsGopoints] = useState(false);
const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    getAllLocations()
      .then((res) => setLocations(res.data))
      .catch((err) => {
        console.log(err, "getAllLocations error");
      });
  }, []);
  useEffect(() => {
    categoriesType == 'local' && setSelectedCountry({"callingCode": ["974"], "cca2": "QA", "currency": ["QAR"], "flag": "flag-qa", "name": "Qatar", "region": "Asia", "subregion": "Western Asia"})
  }, [categoriesType]);
  const categories = useSelector(
    (state) => state.merchantReducer.parentCategories
  );

  const getNameById = (id) => {
    // Find the location object by id
    const location = locations.find((item) => item.id === id);

    // If no location is found, return null
    if (!location) return null;

    // Extract the main name of the location
    const mainName = location?.name || "";

    // Safely extract names from short_names if the array is not empty
    const shortNames =
      Array.isArray(location?.short_names) && location.short_names.length > 0
        ? location.short_names
            .map((shortName) => shortName.name)
            .filter(Boolean) // Filter to exclude any falsy values
        : [];

    // Combine the main name and short names into a single string
    const allNames = [mainName, ...shortNames].join(", ") + ".";

    return allNames;
  };

  useMemo(() => {
    getNameById(locationId);
  }, [locationId]);
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const params = route?.params;

  const onReset = () => {};

  const onClose = () => {
    navigation.navigate("merchants-list");
  };

  const onSubmit = (filters) => {
    const transformedFilters = {
      merchant_name: filters.merchant_name,
      country_id: filters.country_id?.cca2?.toLowerCase(),
      location_id: filters.location_id,
      gpoint : isGopoints,
      is_premium_merchant:isPremium,
      category_id: filters.category_id ? filters.category_id : [],
    };
    navigation.navigate("merchants-list", { filters: transformedFilters });
  };

  const onBackPress = () => {
    navigation.navigate("merchants-list", {
      filters: params.filters,
    });
  };

  const allCategories = getAllCategories(categories);

  const options = convertCategoriesToOptions(allCategories, language);

  return (
    <FilterScreen
      onReset={onReset}
      onClose={onClose}
      onSubmit={onSubmit}
      onBackPress={onBackPress}
      title={t("Merchants.filtersTitle")}
      initialValues={{
        category_id: params?.filters?.category_id || [],
        merchant_name: params?.filters?.merchant_name || "",
        gpoint: params?.filters?.gpoint || null,
      }}
      isGopoints={isGopoints}
    >
      <FormikSearchInput
        name="merchant_name"
        placeholder={t("Merchants.searchPlaceholder")}
        wrapperStyle={{ marginTop: 36 }}
      />

     {categoriesType == 'global' && <FormikCountryPicker
        name="country_id"
        value={selectedCountry}
        onChangeCallback={(val) => {console.log("selectedCountry:",val),setSelectedCountry(val)}}
        wrapperStyle={{ marginTop: 20 }}
        placeholder={t("Merchants.all")}
      />}
      <FormikLocationPicker
          name="location_id"
          wrapperStyle={{ marginTop: 20 }}
          onChangeCallback={(val) => setLocationId(val)}
          placeholder={
            locationId == null
              ? t("Merchants.location")
              : getNameById(locationId)
          }
          selectedCountry={selectedCountry}
        />

<OtherFilterTypes 
      // name="gpoint"
      // onChange={()=>setIsGopoints(!isGopoints)} value={isGopoints} 
      gopointsValue={isGopoints}
      premiumValue={isPremium}
      onChange={(type, value) => {
        if (type === "gopoints") setIsGopoints(value);
        if (type === "premium") setIsPremium(value);
      }} 
      style={{...getFlexDirection() }}
      />
       <CategoriesTypes />

      <FormikTags
        data={options}
        name="category_id"
        wrapperStyle={{
          flex: 1,
          ...getFlexDirection(),
        }}
        title={t("Merchants.categoriesLabel")}
      />

     
    </FilterScreen>
  );
};

export default MerchantsFilters;
