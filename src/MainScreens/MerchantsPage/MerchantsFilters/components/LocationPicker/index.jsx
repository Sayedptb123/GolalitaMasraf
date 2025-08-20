import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { BALOO_MEDIUM } from "../../../../../redux/types";
import { TypographyText } from "../../../../../components/Typography";
import { useTheme } from "../../../../../components/ThemeProvider";
import { useTranslation } from "react-i18next";
import { colors } from "../../../../../components/colors";
import BottomSheetComponent from "../BottomSheetComponent";
import { isRTL } from "../../../../../../utils";
import { useSelector } from "react-redux";
import { getAllLocations } from "../../../../../api/global";

const LocationPicker = (props) => {
  const { onChange, loading, placeholder,selectedCountry } = props;
  const [location, setLocation] = useState([]);
  const { cardmolaToken } = useSelector((state) => state.giftcardsReducer);

  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  useEffect(() => {
    getAllLocations()
      .then((res) => setLocation(res.data))
      .catch((err) => {
        console.log(err, "getAllLocations error");
      });
  }, []);

  const transformCounntries = (items) => {
    return items?.map((option) => {
      //console.log(option, "getAllLocations option");
      return {
        value: option.id,
        label: option.name,
        short_names: option.short_names,
      };
    });
  };

  const options = useMemo(() => transformCounntries(location), [location]);

  return (
    <>
      <BottomSheetComponent
        shouldCloseModal={loading}
        loading={loading}
        name="locationsheet"
        renderSelect={() => (
          <View
            style={{
              flexDirection: isRTL() ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",

              //paddingHorizontal: 20,
            }}
          >
            {/* <TypographyText
            title={t("Location.filtersInfo")}
            textColor={isDark ? colors.white : colors.darkBlue}
            size={16}
            font={BALOO_MEDIUM}
          /> */}
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 4,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: isDark ? "#FFFFFF" : colors.darkBlue,
                width: "100%",
                height: 50,
                justifyContent: "center",
              }}
            >
              <TypographyText
                textColor={isDark ? "#FFFFFF" : colors.darkBlue}
                size={16}
                font={BALOO_MEDIUM}
                title={placeholder}
                numberOfLines={1}
              />
            </View>
          </View>
        )}
        options={(selectedCountry?.name == "Qatar" || selectedCountry == null) ? options :[]}
        onChange={(i) => {
          onChange(i);
        }}
        onClearPress={() => {
          onChange(undefined);
        }}
        single
        modalTitle={t("Location.location")}
      />
    </>
  );
};

export default LocationPicker;
