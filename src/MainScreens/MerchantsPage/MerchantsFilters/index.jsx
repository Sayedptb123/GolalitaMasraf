import { View } from "react-native";
import FilterScreen from "../../../components/FiltersScreen";
import FormikCountryPicker from "../../../components/Formik/FormikCountryPicker";
import { useSelector } from "react-redux";
import { convertCategoriesToOptions, getAllCategories } from "./utils";
import FormikTags from "../../../components/Formik/FormikTags";
import { useTranslation } from "react-i18next";
import FormikSearchInput from "../../../components/Formik/FormikSearchInput";
import { getFlexDirection } from "../../../../utils";
import MerchantTypes from "./components/MerchantTypes";
import FormikLocationPicker from "../../../components/Formik/FormikLocationPicker";
import CategoriesTypes from "./components/CategoriesTypes";

const MerchantsFilters = ({ navigation }) => {
  const categories = useSelector(
    (state) => state.merchantReducer.parentCategories
  );
  const { categoriesType } = useSelector((state) => state.merchantReducer);

  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const onReset = () => {};

  const onClose = () => {
    navigation.navigate("merchants-list");
  };

  const onSubmit = (filters) => {
    const transformedFilters = {
      merchant_name: filters.merchant_name,
      country_id: filters.country_id?.cca2?.toLowerCase(),
      category_id: filters.category_id ? filters.category_id : [],
    };

    navigation.navigate("merchants-list", { filters: transformedFilters });
  };

  const onBackPress = () => {
    navigation.navigate("merchants-list");
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
        category_id: [],
        merchant_name: "",
      }}
    >
      <View>
        <FormikSearchInput
          name="merchant_name"
          placeholder={t("Merchants.searchPlaceholder")}
          wrapperStyle={{ marginTop: 36 }}
        />

        {categoriesType == "global" && (
          <FormikCountryPicker
            name="country_id"
            wrapperStyle={{ marginTop: 20 }}
            placeholder={t("Merchants.all")}
          />
        )}

        {categoriesType == "local" && (
          <FormikLocationPicker
            name="location_id"
            wrapperStyle={{ marginTop: 20 }}
            placeholder={t("Merchants.location")}
          />
        )}

        <MerchantTypes />

        <CategoriesTypes />

        <FormikTags
          data={options}
          name="category_id"
          wrapperStyle={{
            marginTop: 36,
            flex: 1,
            ...getFlexDirection(),
          }}
          title={t("Merchants.categoriesLabel")}
        />
      </View>
    </FilterScreen>
  );
};

export default MerchantsFilters;
