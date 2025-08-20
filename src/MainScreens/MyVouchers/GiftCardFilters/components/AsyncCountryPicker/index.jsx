import { getGiftCardCountries } from "../../../../../api/giftCard";
import { useTranslation } from "react-i18next";
import AsyncFormikSelect from "../../../../../components/Formik/AsyncFormikSelect";

const transformContries = (countries) => {
  return countries?.map((item) => ({
    value: item.code,
    label: item.name,
  }));
};

const AsyncCountryPicker = () => {
  const { t } = useTranslation();

  const getCountries = async () => {
    const countries = await getGiftCardCountries();
    const options = transformContries(countries);

    return options;
  };

  return (
    <AsyncFormikSelect
      name="country_code"
      label={t("Merchants.countryLabel")}
      placeholder={"Select country"}
      getOptions={getCountries}
      single
      queryName="gift-card-country"
    />
  );
};

export default AsyncCountryPicker;
