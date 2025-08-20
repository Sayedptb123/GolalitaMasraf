import React from "react";
import { TouchableOpacity, View, Animated } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { mainStyles } from "../../styles/mainStyles";
import GreenNotificationSvg from "../../assets/green_notification.svg";
import NotificationSvg from "../../assets/notification.svg";
import { sized } from "../../Svg";
import { colors } from "../../components/colors";
import { LUSAIL_REGULAR } from "../../redux/types";
import { TypographyText } from "../../components/Typography";
import DeleteSvg from "../../assets/delete.svg";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../components/ThemeProvider";
import DeleteWhiteSvg from "../../assets/delete_white.svg";
import { getFlexDirection } from "../../../utils";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { deleteNotification } from "../../redux/notifications/notifications-thunks";
import { getMerchantDetails } from "../../redux/merchant/merchant-thunks";
import { transformDate } from "./helpers";

const DeleteIcon = sized(DeleteSvg, 70, 24);
const DeleteWhiteIcon = sized(DeleteWhiteSvg, 70, 24);

const Notification = ({
  notification,
  deleteNotification,
  setPressedNotification,
}) => {
  const { i18n,t } = useTranslation();
  const { isDark } = useTheme();

  const language = i18n.language;
  console.log(notification.date, "date");
  console.log(
    new Date(notification.date).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );

  const iconColor = isDark ? colors.white : colors.grey;
  const unreadIconColor = isDark ? colors.mainDarkMode : colors.grey;

  const NotificationIcon = sized(NotificationSvg, 17, 20, iconColor);
  const GreenNotificationIcon = sized(
    GreenNotificationSvg,
    17,
    20,
    unreadIconColor
  );

  const deleteButton = (progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });
    return (
      <Animated.View style={{ width: 100, transform: [{ translateX: trans }] }}>
        <LinearGradient
          colors={
            isDark
              ? [colors.green, colors.lightGreen]
              : [colors.darkBlue, colors.darkBlue]
          }
          style={styles.deleteButton}
        >
          <TouchableOpacity
            onPress={() =>
              deleteNotification({
                notification_id: notification.notification_id,
              })
            }
            activeOpacity={0.3}
            style={{ width: "100%", height: "100%", ...mainStyles.centeredRow }}
          >
            {isDark ? <DeleteWhiteIcon /> : <DeleteIcon />}
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    );
  };
  const getTitle = (type, partner_name) => {
    switch (type) {
      case "sale_reward":
        return t("Notifications.rewardPoint");
      case "transfer":
        return t("Notifications.transfer");
      case "offer":
        return `${t("Notifications.offerFrom")} ${partner_name}`;
      case "sale_redeem":
        return t("Notifications.saleRedeem");
      case "product":
        return t("Notifications.product");
      default:
        return "";
    }
  };
  return (
    <Swipeable rightThreshold={40} renderRightActions={deleteButton}>
      <TouchableOpacity
        onPress={() => setPressedNotification(notification)}
        style={[
          styles.notification,
          { borderBottomColor: isDark ? "black" : "#E6E6E6" },
          getFlexDirection(),
          styles.fullWidth,
        ]}
      >
        <View style={[mainStyles.row, getFlexDirection(), styles.fullWidth]}>
          <View
            style={[
              styles.notificationIconWrapper,
              {
                backgroundColor: isDark ? "#2C2C2C" : "#F6F6F6",
              },
            ]}
          >
            {notification.state === "unread" ? (
              <GreenNotificationIcon />
            ) : (
              <NotificationIcon
                color={isDark ? colors.mainDarkMode : colors.darkBlue}
              />
            )}
          </View>
          <View style={styles.descriptionWrapper}>
            <TypographyText
              textColor={isDark ? colors.white : "black"}
              size={14}
              font={LUSAIL_REGULAR}
              title={getTitle(
                notification.notification_type,
                language === "ar" ? notification.merchant_name_arabic : notification.merchant_name
              )}
              numberOfLines={2}
              style={{ fontWeight: "700" }}
            />

            <TypographyText
              textColor={"#ACAEBE"}
              size={12}
              font={LUSAIL_REGULAR}
              title={notification.date}
              numberOfLines={1}
              style={styles.date}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default connect(null, { deleteNotification, getMerchantDetails })(
  Notification
);
