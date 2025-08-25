import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  mainStyles,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../../styles/mainStyles";
import { sized } from "../../../Svg";
import { colors } from "../../../components/colors";
import { LUSAIL_REGULAR } from "../../../redux/types";
import { TypographyText } from "../../../components/Typography";
import Swiper from "react-native-swiper";
import IconButton from "../../../components/IconButton/IconButton";
import ArrowUpSvg from "../../../assets/arrow_up.svg";
import ArrowUpBigSvg from "../../../assets/arrow_up_big.svg";
import CallSvg from "../../../assets/call.svg";
import MailSvg from "../../../assets/mail.svg";
import { useTheme } from "../../../components/ThemeProvider";
import ArrowUpBigGreySvg from "../../../assets/arrow_up_grey.svg";
import CallGreySvg from "../../../assets/call_grey.svg";
import MailGreySvg from "../../../assets/mail_grey.svg";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { getFlexDirection } from "../../../../utils";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import CustomMarker from "../../MapPage/CustomMarker";
import WebsiteSvg from "../../../assets/website.svg";
import WebsiteGreySvg from "../../../assets/website_grey.svg";
import WhatsappSvg from "../../../assets/whatsapp.svg";
import { subscribeNotification } from "../../../redux/notifications/notifications-thunks";
import ImageViewer from "react-native-image-zoom-viewer";
import CloseSvg from "../../../assets/close_white.svg";
import CommonButton from "../common/CommonButton";
import InfoItem from "../common/InfoItem";
import CommonHeader from "../../../components/CommonHeader/CommonHeader";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import Rating from "../../../components/Rating";
import HTMLRenderer from "../../../components/HTMLRenderer";

const ArrowUpIcon = sized(ArrowUpSvg, 16);
const ArrowUpBigIcon = sized(ArrowUpBigSvg, 24);
const MailIcon = sized(MailSvg, 24);
const ArrowUpBigGreyIcon = sized(ArrowUpBigGreySvg, 24);
const CallGreyIcon = sized(CallGreySvg, 24);
const MailGreyIcon = sized(MailGreySvg, 24);
const WebsiteIcon = sized(WebsiteSvg, 24);
const WebsiteGreyIcon = sized(WebsiteGreySvg, 24);
const WhatsappIcon = sized(WhatsappSvg, 22);
const CloseIcon = sized(CloseSvg, 24);

