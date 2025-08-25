import React, { useEffect, useState } from "react";
import { BackHandler, Image } from "react-native";
import { connect, Provider, useDispatch } from "react-redux";
import store from "./src/redux/store";
import { ThemeProvider, useTheme } from "./src/components/ThemeProvider";
import {
  getAppStatus,
  getInitialData,
  getVersion,
} from "./src/redux/auth/auth-thunks";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_DISABLED } from "./src/redux/auth/auth-types";
import { Root } from "./src/Navigation/Root";
import UpdateModal from "./src/components/UpdateModal";
import FlashMessage from "react-native-flash-message";
import { colors } from "./src/components/colors";
import { VERSION } from "./src/redux/types";
import "./src/languages/index";
import { QueryClient, QueryClientProvider } from "react-query";
import { I18nManager } from "react-native";
import { resetImageCacheDate } from "./src/api/asyncStorage";
import { checkIfTokenIsValid } from "./src/api/auth";
import { setIsAuthorized } from "./src/redux/auth/auth-actions";
import SplashScreenModal from "./src/components/SplashScreenModal";
import RedirectToStoresModal, {
  STORES_CONFIG,
} from "./src/components/RedirectToStoresModal";
import Geocoder from "react-native-geocoding";
import codePush from "react-native-code-push";
import CodePushUpdate from "./src/components/CodePushUpdate";
import PortalProvider from "./src/components/Portal/PortalProvider";

I18nManager.allowRTL(false);

const queryClient = new QueryClient();

Geocoder.init("AIzaSyAYjhzanBtI_zeCxlnel5cw7zriaWTcOTo", { language: "en" });

let App = ({
  workStatus,
  version,
  getAppStatus,
  getVersion,
  user,
  isAuthorized,
  isSplashScreenVisible,
}) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [updateModal, setUpdateModal] = useState(null);
  const { isDark, setScheme } = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const isTokenValid = await checkIfTokenIsValid();

      console.log(isTokenValid, "isTokenValid");

      if (!isTokenValid) {
        dispatch(setIsAuthorized(false));
        return;
      }

      const isLoggedOut = await AsyncStorage.getItem("isUserLoggedOut");

      console.log(isLoggedOut, "isLoggedOut");

      if (isLoggedOut === "true") {
        dispatch(setIsAuthorized(false));
        return;
      }

      if (isLoggedOut === "false") {
        dispatch(getInitialData());
      }
    })();
  }, []);

  useEffect(() => {
    if (!!user) {
      dispatch(setIsAuthorized(true));
    }
  }, [!!user]);

  useEffect(() => {
    if (typeof isAuthorized === "boolean") {
      setIsLoading(false);
    }
  }, [isAuthorized]);

  useEffect(() => {
    resetImageCacheDate();
    getVersion();
  }, []);

  useEffect(() => {
    getAppStatus();
    (async () => {
      const lang = await AsyncStorage.getItem("lang");
      i18n.changeLanguage(lang ?? "en");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const isdark =
          (await AsyncStorage.getItem("isDark")) === "false" ||
          (await AsyncStorage.getItem("isDark")) === null;

        isdark ? setScheme("light") : setScheme("dark");
      } catch (error) {
        console.error("Error retrieving settings:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (version) {
      let latestVersion = version;
      let lastLatestVersionNumber =
        latestVersion.split(".")[latestVersion.split(".").length - 1];
      let secondLatestVersionNumber =
        latestVersion.split(".")[latestVersion.split(".").length - 2];
      let lastCurrentVersionNumber =
        VERSION.split(".")[VERSION.split(".").length - 1];
      let secondCurrentVersionNumber =
        VERSION.split(".")[VERSION.split(".").length - 2];
      let latestVersionNumber = latestVersion.split(".").join("");
      let currentVersionNumber = VERSION.split(".").join("");

      if (latestVersionNumber > currentVersionNumber) {
        if (
          lastLatestVersionNumber !== lastCurrentVersionNumber &&
          latestVersionNumber - currentVersionNumber < 5
        ) {
          setUpdateModal("easy");
        } else if (secondLatestVersionNumber !== secondCurrentVersionNumber) {
          setUpdateModal("hard");
        }
      }
      console.log("latestVersion", latestVersion, VERSION === latestVersion); // 0.1.2
    }
  }, [version]);

  useEffect(() => {
    if (workStatus === APP_DISABLED) {
      BackHandler.exitApp();
    }
  }, [workStatus]);

  if (STORES_CONFIG.find((item) => item.name === user?.organisation)) {
    return <RedirectToStoresModal organization={user.organisation} />;
  }

  return (
    <>
      {isAuthorized !== null && <Root isAuthorized={isAuthorized} />}
      {updateModal && (
        <UpdateModal
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          version={version}
        />
      )}
      <FlashMessage
        position="center"
        style={{ backgroundColor: isDark ? colors.darkBlue : colors.white }}
        titleStyle={{ color: isDark ? colors.white : colors.darkBlue }}
      />
      <SplashScreenModal isVisible={isSplashScreenVisible} />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  workStatus: state.authReducer.workStatus,
  version: state.authReducer.version,
  isAuthorized: state.authReducer.isAuthorized,
  isSplashScreenVisible: state.authReducer.isSplashScreenVisible,
});

App = connect(mapStateToProps, { getAppStatus, getVersion })(App);

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <PortalProvider>
            <App />
          </PortalProvider>

          <CodePushUpdate />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

export default codePush(codePushOptions)(AppWrapper);
