import React, { useEffect, useRef, useState } from "react";
import {
  Linking,
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { getPasscard } from "../../../api/merchants";
import WebView from "react-native-webview";
import FullScreenLoader from "../../../components/Loaders/FullScreenLoader";
import { useTheme } from "../../../components/ThemeProvider";
import { colors } from "../../../components/colors";
import CommonHeader from "../../../components/CommonHeader/CommonHeader";
import { useTranslation } from "react-i18next";
import { useRoute } from "@react-navigation/native";
import { transformExpiryDateForRequest } from "../utils";

const isIos = Platform.OS === "ios";

const Passcard = () => {
  const [pageUrl, setPageUrl] = useState(null);
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const webviewRef = useRef(null);
  const route = useRoute();
  const user = route.params.cardData;

  useEffect(() => {
    if (!user.x_user_expiry) {
      console.warn("user object do not have create_date field");
      return;
    }

    const expiryDate = transformExpiryDateForRequest(user.x_user_expiry);

    console.log(expiryDate, "expiryDate");

    getPasscard(user.name, expiryDate, user.barcode?.toString()).then((res) => {
      setPageUrl(res?.[0]?.page_url);
    });
  }, [user]);

  const handleNavigationStateChange = async (e) => {
    const url = e.url;

    if (url.includes("pkpass") && isIos) {
      webviewRef.current.goBack();

      try {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url);
        } else {
          alert(`Don't know how to open this URL: ${url}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader
        isWhite={isDark}
        label={t("CardPage.golalitaCard")}
        style={{ backgroundColor: isDark ? colors.darkBlue : undefined }}
      />

      <View style={{ flex: 1 }}>
        {!pageUrl && <FullScreenLoader style={styles.loader} />}

        {pageUrl && (
          <WebView
            ref={webviewRef}
            source={{
              uri: pageUrl,
            }}
            startInLoadingState={true}
            allowUniversalAccessFromFileURLs={true}
            javaScriptEnabled={true}
            mixedContentMode={"always"}
            style={styles.webView}
            onNavigationStateChange={handleNavigationStateChange}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    width: 200,
    alignSelf: "center",
  },
  topSpace: {
    marginTop: 16,
  },
  appleIcon: {
    width: 108,
    height: 32,
  },
  googleIcon: {
    width: 118,
    height: 35,
  },
  text: {
    textAlign: "center",
  },
  webView: {
    flex: 1,
  },
  loader: {
    width: 20,
    height: "100%",
    alignSelf: "center",
    flex: 0,
  },
});

export default Passcard;
