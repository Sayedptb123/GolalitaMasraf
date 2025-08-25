import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  countriesSelector,
  selectedCountrySelector,
} from "../../../../redux/global/global-selectors";
import { TypographyText } from "../../../../components/Typography";
import { useTheme } from "../../../../components/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { BALOO_REGULAR } from "../../../../redux/types";
import { Image } from "react-native";
import { useTranslation } from "react-i18next";
import BottomSheetComponent from "../../../Form/BottomSheetComponent";
import { useMemo } from "react";
import { setSelectedCountry } from "../../../../redux/global/global-actions";
import { setSelectedCountry as setSelectedCountryToLocalStorage } from "../../../../api/asyncStorage";

const transformCounntries = (items) => {
  return items.map((option) => ({
    value: option.code,
    label: option.name,
    x_arabic_name: option.x_arabic_name,
    x_flag_image: `https://golalita.com${option.image_url}`,
  }));
};

const CountrySelect = () => {
  const selectedCountry = useSelector(selectedCountrySelector);
  const countries = useSelector(countriesSelector);
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const defaultCountry = countries?.find(
    (item) => item.code === selectedCountry
  );

  const language = i18n.language;
  const uri = `https://golalita.com${defaultCountry?.image_url}`;
  const textColor = isDark ? "#fff" : "#343434";
  const name =
    language === "ar" ? defaultCountry?.x_arabic_name : defaultCountry?.name;

  const options = useMemo(() => {
    if (!countries) {
      return;
    }

    return transformCounntries(countries);
  }, [countries, language]);

  if (!countries?.length) {
    return null;
  }

  const onChange = async (val) => {
    if (val) {
      await setSelectedCountryToLocalStorage(val);
      dispatch(setSelectedCountry(val));
    }
  };

  return (
    <BottomSheetComponent
      name="global-countries"
      renderSelect={() => (
        <View style={styles.wrapper}>
          <TypographyText
            title={name}
            textColor={textColor}
            size={18}
            font={BALOO_REGULAR}
            style={styles.title}
          />

          <Image
            source={{ uri }}
            style={{
              width: 25,
              height: 18,
            }}
          />
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

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 8,
  },
  title: {
    marginHorizontal: 8,
  },
});

export default CountrySelect;
