import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MerchantsPage from "../MerchantsPage";
import NewMerchantsPage from "../NewMerchantsPage";
import MerchantsFilters from "../MerchantsFilters";
import GoPointsMerchantsPage from "../GoPointsMerchantsPage";
import PremiumMerchantsPage from "../PremiumMerchantsPage";
import ChildCategories from "../ChildCategories";

const Stack = createStackNavigator();

const MerchantsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTruncatedBackTitle: "back",
        headerShown: false,
      }}
    >
      <Stack.Screen name="merchants-list" component={MerchantsPage} />
      <Stack.Screen name="newMerchants-list" component={NewMerchantsPage} />
      <Stack.Screen
        name="GoPointsMerchants-list"
        component={GoPointsMerchantsPage}
      />
      <Stack.Screen
        name="premiumMerchants-list"
        component={PremiumMerchantsPage}
      />

      <Stack.Screen name="merchants-filters" component={MerchantsFilters} />
      <Stack.Screen name="categories-child" component={ChildCategories} />
    </Stack.Navigator>
  );
};

export default MerchantsNavigator;
