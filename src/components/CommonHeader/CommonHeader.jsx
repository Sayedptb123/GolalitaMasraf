import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { mainStyles } from "../../styles/mainStyles";
import BackSvg from "../../assets/back.svg";
import { sized } from "../../Svg";
import { colors } from "../colors";
import { LUSAIL_REGULAR } from "../../redux/types";
import { TypographyText } from "../Typography";
import { useNavigation } from "@react-navigation/native";
import SearchSvg from "../../assets/search.svg";
import SmallBackSvg from "../../assets/small-back.svg";
import BackWhiteSvg from "../../assets/back_white.svg";
import ScanSvg from "../../assets/scan.svg";
import styles from "./styles";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { getFlexDirection, isRTL } from "../../../utils";
import NotificationSvg from "../../assets/notification.svg";
import NotificationActiveSvg from "../../assets/notification_active.svg";
import { useTheme } from "../ThemeProvider";

const SmallBackIcon = sized(SmallBackSvg, 7, 14);

const NotificationActiveIcon = sized(NotificationActiveSvg, 17, 20);

const CommonHeader = ({
  isSearch,
  label,
  isWhite,
  isScan,
  onScanPress,
  companyIcon,
  messageNotifications,
  user,
  search,
  setSearch,
  onBackPress,
  onSubmitEditing,
  style,
  isNotifications,
}) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigation = useNavigation();
  const [isSearched, setIsSearched] = useState(false);
  const iconColor = isDark ? colors.white : colors.darkBlue;
  const BackIcon = sized(BackSvg, 13, 24, iconColor);
  const BackWhiteIcon = sized(BackWhiteSvg, 13, 24, iconColor);

  const NotificationIcon = sized(
    NotificationSvg,
    17,
    20,
    isDark ? "white" : "#202020"
  );

  const SearchIcon = sized(
    SearchSvg,
    14,
    14,
    isDark ? colors.white : "#999CAD"
  );

  const ScanIcon = sized(ScanSvg, 30, 26, iconColor);

  return (
    <View
      style={[
        mainStyles.betweenRow,
        mainStyles.p20,
        {
          paddingTop: 10,
          backgroundColor: isDark ? colors.darkModeBackground : "#fff",
        },
        getFlexDirection(),
        style,
      ]}
    >
      <TouchableOpacity
        style={{
          width: 44,
          height: 44,
          justifyContent: "center",
          transform: [{ rotate: isRTL() ? "180deg" : "0deg" }],
        }}
        onPress={onBackPress ?? navigation.goBack}
      >
        {isWhite ? <BackWhiteIcon /> : <BackIcon />}
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {isSearch ? (
          <>
            <View style={[styles.searchWrapper]}>
              <TouchableOpacity
                style={styles.searchIcon}
                onPress={() => {
                  if (isSearched) {
                    setSearch("");
                    setIsSearched(!isSearched);
                  }
                }}
              >
                {isSearched ? <SmallBackIcon /> : <SearchIcon />}
              </TouchableOpacity>
              <TextInput
                placeholder={t("MainScreen.search")}
                value={search}
                onChangeText={setSearch}
                onSubmitEditing={() => {
                  setIsSearched(true);
                  if (onSubmitEditing) onSubmitEditing();
                }}
                placeholderTextColor={
                  isDark ? colors.mainDarkMode : colors.grey
                }
                style={[
                  styles.input,
                  { color: isDark ? colors.mainDarkMode : colors.grey },
                ]}
              />
            </View>
          </>
        ) : (
          <TypographyText
            textColor={isDark ? colors.white : colors.darkBlue}
            size={18}
            font={LUSAIL_REGULAR}
            title={label}
            numberOfLines={1}
            style={{ flex: 1, marginRight: 15, fontWeight: "700"
            ,textAlign:'center' }}
          />
        )}
      </View>
      <View
        style={{
          padding: 1,
          borderRadius: 50,
          alignItems: "flex-end",
          marginRight: isRTL() ? 15 : 0,
        }}
      >
        {isScan && (
          <TouchableOpacity onPress={onScanPress}>
            <ScanIcon />
          </TouchableOpacity>
        )}

        {isNotifications && (
          <TouchableOpacity
            style={styles.TabView__item}
            onPress={() => {
              navigation.navigate("Notifications");
              // setIsNotificationModal(null)
            }}
          >
            <View style={styles.iconWrapper}>
              {isDark ? <NotificationIcon /> : <NotificationActiveIcon />}
              {messageNotifications?.filter((m) => m.state === "unread")
                ?.length > 0 && (
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
                    numberOfLines={1}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  messageNotifications: state.notificationsReducer.messageNotifications,
});

export default connect(mapStateToProps, {})(CommonHeader);
