import { StyleSheet } from "react-native";
import Select from "../../../../components/Form/Select";
import { useTranslation } from "react-i18next";

const OPTIONS = [
  {
    label: 1,
    value: 1,
  },
  {
    label: 2,
    value: 2,
  },
  {
    label: 3,
    value: 3,
  },
  {
    label: 4,
    value: 4,
  },
  {
    label: 5,
    value: 5,
  },
];

const VoucherQuantity = ({ onChange, quantity }) => {
  const { t } = useTranslation();

  return (
    <Select
      mainStyle={styles.select}
      placeholder={t("Vouchers.amountSelectPlaceholder")}
      options={OPTIONS}
      value={quantity}
      onChange={onChange}
      single={true}
      allowClear={false}
    />
  );
};

const styles = StyleSheet.create({
  select: {},
});

export default VoucherQuantity;
