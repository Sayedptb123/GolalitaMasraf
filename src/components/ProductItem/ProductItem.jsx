import React, { useRef, useState } from "react";
import { TouchableOpacity, View, ActivityIndicator, Modal } from "react-native";
import PremiumSvg from "../../assets/premium.svg";
import { sized } from "../../Svg";
import {
  mainStyles,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../styles/mainStyles";
import { colors } from "../colors";
import { LUSAIL_REGULAR } from "../../redux/types";
import { TypographyText } from "../Typography";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import StarSvg from "../../assets/favorites.svg";
import ShareSvg from "../../assets/share.svg";
import ViewSvg from "../../assets/view.svg";
import IconButton from "../IconButton/IconButton";
import { useNavigation } from "@react-navigation/native";
import WhiteStarSvg from "../../assets/star_white.svg";
import { useTheme } from "../ThemeProvider";
import StarActiveSvg from "../../assets/star_active.svg";
import ShareActiveSvg from "../../assets/share_active.svg";
import ViewActiveSvg from "../../assets/view_active.svg";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { getFlexDirection, isRTL } from "../../../utils";
import { captureRef } from "react-native-view-shot";
import { saveOffer } from "../../redux/merchant/merchant-thunks";
import ImageViewer from "react-native-image-zoom-viewer";
import CloseSvg from "../../assets/close_white.svg";
import Share from "react-native-share";
import i18n from "i18next";
import FastImage from "react-native-fast-image";
import useIsGuest from "../../hooks/useIsGuest";

const PremiumIcon = sized(PremiumSvg, 24);
const StarIcon = sized(StarSvg, 13, 13, "#999CAD");
const WhiteStarIcon = sized(WhiteStarSvg, 13);
const ShareIcon = sized(ShareSvg, 15, 12, colors.darkBlue);
const ViewIcon = sized(ViewSvg, 15, 12, colors.darkBlue);
const StarActiveIcon = sized(StarActiveSvg, 13);
const ShareActiveIcon = sized(ShareActiveSvg, 15, 12, colors.mainDarkMode);
const ViewActiveIcon = sized(ViewActiveSvg, 15, 12);
const CloseIcon = sized(CloseSvg, 24);

const ProductItem = ({
  isPoints,
  discount,
  isSaved,
  product,
  merchantDetails,
  favoriteOffers,
  saveOffer,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { isDark } = useTheme();
  const viewRef = useRef();
  const [isFullImage, setIsFullImage] = useState(false);
  const isGuest = useIsGuest();

  const onShare = async () => {
    try {
      const url = await captureRef(viewRef, {
        result: "tmpfile",
        height: 400,
        width: 335,
        quality: 1,
        format: "png",
      });

      await Share.open({ url });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal visible={isFullImage} transparent={true}>
        <ImageViewer
          supportedOrientations={[
            "portrait",
            "portrait-upside-down",
            "landscape",
            "landscape-left",
            "landscape-right",
          ]}
          saveToLocalByLongPress={false}
          index={0}
          renderImage={({ source, style }) => {
            return (
              <View
                style={{ alignItems: "center", justifyContent: "flex-end" }}
              >
                <FastImage
                  source={{ uri: product.image_url }}
                  style={[
                    {
                      width: SCREEN_WIDTH,
                      height: SCREEN_HEIGHT,
                      resizeMode: "contain",
                      marginTop: (SCREEN_HEIGHT / 100) * 22,
                    },
                    style,
                  ]} // your custom style object
                  // any supported props by Image
                />
              </View>
            );
          }}
          renderHeader={(props) => {
            return (
              <View
                style={[
                  mainStyles.row,
                  {
                    justifyContent: "space-between",
                    top: 50,
                    left: 20,
                    position: "absolute",
                    zIndex: 100,
                    width: "90%",
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => setIsFullImage(false)}
                  style={mainStyles.modal__close}
                >
                  <CloseIcon />
                </TouchableOpacity>
              </View>
            );
          }}
          onSwipeDown={() => setIsFullImage(false)}
          enableSwipeDown={true}
          imageUrls={[
            {
              url: product.image_url,
              width: SCREEN_WIDTH,
              minHeight: SCREEN_HEIGHT / 2,
            },
          ]}
          loadingRender={() => (
            <ActivityIndicator
              size={"large"}
              color={isDark ? colors.white : colors.green}
            />
          )}
        />
      </Modal>
      <View
        ref={viewRef}
        style={[styles.product, isDark && { backgroundColor: colors.navyBlue }]}
      >
        <View>
          <View style={[mainStyles.betweenRow]}>
            <View style={[mainStyles.row]}>
              <View style={[mainStyles.logoWrapper, { marginLeft: 6 }]}>
                {/*<Image*/}
                {/*  source={{uri: merchantDetails?.merchant_logo ?? product.merchant_logo}}*/}
                {/*  style={{width: 46, height: 46, borderRadius: 50}}*/}
                {/*  // cacheKey={`logo_${product.merchant_id ?? merchantDetails.merchant_id ?? merchantDetails.id ?? merchantDetails.partner_id?.[0]}`}*/}
                {/*/>*/}
                <FastImage
                  source={{
                    uri:
                      product.merchant_logo ?? merchantDetails?.merchant_logo,
                  }}
                  style={{ width: 46, height: 46, borderRadius: 50 }}
                />
                <PremiumIcon
                  style={{ position: "absolute", top: 0, right: 0 }}
                />
              </View>
              <TypographyText
                textColor={isDark ? colors.white : colors.darkBlue}
                size={18}
                font={LUSAIL_REGULAR}
                title={product.merchant_name ?? merchantDetails?.merchant_name}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontWeight: "700",
                  width:
                    discount > 0 || product.points > 0 || product.x_point > 0
                      ? "62%"
                      : "75%",
                }}
              />
            </View>
          </View>
          <View
            style={[
              styles.imgWrapper,
              isDark && { borderBottomColor: colors.darkBlue },
            ]}
          >
            <TouchableOpacity onPress={() => setIsFullImage(true)}>
              <FastImage
                source={{ uri: product.image_url }}
                style={{
                  width: SCREEN_WIDTH - 72,
                  borderRadius: 4,
                  height: 200,
                  resizeMode: "contain",
                  position: "relative",
                  zIndex: -1,
                }}
              />
            </TouchableOpacity>
            <TypographyText
              textColor={isDark ? colors.white : colors.green}
              size={18}
              font={LUSAIL_REGULAR}
              title={product.lst_price !== 0 ? `${product.lst_price} QAR` : ""}
              style={{
                fontWeight: "700",
                position: "absolute",
                bottom: 15,
                left: isRTL() ? 0 : 20,
                right: isRTL() ? 20 : 0,
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              right: 0,
              top: 15,
              zIndex: 99999,
            }}
          >
            {(product.point > 0 || product.x_point > 0) && (
              <View
                style={[styles.product__pointsWrapper, { marginBottom: 7 }]}
              >
                <LinearGradient
                  style={styles.product__points}
                  colors={[
                    isDark ? colors.white : colors.green,
                    colors.lightGreen,
                  ]}
                >
                  <TypographyText
                    textColor={colors.white}
                    size={24}
                    font={LUSAIL_REGULAR}
                    title={product.point ?? product.x_point}
                    style={{ textAlign: "center", fontWeight: "900" }}
                  />
                  <TypographyText
                    textColor={colors.white}
                    size={14}
                    font={LUSAIL_REGULAR}
                    title={t("Product.points")}
                    style={{
                      textAlign: "center",
                      marginTop: -10,
                      fontWeight: "900",
                    }}
                  />
                </LinearGradient>
              </View>
            )}
            {discount > 0 && (
              <View style={styles.product__pointsWrapper}>
                <View
                  style={[
                    styles.product__points,
                    { backgroundColor: colors.orange },
                    isRTL() && {
                      borderTopRightRadius: 10,
                      borderBottomRightRadius: 10,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    },
                  ]}
                >
                  <TypographyText
                    textColor={colors.white}
                    size={24}
                    font={LUSAIL_REGULAR}
                    title={`-${discount}%`}
                    style={{ textAlign: "center", fontWeight: "900" }}
                  />
                  <TypographyText
                    textColor={colors.white}
                    size={14}
                    font={LUSAIL_REGULAR}
                    title={t("Product.discount")}
                    style={{
                      textAlign: "center",
                      marginTop: -10,
                      fontWeight: "900",
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={[mainStyles.p20]}>
          <TypographyText
            textColor={isDark ? colors.white : colors.darkBlue}
            size={18}
            font={LUSAIL_REGULAR}
            title={product.name}
            style={{ marginTop: 10, fontWeight: "700" }}
          />
          <TypographyText
            textColor={isDark ? colors.lightGrey : colors.grey}
            size={14}
            font={LUSAIL_REGULAR}
            title={
              i18n.language === "ar"
                ? product.x_description_arabic
                : product.description_sale ?? product.offer_label
            }
            // style={{marginTop: 10}}
          />
          <View
            style={[
              mainStyles.betweenRow,
              { marginTop: 13 },
              getFlexDirection(),
            ]}
          >
            {!isGuest && (
              <IconButton
                style={
                  isSaved ||
                  favoriteOffers?.find?.((o) => o?.id === product?.id) !==
                    undefined
                    ? {
                        backgroundColor: colors.orange,
                        borderColor: "transparent",
                      }
                    : {}
                }
                onPress={() => {
                  saveOffer(product.id, t);
                }}
                color={
                  isSaved ||
                  favoriteOffers?.find?.((o) => o?.id === product?.id) !==
                    undefined
                    ? colors.white
                    : null
                }
                icon={
                  isSaved ||
                  favoriteOffers?.find?.((o) => o?.id === product?.id) !==
                    undefined ? (
                    <WhiteStarIcon />
                  ) : isDark ? (
                    <StarActiveIcon />
                  ) : (
                    <StarIcon />
                  )
                }
                label={t("Product.save")}
              />
            )}
            <IconButton
              onPress={onShare}
              icon={isDark ? <ShareActiveIcon /> : <ShareIcon />}
              label={t("Product.share")}
              color={isDark ? colors.mainDarkMode : colors.darkBlue}
            />
            <IconButton
              onPress={() =>
                navigation.navigate("ProductPage", {
                  product: {
                    ...product,
                    merchant_logo:
                      product.merchant_logo ?? merchantDetails?.merchant_logo,
                    merchant_id:
                      product.merchant_id ??
                      merchantDetails.merchant_id ??
                      merchantDetails.id ??
                      merchantDetails.partner_id?.[0],
                    merchant_name:
                      product.merchant_name ?? merchantDetails?.merchant_name,
                  },
                })
              }
              icon={isDark ? <ViewActiveIcon /> : <ViewIcon />}
              label={t("Product.view")}
              color={isDark ? colors.mainDarkMode : colors.darkBlue}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = (state) => ({
  merchantDetails: state.merchantReducer.merchantDetails,
  favoriteOffers: state.merchantReducer.favoriteOffers,
});

export default connect(mapStateToProps, { saveOffer })(ProductItem);
