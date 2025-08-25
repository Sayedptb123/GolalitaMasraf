import { useTranslation } from "react-i18next";
import { getAllMerchants } from "../../../../api/merchants";
import AsyncFormikSelect from "../../../../components/Formik/AsyncFormikSelect";

const transformCategories = (categories) => {
  return categories?.map((item) => ({
    value: item.merchant_name,
    label: item.merchant_name,
  }));
};

const AsyncFormikMerchantSelect = ({ onChange }) => {
  const { t } = useTranslation();

  const getMerchants = async () => {
    const merchants = await getAllMerchants();

    const options = transformCategories(merchants);

    return options;
  };

  return (
    <AsyncFormikSelect
      name="merchant_name"
      label={t("BillScanner.merchantsLabel")}
      getOptions={getMerchants}
      single
      queryName="merchants"
      onChange={onChange}
    />
  );
};

export default AsyncFormikMerchantSelect;
