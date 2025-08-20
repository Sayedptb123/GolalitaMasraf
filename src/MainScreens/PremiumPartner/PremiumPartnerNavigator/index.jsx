import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PremiumPartner from "../PremiumPartner";
import Menu from "../Menu";

const Stack = createStackNavigator();

const PremiumPartnerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTruncatedBackTitle: "back",
        headerShown: false,
      }}
    >
      <Stack.Screen name="premiumPartner-main" component={PremiumPartner} />

      <Stack.Screen name="premiumPartner-menu" component={Menu} />
    </Stack.Navigator>
  );
};

export default PremiumPartnerNavigator;
