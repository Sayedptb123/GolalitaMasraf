import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { BALOO_MEDIUM } from "../../../../../redux/types";
import { TypographyText } from "../../../../../components/Typography";
import { useTheme } from "../../../../../components/ThemeProvider";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../../components/colors";
import BottomSheetComponent from "../../../../../components/Form/BottomSheetComponent";
import { getGiftCardCountries } from "../../../../../api/giftCard";

import { isRTL } from "../../../../../../utils";

const transformCounntries = (items) => {
  return items.map((option) => ({
    value: option.code,
    label: option.name,
    x_arabic_name: option.x_arabic_name,
    x_flag_image: option.x_flag_image,
  }));
};

const getCountries = async () => {
  const countries = await getGiftCardCountries();
  const options = transformCounntries(countries);
  return options;
};

const CountryPicker = (props) => {
  const { onChange, loading } = props;
  const [options, setOptions] = useState([]);

  const { isDark } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    getCountries().then((res) => setOptions(res));
  }, []);

  //console.log(options, "options");

  return (
    <BottomSheetComponent
      shouldCloseModal={loading}
      loading={loading}
      name="giftcard-countries"
      renderSelect={() => (
        <View
          style={{
            flexDirection: isRTL() ? "row-reverse" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          {/* <TypographyText
            title={t("Vouchers.filtersInfo")}
            textColor={isDark ? colors.white : colors.darkBlue}
            size={16}
            font={BALOO_MEDIUM}
          /> */}
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 4,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: isDark ? colors.white : colors.darkBlue,
            }}
          >
            <TypographyText
              textColor={isDark ? colors.white : colors.darkBlue}
              size={16}
              font={BALOO_MEDIUM}
              title={t("Vouchers.countries")}
              numberOfLines={1}
            />
          </View>
        </View>
      )}
      options={options}
      onChange={onChange}
      onClearPress={() => {
        onChange("QA");
      }}
      single
      modalTitle={t("Vouchers.countries")}
    />
  );
};

export default CountryPicker;