const OrganizationOverview = ({ merchantDetails }) => {
  const { i18n, t } = useTranslation();
  const { isDark } = useTheme();
  const navigation = useNavigation();
  const [isFullImage, setIsFullImage] = useState(false);

  const iconColor = isDark ? "#2DC8D8" : "black";
  const CallIcon = sized(CallSvg, 20, 20, iconColor);

  const handleBackPress = () => {
    navigation.goBack ? navigation.goBack() : navigation.navigate("Main");
  };

  if (merchantDetails === null) return null;

  return (
    <ScrollView style={styles.wrapper}>
      <View
        style={{
          backgroundColor: isDark ? "#08003B" : "#fff",
        }}
      >
        <CommonHeader
          isWhite={isDark}
          label={t("PremiumPartner.organization")}
          onBackPress={handleBackPress}
          style={{
            paddingHorizontal: 0,
            backgroundColor: isDark ? colors.darkBlue : undefined,
          }}
        />
        <View>
          <View style={styles.titleWrapper}>
            <Image
              source={{
                uri: merchantDetails.merchant_logo ?? merchantDetails.org_logo,
              }}
              style={styles.logo}
            />

            <TypographyText
              textColor={isDark ? colors.white : colors.darkBlue}
              size={18}
              font={LUSAIL_REGULAR}
              title={merchantDetails.merchant_name ?? merchantDetails.org_name}
              style={{ marginLeft: 8, fontWeight: "700" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
          </View>
          <View
            style={{
              marginTop: 14,
            }}
          >
            {merchantDetails.ribbon_text && (
              <LinearGradient
                start={{ x: 0.3, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={["#2DC8D8", "#ECF281"]}
                style={[styles.ribbon, merchantDetails.ribbon_color && {}]}
              >
                <TypographyText
                  textColor={colors.white}
                  size={14}
                  font={LUSAIL_REGULAR}
                  title={merchantDetails.ribbon_text}
                  style={{
                    width: "75%",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                  numberOfLines={1}
                  textElipsis={"tail"}
                />
              </LinearGradient>
            )}
            {(merchantDetails.banners || merchantDetails.map_banner) && (
              <Swiper
                style={mainStyles.swiper}
                dot={<View style={mainStyles.dot} />}
                activeDot={
                  <View
                    style={[
                      [
                        mainStyles.dot,
                        {
                          backgroundColor: isDark
                            ? colors.green
                            : colors.darkBlue,
                        },
                      ],
                    ]}
                  />
                }
                removeClippedSubviews={false}
              >
                <TouchableOpacity onPress={() => setIsFullImage(true)}>
                  {merchantDetails.banners ? (
                    merchantDetails.banners.map((banner, index) => (
                      <Image
                        key={index}
                        style={mainStyles.swiper__img}
                        source={{ uri: banner.banner_image }}
                      />
                    ))
                  ) : (
                    <Image
                      style={mainStyles.swiper__img}
                      source={{ uri: merchantDetails.map_banner }}
                    />
                  )}
                </TouchableOpacity>
              </Swiper>
            )}
          </View>
        </View>
        {merchantDetails.x_online_store && (
          <CommonButton
            text={`${t("ProductPage.openOnlineStore")} ${
              merchantDetails.merchant_name.length > 15
                ? `${merchantDetails.merchant_name.slice(0, 15)}...`
                : merchantDetails.merchant_name
            } ${t("TabBar.onlineStore")}`}
            onPress={() => Linking.openURL(merchantDetails.website)}
            wrapperStyle={{
              backgroundColor: "#00A3FF",
              marginHorizontal: 20,
              borderWidth: 0,
              marginTop: 25,
            }}
            textStyle={{ color: "#fff" }}
          />
        )}
      </View>

      <View style={{ marginTop: 10, paddingBottom: 40 }}>
        <View style={[mainStyles.row, { marginBottom: 4 }, getFlexDirection()]}>
          <Rating value={+merchantDetails.rating} />
        </View>

        <HTMLRenderer
          value={
            i18n.language === "ar"
              ? merchantDetails.description_arabic ??
                merchantDetails.description
              : merchantDetails.description
          }
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            marginTop: 25,
          }}
        >
          <IconButton
            icon={<ArrowUpIcon />}
            label={t("PremiumPartner.getDirections")}
            color={colors.green}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/dir/Current+Location/${merchantDetails.partner_latitude},${merchantDetails.partner_longitude}`
              )
            }
          />

          <IconButton
            icon={<WhatsappIcon />}
            label="WhatsApp"
            style={{
              backgroundColor: "#25D366",
              borderColor: "#25D366",
            }}
            color={colors.white}
            onPress={() =>
              Linking.openURL(
                `https://wa.me/${merchantDetails.whatsapp_number}?text=${merchantDetails.whatsappx_prefill_message}`
              )
            }
          />
        </View>

        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: merchantDetails.partner_latitude ?? 25.283239397109238,
            longitude: merchantDetails.partner_longitude ?? 51.48449758393703,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <CustomMarker
            item={merchantDetails}
            pressedItem={null}
            setPressedItem={() => {}}
          />
        </MapView>

        {merchantDetails.address && (
          <InfoItem
            label={merchantDetails.address}
            icon={isDark ? <ArrowUpBigGreyIcon /> : <ArrowUpBigIcon />}
            style={{ marginTop: 18 }}
          />
        )}

        {merchantDetails.phone && (
          <InfoItem
            label={merchantDetails.phone}
            icon={isDark ? <CallGreyIcon /> : <CallIcon />}
            onPress={() => Linking.openURL(`tel:${merchantDetails.phone}`)}
            style={{ marginTop: 18 }}
          />
        )}

        {merchantDetails.email && (
          <InfoItem
            label={merchantDetails.email}
            icon={isDark ? <MailGreyIcon /> : <MailIcon />}
            onPress={() => Linking.openURL(`mailto:${merchantDetails.email}`)}
            style={{ marginTop: 18 }}
          />
        )}

        {merchantDetails.website && (
          <InfoItem
            label={merchantDetails.website}
            icon={isDark ? <WebsiteGreyIcon /> : <WebsiteIcon />}
            onPress={() => Linking.openURL(merchantDetails.website)}
            style={{ marginTop: 18 }}
          />
        )}
      </View>

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
                style={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Image
                  source={{
                    uri: merchantDetails.banners
                      ? merchantDetails.banners[0].banner_image
                      : merchantDetails.map_banner,
                  }}
                  style={[
                    {
                      width: SCREEN_WIDTH,
                      height: SCREEN_HEIGHT,
                      resizeMode: "contain",
                      marginTop: (SCREEN_HEIGHT / 100) * 22,
                    },
                    style,
                  ]}
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
              url: merchantDetails.banners
                ? merchantDetails.banners[0].banner_image
                : merchantDetails.map_banner,
              width: SCREEN_WIDTH,
              height: 232,
            },
          ]}
          loadingRender={() => (
            <ActivityIndicator size={"large"} color={colors.green} />
          )}
        />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },
  map: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDFE4",
    marginTop: 20,
  },
  notificationIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDFE4",
    borderRadius: 50,
  },
  ribbon: {
    position: "absolute",
    zIndex: 100,
    width: 170,
    paddingVertical: 4,
    alignItems: "center",
    backgroundColor: colors.green,
    top: 0,
    right: 0,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});

const mapStateToProps = (state) => ({
  merchantDetails: state.merchantReducer.merchantDetails,
});

export default connect(mapStateToProps, { subscribeNotification })(
  React.memo(OrganizationOverview)
);
