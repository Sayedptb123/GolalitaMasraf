import React from "react";
import { Linking, SafeAreaView, StyleSheet, View, Image } from "react-native";
import { sized } from "../../Svg";
import { colors } from "../../components/colors";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import { mainStyles } from "../../styles/mainStyles";
import { BALOO_REGULAR, BALOO_SEMIBOLD } from "../../redux/types";
import { TypographyText } from "../../components/Typography";
import { useTheme } from "../../components/ThemeProvider";
import { connect } from "react-redux";
import { contactUs } from "../../redux/auth/auth-thunks";
import { useTranslation } from "react-i18next";
import CallSvg from "../../assets/callf.svg";
import MailSvg from "../../assets/mailf.svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { isRTL } from "../../../utils";
import Header from "../../components/Header";

const ContactUs = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const iconColor = isDark ? colors.mainDarkMode : colors.darkBlue;
  const CallIcon = sized(CallSvg, 23, 23, iconColor);
  const MailIcon = sized(MailSvg, 23, 23, iconColor);
  const handlePhonePress = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };
  const renderInfo = (item, title, value, onPress, isHtml) => {
    if (!item) {
      return null;
    }

    return (
      <View style={styles.infoItem}>
        <View style={styles.infoItemTitleWrapper}>
          <View
            style={[
              styles.infoItemTitle,
              {
                backgroundColor: isDark ? colors.darkBlue : "#fff",
                flexDirection: isRTL() ? "row-reverse" : "row",
              },
            ]}
          >
            <CallIcon />
            <TypographyText
              textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
              size={20}
              font={BALOO_SEMIBOLD}
              style={{ fontWeight: "700", marginHorizontal: 11 }}
              title={item}
            />
          </View>
        </View>
        <TypographyText
          title={t("ContactUs.visit")}
          textColor={isDark ? colors.mainDarkMode : colors.mainDarkModeText}
          size={16}
          font={BALOO_SEMIBOLD}
          style={[
            {
              //marginVertical: 24,
              fontWeight: "900",
              margin: 16,
            },
          ]}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
            flex: 1,
          }}
        >
          {title &&
            title.map((i) => {
              return (
                <View
                  style={[
                    styles.infoItemValueContainer,
                    {
                      borderColor: isDark
                        ? colors.mainDarkMode
                        : colors.darkBlue,
                    },
                  ]}
                >
                  <TypographyText
                    textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
                    size={19}
                    font={BALOO_REGULAR}
                    title={i}
                    style={styles.infoItemValue}
                    onPress={() => handlePhonePress(i)}
                  />
                </View>
              );
            })}
        </View>
      </View>
    );
  };

  const renderInfoEmail = (item, title, value, onPress, isHtml) => {
    if (!item) {
      return null;
    }

    return (
      <View style={styles.infoItem}>
        <View style={styles.infoItemTitleWrapper}>
          <View
            style={[
              styles.infoItemTitle,
              {
                backgroundColor: isDark ? colors.darkBlue : "#fff",
                flexDirection: isRTL() ? "row-reverse" : "row",
              },
            ]}
          >
            <MailIcon />
            <TypographyText
              textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
              size={20}
              font={BALOO_SEMIBOLD}
              style={{ fontWeight: "700", marginHorizontal: 11 }}
              title={item}
            />
          </View>
        </View>
        {!!item && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={[
                styles.infoItemValueContainer,
                { borderColor: isDark ? colors.mainDarkMode : colors.darkBlue },
              ]}
            >
              <TypographyText
                textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
                size={19}
                font={BALOO_REGULAR}
                title={title}
                style={styles.infoItemValueEmail}
                onPress={() => Linking.openURL(`mailto:support@golalita.com`)}
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          backgroundColor: isDark ? colors.darkBlue : colors.white,
          flex: 1,
        }}
      >
        <SafeAreaView>
          <Header label={t("ContactUs.contactUs")} btns={["back"]} />

          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={mainStyles.p20}>
              {renderInfo(t("ContactUs.callCenter"), [
                "0097441410399",
                "0097441410398",
              ])}

              {renderInfoEmail(
                t("ContactUs.email"),
                ["support@golalita.com"],
                () => {
                  Linking.openURL(`mailto:support@golalita.com`);
                }
              )}
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondPhone: {
    marginLeft: 15,
  },
  map: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDFE4",
    marginTop: 20,
  },
  iconWrapper: {
    ...mainStyles.lightShadow,
    position: "absolute",
    top: 8,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 50,
  },
  notificationIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDFE4",
    borderRadius: 50,
  },
  shareIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDFE4",
    borderRadius: 50,
    position: "absolute",
    bottom: -50,
    zIndex: 100,
  },
  icon: {
    position: "absolute",
    top: -5,
    right: -5,
    zIndex: 100,
  },
  ribbon: {
    position: "absolute",
    zIndex: 100,
    width: 170,
    paddingVertical: 4,
    alignItems: "center",
    top: 0,
    left: -20,
  },
  p: { color: "white" },
  a: { color: "white" },
  h1: { color: "white" },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    // top: -32,
    //    backgroundColor:'red'
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
  },
  controllBtns: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "75%",
  },
  imagesIndicator: {
    position: "absolute",
    bottom: 85,
    alignSelf: "center",
  },
  infoItem: {
    marginTop: 40,
    // borderWidth: 1.5,
    borderRadius: 10,
    // borderColor: "rgba(211,211,211,0.3)",
    // padding: 12,
    //position: "relative",
    paddingTop: 15,
  },
  infoItemTitleWrapper: {
    padding: 6,
    // position: "absolute",
    /// top: -30,
    width: "100%",
    //justifyContent: "center",
    //alignItems: "center",
  },
  infoItemTitle: {
    // borderWidth: 1.5,
    borderRadius: 10,
    // borderColor: "rgba(211,211,211,0.3)",
    padding: 8,
    flexDirection: "row",
    flex: 1,
  },
  infoItemValue: {
    alignSelf: "center",
    textAlignVertical: "center",
    // marginTop: 11,
  },
  infoItemValueEmail: {
    // alignSelf:'center',
    // textAlignVertical:'center',
    // marginTop: 11,
  },
  specialOfferBlock: {
    borderWidth: 1,
    borderColor: colors.grey,
    flexDirection: "row",
    borderRadius: 4,
    marginTop: 20,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  specialOfferBlockInfo: {
    padding: 10,
  },
  infoItemValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
    borderWidth: 1,
    padding: 11,
    paddingHorizontal: 16,
    borderRadius: 33,
    //flex:1
  },
});

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { contactUs })(ContactUs);
