import { useSelector } from "react-redux";
import Select from "../../../../../../components/Form/Select";
import {
  convertCategoriesToOptions,
  getAllCategories,
} from "../../../../../MerchantsPage/MerchantsFilters/utils";
import { useTranslation } from "react-i18next";

const CategoriesSelect = ({ placeholder, ...rest }) => {
  const categories = useSelector(
    (state) => state.merchantReducer.parentCategories
  );
  const { i18n } = useTranslation();
  const language = i18n.language;

  const allCategories = getAllCategories(categories);

  const options = convertCategoriesToOptions(allCategories, language);

  return (
    <Select
      name="map-categories-select"
      options={options}
      style={{ marginTop: 15 }}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default CategoriesSelect;
