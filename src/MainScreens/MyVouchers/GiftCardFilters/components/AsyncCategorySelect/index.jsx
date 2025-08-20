import { getGiftCardCategories } from "../../../../../api/giftCard";
import { useTranslation } from "react-i18next";
import AsyncFormikSelect from "../../../../../components/Formik/AsyncFormikSelect";

const transformCategories = (categories) => {
  return categories?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
};

const AsyncCategorySelect = () => {
  const { t } = useTranslation();

  const getCategories = async () => {
    const categories = await getGiftCardCategories();
    const options = transformCategories(categories);

    return options;
  };

  return (
    <AsyncFormikSelect
      name="category_id"
      label={t("Merchants.categoriesLabel")}
      placeholder={"Select category"}
      getOptions={getCategories}
      single
      queryName="gift-card-categories"
    />
  );
};

export default AsyncCategorySelect;
