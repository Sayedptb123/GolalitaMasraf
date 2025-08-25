import React, { useCallback } from "react";
import { mainStyles } from "../../styles/mainStyles";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { getFlexDirection, isRTL } from "../../../utils";
import Logo from "../../assets/logo.svg";
import { TypographyText } from "../../components/Typography";
import { colors } from "../../components/colors";
import { LUSAIL_REGULAR } from "../../redux/types";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../components/ThemeProvider";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { sized } from "../../Svg";
import BurgerSvg from "../../assets/burger.svg";
import SearchSvg from "../../assets/search.svg";
import NotificationSvg from "../../assets/notification_white.svg";

const MainScreenTop = ({ user, messageNotifications }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigation = useNavigation();

  const iconColor = isDark ? colors.mainDarkMode : "#940037";

  const BurgerIcon = sized(BurgerSvg, 25, 20, iconColor);
  const NotificationIcon = sized(NotificationSvg, 17, 20, iconColor);
  const SearchIcon = sized(SearchSvg, 20, 20, iconColor);

  const toNotifications = useCallback(() =>
    navigation.navigate("Notifications")
  );

  const handleSearchPress = () => {
    navigation.navigate("merchants", {
      screen: "merchants-filters",
    });
  };

  const logoColor = isDark ? colors.mainDarkMode : colors.darkBlue;

  return (
    <View style={[styles.container, mainStyles.p20]}>
      <View style={[mainStyles.betweenRow, getFlexDirection()]}>
        <TouchableOpacity
          style={[
            { padding: 15, marginLeft: -15, marginTop: 0 },
            isRTL() && { transform: [{ rotate: "180deg" }] },
          ]}
          onPress={navigation.openDrawer}
        >
          <BurgerIcon />
        </TouchableOpacity>

        <TouchableOpacity>
          <Logo color={logoColor} />
        </TouchableOpacity>

        <View style={styles.actionBtns}>
          <TouchableOpacity
            onPress={handleSearchPress}
            style={styles.actionBtn}
          >
            <SearchIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={toNotifications} style={styles.actionBtn}>
            <NotificationIcon />
            {messageNotifications?.filter((m) => m.state === "unread")?.length >
              0 && (
              <View style={styles.TabView__notifications}>
                <TypographyText
                  textColor={colors.white}
                  size={9}
                  font={LUSAIL_REGULAR}
                  title={
                    messageNotifications?.filter((m) => m.state === "unread")
                      ?.length
                  }
                  style={{ width: 5, height: 14, fontWeight: "700" }}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  stat: {
    width: "49%",
    backgroundColor: colors.white,
    borderRadius: 8,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 7,
  },
  pointsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  actionBtns: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  logoWrapper: {
    borderRadius: 4,
  },
});

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  messageNotifications: state.notificationsReducer.messageNotifications,
});

export default connect(mapStateToProps, {})(MainScreenTop);
