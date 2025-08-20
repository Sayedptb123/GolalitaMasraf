import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper";
import { styles } from "./styles";
import { sized } from "../../Svg";
import { mainStyles, SCREEN_WIDTH } from "../../styles/mainStyles";
import { TypographyText } from "../../components/Typography";
import { colors } from "../../components/colors";
import { BALOO_BOLD, BALOO_SEMIBOLD, LUSAIL_REGULAR } from "../../redux/types";
import BackSvg from "../../assets/back.svg";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../components/ThemeProvider";
import { getConfig } from "./config";
import CommonButton from "../../components/CommonButton/CommonButton";
import i18next from "i18next";
import { getIfEverLoggedIn } from "../../api/asyncStorage";

const OnBoarding = ({ navigation }) => {
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const [isSkip, setIsSkip] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);

  const swiperRef = useRef();

  const swiperData = useMemo(() => getConfig(i18n.language), [i18n.language]);

  const iconsAndTextColor = isDark ? colors.mainDarkMode : "#000";
  const backgroundColor = isDark ? colors.darkBlue : colors.bg;

  const BackIcon = sized(BackSvg, 13, 24, iconsAndTextColor);
  const logoIcon = isDark
    ? require("../../assets/horizontal_logo_white.png")
    : require("../../assets/horizontal_logo.png");

  const handleIndexChange = (index) => {
    if (index === 0 && !isFirstSlide) {
      setIsFirstSlide(true);
    }

    if (index !== 0 && isFirstSlide) {
      setIsFirstSlide(false);
    }

    if (index === 3) setIsSkip(true);

    return null;
  };

  const handleScipPress = async () => {
    const ifEverLoggedIn = await getIfEverLoggedIn();

    if (ifEverLoggedIn) {
      navigation.navigate("Login");
    }

    if (!ifEverLoggedIn) {
      navigation.navigate("RegCodeVerification");
    }

    AsyncStorage.setItem("isBoard", false.toString());
  };

  useEffect(() => {
    if (isSkip) {
      setTimeout(handleScipPress, 3000);
    }
  }, [isSkip]);

  const handleBackPress = () => {
    swiperRef.current.scrollBy(-1);
  };

  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {!isFirstSlide && (
        <TouchableOpacity onPress={handleBackPress} style={styles.back}>
          <BackIcon />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleScipPress} style={styles.skip}>
        <TypographyText
          textColor={iconsAndTextColor}
          size={18}
          font={BALOO_SEMIBOLD}
          title={t("OnBoarding.skip")}
        />
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        onIndexChanged={handleIndexChange}
        loop={false}
        dot={<View style={styles.dot} />}
        activeDot={
          <View style={[styles.dot, { backgroundColor: iconsAndTextColor }]} />
        }
        style={styles.wrapper}
        autoplay={!isFirstSlide}
        autoplayTimeout={3}
      >
        {swiperData.map((item, index) => {
          if (!index) {
            return (
              <TouchableOpacity
                style={[styles.item, mainStyles.p20]}
                activeOpacity={1}
                key={item.key}
              >
                <View style={[mainStyles.centeredRow, { marginTop: 75 }]}>
                  <Image
                    source={logoIcon}
                    style={[
                      localStyles.logoBig,
                      // {
                      //   tintColor: isDark
                      //     ? colors.mainDarkMode
                      //     : colors.darkBlue,
                      // },
                    ]}
                  />
                </View>
                <TypographyText
                  title={t("OnBoarding.welcomeTo")}
                  textColor={iconsAndTextColor}
                  size={24}
                  font={LUSAIL_REGULAR}
                  style={[
                    mainStyles.centeredText,
                    { fontWeight: "900", marginVertical: 24 },
                  ]}
                />
                <View>
                  <CommonButton
                    label={"English"}
                    textColor={
                      i18next.language === "en"
                        ? isDark
                          ? "white"
                          : colors.white
                        : isDark
                        ? colors.mainDarkModeText
                        : colors.darkBlue
                    }
                    style={{
                      backgroundColor:
                        i18next.language === "en"
                          ? isDark
                            ? colors.navyBlue
                            : colors.darkBlue
                          : isDark
                          ? "white"
                          : colors.white,
                      borderStyle: "solid",
                      borderWidth: i18next.language === "en" ? 0 : 1,
                      borderColor: isDark
                        ? colors.mainDarkMode
                        : colors.darkBlue,
                      shadowColor: "rgba(0, 0, 0, 0)",
                      marginBottom: 20,
                    }}
                    onPress={() => {
                      i18next.changeLanguage("en");

                      swiperRef.current.scrollBy(1);
                    }}
                  />
                  <CommonButton
                    label={"عربي"}
                    textColor={
                      i18next.language === "ar"
                        ? isDark
                          ? "white"
                          : colors.white
                        : isDark
                        ? colors.mainDarkModeText
                        : colors.darkBlue
                    }
                    style={{
                      backgroundColor:
                        i18next.language === "ar"
                          ? isDark
                            ? colors.navyBlue
                            : colors.darkBlue
                          : isDark
                          ? "white"
                          : "white",
                      borderStyle: "solid",
                      borderWidth: i18next.language === "ar" ? 0 : 1,
                      borderColor: isDark
                        ? colors.mainDarkMode
                        : colors.darkBlue,
                      shadowColor: "rgba(0, 0, 0, 0)",
                      marginBottom: 20,
                    }}
                    onPress={() => {
                      i18next.changeLanguage("ar");
                      swiperRef.current.scrollBy(1);
                    }}
                  />
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <Image
              source={item.image}
              key={item.key}
              resizeMode="stretch"
              style={localStyles.swiperImage}
            />
          );
        })}
      </Swiper>
    </View>
  );
};

const localStyles = StyleSheet.create({
  swiperImage: {
    width: SCREEN_WIDTH,
    height: "100%",
  },
  logo: {
    height: 40,
    width: 40,
  },
  logoBig: {
    height: 220,
    width: 250,
    resizeMode: "contain",
  },
});

export default OnBoarding;
