import React, { useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Modal,
  ActivityIndicator,
} from "react-native";

import { sized } from "../../../Svg";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, mainStyles } from "../../../styles/mainStyles";
import { colors } from "../../../components/colors";
import Swiper from "react-native-swiper";
import CommonButton from "../../../components/CommonButton/CommonButton";
import ImageViewer from "react-native-image-zoom-viewer";
import { connect } from "react-redux";
import HTMLRenderer from "../../../components/HTMLRenderer";
import CloseSvg from "../../../assets/close.svg";
import { getMerchantDetails } from "../../../redux/merchant/merchant-thunks";

const CloseIcon = sized(CloseSvg, 14, 14, "white");

const NotificationModal = ({
  messageNotifications,
  notifications,
  isSingle,
  getMerchantDetails,
  setIsNotificationModal,
  setPressedNotification,
}) => {
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  const navigation = useNavigation();
  const [fullImage, setFullImage] = useState(false);

  return (
    <View style={mainStyles.notificationModal}>
      <TouchableOpacity
        onPress={() => {
          setPressedNotification(null);
        }}
        style={mainStyles.notificationModal__close}
      >
        <CloseIcon color={colors.darkBlue} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ marginHorizontal: 16 }}
        style={{ marginTop: 16 }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ height: SCREEN_HEIGHT / 1.7 }}
        >
          <Swiper
            // style={{height: SCREEN_WIDTH / 100 * 95 + 100}}
            autoplay={true}
            autoplayTimeout={8}
            dot={
              <View
                style={[mainStyles.dot, { backgroundColor: colors.darkBlue }]}
              />
            }
            activeDot={
              <View
                style={[[mainStyles.dot, { backgroundColor: colors.orange }]]}
              />
            }
            removeClippedSubviews={false}
          >
            {{
              notifications: isSingle ? notifications : messageNotifications,
            }.notifications
              .filter((m) => (isSingle ? true : m.state === "unread"))
              .map((notification, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  style={{ flex: 1 }}
                  key={index}
                  onPress={() => {
                    setFullImage(notification.offer_image);
                  }}
                >
                  <Image
                    source={{ uri: notification.offer_image }}
                    style={mainStyles.notificationModal__image}
                    resizeMode="contain"
                  />
                  <HTMLRenderer
                    style={{ marginTop: 16 }}
                    isBlack={true}
                    value={
                      language === "ar"
                        ? notification?.html_description_arabic ||
                          notification.x_description_arabic
                        : notification.html_description ??
                          notification.description
                    }
                    color={colors.darkBlue}
                  />

                  <View
                    style={[
                      mainStyles.centeredRow,
                      { flexDirection: "column", marginBottom: 100 },
                    ]}
                  >
                    <CommonButton
                      label={t("MainScreen.readMore")}
                      style={mainStyles.notificationModal__button}
                      onPress={() => {
                        if (notification.url_notification) {
                          Linking.openURL(notification.url_notification);
                        } else {
                          getMerchantDetails(
                            notification.merchant_id,
                            navigation,
                            t
                          );
                        }
                      }}
                    />
                    {!isSingle && (
                      <View style={mainStyles.centeredRow}>
                        <CommonButton
                          label={t("MainScreen.seeNotifications")}
                          style={[
                            mainStyles.notificationModal__button,
                            { marginVertical: 10, width: "70%" },
                          ]}
                          onPress={() => {
                            setIsNotificationModal(null);
                            navigation.navigate("Notifications");
                          }}
                        />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
          </Swiper>
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={!!fullImage} transparent={true}>
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
                  paddingVertical: 10,
                }}
              >
                <Image
                  source={{
                    uri: source.uri,
                  }}
                  style={[
                    {
                      width: "100%",
                      height: "100%",
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
                  onPress={() => setFullImage(false)}
                  style={mainStyles.modal__close}
                >
                  <CloseIcon />
                </TouchableOpacity>
              </View>
            );
          }}
          onSwipeDown={() => setFullImage(false)}
          enableSwipeDown={true}
          imageUrls={[{ url: fullImage }]}
          loadingRender={() => (
            <ActivityIndicator size={"large"} color={colors.green} />
          )}
          renderIndicator={() => null}
        />
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => ({
  messageNotifications: state.notificationsReducer.messageNotifications,
});

export default connect(mapStateToProps, {
  getMerchantDetails,
})(NotificationModal);
