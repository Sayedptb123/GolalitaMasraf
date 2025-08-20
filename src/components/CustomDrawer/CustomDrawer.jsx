import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { colors } from "../colors";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import Header from "../Header";
import UserInfo from "./components/UserInfo";
import DrawerItemList from "./components/DrawerItemsList";
import LogOutBtn from "./components/LogOutBtn";
import { useTheme } from "../ThemeProvider";

const CustomDrawer = ({ styles }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const backgroundColor = isDark ? "#0076a5" : colors.white;

  return (
    <View style={[localStyles.wrapper, { backgroundColor }]}>
      <DrawerContentScrollView
        showsVerticalScrollIndicator={true}
        style={styles.drawer}
      >
        <View style={localStyles.drawerWrapper}>
          <Header label={t("TabBar.menu")} style={{ paddingHorizontal: 0 }} />
          <UserInfo />

          <DrawerItemList />
          <LogOutBtn />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  wrapper: { flex: 1, paddingLeft: 16, paddingTop: 20 },
  drawerWrapper: { flex: 1, justifyContent: "space-between" },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  logoWrapper: {
    height: 60,
    marginBottom: 30,
    borderRadius: 30,
  },
  logoImage: { width: 60, height: 60, resizeMode: "contain" },
  drawerItemWrapper: { marginLeft: -15, marginTop: 10 },
  passiveLang: {
    borderWidth: 1,
    borderColor: colors.white,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  itemText: {
    justifyContent: "center",
  },
  itemWrapper: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "red",
    paddingVertical: 20,
  },
});

export default CustomDrawer;
