import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { colors } from "../../../components/colors";
import { LUSAIL_REGULAR } from "../../../redux/types";
import { useTheme } from "../../../components/ThemeProvider";
import { TypographyText } from "../../../components/Typography";
import { useTranslation } from "react-i18next";

export const TABS = {
  NEARBY: "nearby",
  ALPHABETICAL: "alphabetical",
};

const MerchantsTabs = ({ activeTab, onTabChange }) => {
  const { isDark } = useTheme();
  const { t } = useTranslation();

  const HEADER_ITEMS = [
    {
      name: t("Merchants.nearby"),
      id: TABS.NEARBY,
    },
    {
      name: t("Merchants.alphabetical"),
      id: TABS.ALPHABETICAL,
    },
  ];

  const handlePageSelect = (id) => {
    onTabChange(id);
  };

  return (
    <View style={styles.wrapper}>
      {HEADER_ITEMS.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <TouchableOpacity
            onPress={() => handlePageSelect(item.id)}
            key={item.id}
            style={[styles.item, isActive && styles.activeItem]}
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
  },
  item: {
    padding: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeItem: {
    backgroundColor: "red",
  },
  activeItemText: {
    color: colors.white,
  },
});

export default MerchantsTabs;
