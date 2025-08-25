import {
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BALOO_MEDIUM } from "../../redux/types";
import { colors } from "../colors";
import { TypographyText } from "../Typography";
import { getMerchantDetails } from "../../redux/merchant/merchant-thunks";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { navigationRef } from "../../Navigation/RootNavigation";
import { useTheme } from "../ThemeProvider";
import { readNotification } from "../../redux/notifications/notifications-thunks";
import HTMLRenderer from "../../components/HTMLRenderer";

const NotificationItem = ({ item }) => {
  const dispatch = useDispatch();

  const { i18n,t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();

  const language = i18n.language;
  const handleItemPress = () => {
    if (item.merchant_id) {
      dispatch(getMerchantDetails(item.merchant_id, navigationRef, t, "Back"));
      dispatch(readNotification(item.notification_id));

      return;
    }

    if (item.url_notification) {
      Linking.openURL(item.url_notification);
    }
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={handleItemPress}>
      {loading && (
        <View style={styles.loaderBlock}>
          <ActivityIndicator />
        </View>
      )}
      <TypographyText
        title={language === "ar" ? item?.merchant_name_arabic : item?.merchant_name }
        textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
        size={16}
        font={BALOO_MEDIUM}
        style={[styles.name,{alignSelf:language === "ar" ? "flex-end" :"flex-start"}]}
      />
      <Image
        source={{ uri: item.offer_image }}
        style={styles.logo}
        resizeMode="cover"
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      <HTMLRenderer value={language === "ar" ? item?.html_description_arabic || item?.html_description : item?.html_description} />
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    // height: 150,
    borderRadius: 8,
    aspectRatio: 135 / 76,
  },
  wrapper: {
    width: "100%",
    backgroundColor: "transparent",
    marginBottom: 25,
    justifyContent: "center",
   // alignItems: "center",
  },
  name: {
    marginBottom: 10,
    alignSelf: "flex-start",
    fontWeight: "900",
  },
  loaderBlock: {
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationItem;
