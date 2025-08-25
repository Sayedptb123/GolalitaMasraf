import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChildCategories from "../MerchantsPage/ChildCategories";

const Stack = createStackNavigator();

const CategoriesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTruncatedBackTitle: "back",
        headerShown: false,
      }}
    >
      <Stack.Screen name="categories-child" component={ChildCategories} />
    </Stack.Navigator>
  );
};

export default CategoriesNavigator;
