import React, { useEffect, useState } from "react";
import { BackHandler, Image, View, Text, TouchableOpacity } from "react-native";
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
import RedirectToStoresModal, {
  STORES_CONFIG,
} from "./src/components/RedirectToStoresModal";
import Geocoder from "react-native-geocoding";

import PortalProvider from "./src/components/Portal/PortalProvider";

I18nManager.allowRTL(false);

const queryClient = new QueryClient();

Geocoder.init("AIzaSyAYjhzanBtI_zeCxlnel5cw7zriaWTcOTo", { language: "en" });

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ 
          flex: 1, 
          backgroundColor: colors.white, 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 20
        }}>
          <Text style={{ 
            fontSize: 18, 
            color: colors.darkBlue, 
            textAlign: 'center',
            marginBottom: 20
          }}>
            Something went wrong. Please restart the app.
          </Text>
          <TouchableOpacity 
            style={{
              backgroundColor: colors.darkBlue,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8
            }}
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text style={{ color: colors.white }}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

let App = ({
  workStatus,
  version,
  getAppStatus,
  getVersion,
  user,
  isAuthorized,
}) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [updateModal, setUpdateModal] = useState(null);
  const { isDark, setScheme } = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
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
      } catch (error) {
        console.error("Error in App useEffect:", error);
        // Fallback to unauthorized state if there's an error
        dispatch(setIsAuthorized(false));
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
    try {
      resetImageCacheDate();
      getVersion();
    } catch (error) {
      console.error("Error in version useEffect:", error);
    }
  }, []);

  useEffect(() => {
    try {
      getAppStatus();
      (async () => {
        const lang = await AsyncStorage.getItem("lang");
        i18n.changeLanguage(lang ?? "en");
      })();
    } catch (error) {
      console.error("Error in app status useEffect:", error);
    }
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
        // Fallback to light mode if there's an error
        setScheme("light");
      }
    })();
  }, []);

  useEffect(() => {
    if (version) {
      try {
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
      } catch (error) {
        console.error("Error in version comparison:", error);
      }
    }
  }, [version]);

  useEffect(() => {
    if (workStatus === APP_DISABLED) {
      BackHandler.exitApp();
    }
  }, [workStatus]);

  // Show loading indicator while determining authorization state
  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        backgroundColor: colors.white, 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Text style={{ fontSize: 16, color: colors.darkBlue, marginBottom: 10 }}>
          Loading...
        </Text>
      </View>
    );
  }

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
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  workStatus: state.authReducer.workStatus,
  version: state.authReducer.version,
  isAuthorized: state.authReducer.isAuthorized,
});

App = connect(mapStateToProps, { getAppStatus, getVersion })(App);

const AppWrapper = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <PortalProvider>
              <App />
            </PortalProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default AppWrapper;
