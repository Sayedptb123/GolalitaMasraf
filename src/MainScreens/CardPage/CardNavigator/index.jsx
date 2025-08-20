import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CardPage from "../CardPage";
import Passcard from "../Passcard";

const Stack = createStackNavigator();

const CardNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTruncatedBackTitle: "back",
        headerShown: false,
      }}
    >
      <Stack.Screen name="card-main" component={CardPage} />

      <Stack.Screen name="card-passcard" component={Passcard} />
    </Stack.Navigator>
  );
};

export default CardNavigator;
