import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Authorization } from "./Authorization";
import { StatusBar } from "react-native";
import { DrawerNavigator } from "./DrawerNavigator";
import { navigationRef } from "./RootNavigation";
import { linking } from "./config";

export const Root = ({ isAuthorized }) => {
  return (
       <NavigationContainer ref={navigationRef} linking={linking}>
      <StatusBar backgroundColor={"#ffffff"} barStyle={"dark-content"} />
      {/*<Authorization/>*/}
      {isAuthorized ? <DrawerNavigator /> : <Authorization />}
    </NavigationContainer>
  );
};
