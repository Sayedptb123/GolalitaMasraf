import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { colors } from "../../../../components/colors";
import { LUSAIL_REGULAR } from "../../../../redux/types";
import { useTheme } from "../../../../components/ThemeProvider";
import { TypographyText } from "../../../../components/Typography";
import { getTabsConfig, TABS } from "./config";
import { useEffect, useMemo, useRef, useState } from "react";
import useUserLocation from "../../../../hooks/useUserLocation";
import { useTranslation } from "react-i18next";

const MerchantTabs = ({ onTabChange }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(TABS.ALPHABETICAL);
  const isFirstRender = useRef(true);
  const { requestLocation } = useUserLocation();
  const { i18n } = useTranslation();
  const language = i18n.language;

  const hadleTabChange = async (id) => {
    setActiveTab(id);
  };

  const getUserLocation = async () => {
    try {
      const data = await requestLocation();

      console.log("getUserLocationgetUserLocation data:",data)
      if (data?.location) {
        const location = {
          latitude: data.location.latitude,
          longitude: data.location.longitude,
        };

        onTabChange(activeTab, location);
      } else {
        onTabChange(activeTab);
      }
    } catch (err) {
      onTabChange(activeTab);
      console.log(err, "err");
    }
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      if (activeTab === TABS.NEARBY) {
        getUserLocation();
      } else {
        onTabChange(activeTab);
      }
    }

    isFirstRender.current = false;
  }, [activeTab]);

  const mainColor = isDark ? colors.mainDarkMode : colors.darkBlue;

  const headerItems = useMemo(() => getTabsConfig(), [language]);

  return (
    <View
      style={[
        styles.wrapper,
        {
          borderColor: mainColor,
        },
      ]}
    >
      {headerItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <TouchableOpacity
            onPress={() => hadleTabChange(item.id)}
            key={item.id}
            style={[styles.item, isActive && { backgroundColor: mainColor }]}
          >
            <TypographyText
              title={item.name}
              textColor={isDark ? colors.white : colors.darkBlue}
              size={16}
              font={LUSAIL_REGULAR}
              style={[{ fontWeight: "700" }, isActive && styles.activeItemText]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 20,
  },
  item: {
    padding: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeItem: {
    backgroundColor: colors.darkBlue,
  },
  activeItemText: {
    color: colors.white,
  },
});

export default MerchantTabs;
