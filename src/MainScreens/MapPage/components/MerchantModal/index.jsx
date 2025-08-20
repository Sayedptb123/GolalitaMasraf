import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Linking, StyleSheet, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Portal from "../../../../components/Portal";
import { BALOO_MEDIUM } from "../../../../redux/types";
import { useTheme } from "../../../../components/ThemeProvider";
import { TouchableOpacity } from "react-native";
import { TypographyText } from "../../../../components/Typography";
import { colors } from "../../../../components/colors";
import { Image } from "react-native";
import store from "../../../../redux/store";
import { getMerchantDetails } from "../../../../redux/merchant/merchant-thunks";
import { getCategoryNameByIdAndLang } from "../../../../components/Categories/helpres";
import { mainStyles } from "../../../../styles/mainStyles";
import { isRTL } from "../../../../../utils";
import { useTranslation } from "react-i18next";
import Distance from "./components/Distance";
import { getMerchantDisscountForOffers } from "../../../../api/merchants";

const snapPoints = ["30%"];

const MerchantModal = ({ merchant, setSelectedMerchant }) => {
  const { isDark } = useTheme();
  const bottomSheetModalRef = useRef(null);
  const { t } = useTranslation();
  const [loadingDescription, setLoadingDescription] = useState(false);
  const [description, setDescription] = useState(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    if (index) {
      setSelectedMerchant(null);
    }
  }, []);

  const getOffersDiscountValue = async () => {
    try {
      setLoadingDescription(true);

      const description = await getMerchantDisscountForOffers(
        merchant.merchant_id
      );

      setDescription(description);
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoadingDescription(false);
    }
  };

  const onClosePress = () => {
    setSelectedMerchant(null);
  };

  const handleDetailsPress = () => {
    bottomSheetModalRef.current?.close();

    store.dispatch(
      getMerchantDetails(
        merchant.merchant_id,
        null,
        null,
        getCategoryNameByIdAndLang(merchant.category_id),
        merchant.isOrganization
      )
    );
  };

  const handleNavigatePress = () => {
    bottomSheetModalRef.current?.close();

    Linking.openURL(
      `https://www.google.com/maps/dir/Current+Location/${merchant.partner_latitude},${merchant.partner_longitude}`
    );
  };

  useEffect(() => {
    if (!!merchant) {
      handlePresentModalPress();
    } else {
      handleCloseModalPress();
    }
  }, [merchant]);

  useEffect(() => {
    getOffersDiscountValue();
  }, [merchant?.merchant_id]);

  const borderColor = isDark ? colors.mainDarkMode : colors.darkBlue;
  const backgroundColor = isDark ? colors.darkBlue : colors.white;

  return (
    <Portal name={"merchant-map-modal"}>
      <BottomSheetModalProvider key={"merchant-map-modal"}>
        <View style={styles.container}>
          <BottomSheetModal
            key={"merchant-map-modal"}
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backgroundStyle={{
              backgroundColor,
            }}
          >
            <TouchableOpacity
              onPress={handleDetailsPress}
              style={[
                styles.wrapper,
                {
                  backgroundColor,
                },
              ]}
            >
              <View>
                <View style={styles.cardWrapper}>
                  <Image
                    source={{ uri: merchant?.merchant_logo }}
                    style={[
                      styles.logo,
                      {
                        borderColor: isDark
                          ? colors.mainDarkMode
                          : colors.darkBlue,
                        borderWidth: 2,
                      },
                    ]}
                  />

                  <View style={styles.textBlock}>
                    <TypographyText
                      title={
                        isRTL()
                          ? merchant?.x_arabic_name
                          : merchant?.merchant_name
                      }
                      textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
                      size={16}
                      font={BALOO_MEDIUM}
                      numberOfLines={2}
                      style={styles.name}
                    />

                    <TypographyText
                      title={
                        isRTL()
                          ? description?.x_ribbon_text_arabic || ""
                          : description?.ribbon_text || ""
                      }
                      textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
                      size={16}
                      font={BALOO_MEDIUM}
                      numberOfLines={2}
                      style={styles.name}
                    />

                    {loadingDescription && <ActivityIndicator />}

                    <View style={styles.navigateBtn}>
                      <Distance
                        latitude={merchant?.partner_latitude}
                        longitude={merchant?.partner_longitude}
                      />

                      <TouchableOpacity
                        onPress={handleNavigatePress}
                        style={[
                          styles.btn,
                          {
                            borderColor,
                          },
                        ]}
                      >
                        <TypographyText
                          title={t("MapPage.navigate")}
                          textColor={
                            isDark ? colors.mainDarkMode : colors.darkBlue
                          }
                          size={14}
                          font={BALOO_MEDIUM}
                          numberOfLines={1}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={onClosePress}
                    style={styles.closeWrapper}
                  >
                    <TypographyText
                      title={"X"}
                      textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
                      size={16}
                      font={BALOO_MEDIUM}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    alignItems: "center",
  },
  cardWrapper: {
    flexDirection: "row",
    marginHorizontal: 0,
  },
  wrapper: {
    padding: 16,
    borderRadius: 8,
    ...mainStyles.shadow,
  },

  closeWrapper: {},
  logo: {
    height: 120,
    width: 120,
    backgroundColor: "grey",
    borderRadius: 8,
  },
  textBlock: {
    paddingHorizontal: 10,
    flex: 1,
  },
  name: {
    flexGrow: 1,
    flexDirection: "row",
  },
  navigateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    flexDirection: "row",
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginLeft: 15,
  },
});

export default MerchantModal;
