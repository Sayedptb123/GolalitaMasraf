import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Login from "../AuthScreens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnBoarding from "../AuthScreens/OnBoarding/OnBoarding";
import ForgotPassword from "../AuthScreens/ForgotPassword";
import Register from "../AuthScreens/Register/Register";
import RegCodeVerification from "../AuthScreens/Register/RegCodeVerification";
import CodeConfirmation from "../AuthScreens/Register/CodeConfirmation";
import CreatePassword from "../AuthScreens/CreatePassword/CreatePassword";
import PrivacyPolicy from "../MainScreens/PrivacyPolicy";
import Verification from "../AuthScreens/Verification/Verification";
import { useDispatch } from "react-redux";
import RNBootSplash from "react-native-bootsplash";
import { Platform } from "react-native";

const Stack = createStackNavigator();

export const Authorization = () => {
  const [isOnBoarding, setIsOnBoarding] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        if (Platform.OS === "android") {
          RNBootSplash.hide({ fade: true });
        }
      }, 2000);

      const isBoard = await AsyncStorage.getItem("isBoard");
      setIsOnBoarding(JSON.parse(isBoard) === null);
    })();
  }, []);
  if (isOnBoarding === null) return null;
  return (
    <Stack.Navigator
      initialRouteName={isOnBoarding ? "OnBoarding" : "Login"}
      // initialRouteName={'Login'}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="RegCodeVerification"
        component={RegCodeVerification}
      />
      <Stack.Screen
        name="CodeConfirmation"
        component={CodeConfirmation}
      />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name={"PrivacyPolicy"} component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};
