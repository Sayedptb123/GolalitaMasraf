import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { TypographyText } from "../../../Typography";
import { colors } from "../../../colors";
import { LUSAIL_REGULAR } from "../../../../redux/types";
import { isRTL } from "../../../../../utils";
import { useTheme } from "../../../ThemeProvider";
import { useTranslation } from "react-i18next";

const UserInfo = () => {
  const user = useSelector((state) => state.authReducer.user);
  //console.log("drwer user:",user)
  const { isDark } = useTheme();
  const {i18n, t } = useTranslation();

  const language = i18n.language;

  const POINT_ITEMS = [
    {
      title: user?.total_points_used,
      label: t("MainScreen.pointUsed"),
    },
    {
      title: user?.total_saving,
      label: t("MainScreen.totalSaving"),
    },
  ];

  const renderPointItem = (item, index) => {
    return (
      <View style={[styles.pointItem]}>
        <TypographyText
          textColor={"#838383"}
          size={15}
          font={LUSAIL_REGULAR}
          title={item.title}
          style={{ marginRight: 5 }}
        />
        <TypographyText
          textColor={"#838383"}
          size={15}
          font={LUSAIL_REGULAR}
          title={item.label}
          style={styles.label}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.wrapper,
        { alignItems: isRTL() ? "flex-end" : "flex-start" },
      ]}
    >
    {language == "ar" ?
     <View style={{flexDirection: isRTL() ? "row-reverse" : "row"}}>
       <TypographyText
        title={user?.x_first_name_arbic +" "+ user?.x_last_name_arbic}
        textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
        size={20}
        font={LUSAIL_REGULAR}
      />
      </View>
      :
       <TypographyText
        title={user?.name +" "+ user?.x_moi_last_name}
        textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
        size={20}
        font={LUSAIL_REGULAR}
      />
    }

      {/* <View style={styles.wrapperPoints}>
        {POINT_ITEMS.map(renderPointItem)}
      </View> */}

      <TypographyText
        title={user?.barcode}
        textColor={"#838383"}
        size={18}
        font={LUSAIL_REGULAR}
        style={styles.barcode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
  },
  wrapperPoints: {
    flexDirection: "row",
    marginTop: 12,
  },
  barcode: {
    marginTop: 12,
  },
  pointItem: {
    flexDirection: "row",
  },
  label: {
    fontWeight: "900",
    marginRight: 5,
  },
});

export default UserInfo;
