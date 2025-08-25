import { View } from "react-native";
import { TypographyText } from "../Typography";
import { BALOO_SEMIBOLD } from "../../redux/types";
import { useTheme } from "../ThemeProvider";
import { colors } from "../colors";
import { useTranslation } from "react-i18next";

const ListNoData = (props) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <TypographyText
        title={props.text || t("General.noData")}
        textColor={isDark ? colors.white : colors.darkBlue}
        size={16}
        font={BALOO_SEMIBOLD}
      />
    </View>
  );
};

export default ListNoData;
