import { SafeAreaView, StyleSheet, View, FlatList, Image } from "react-native";
import CommonHeader from "../../../components/CommonHeader/CommonHeader";
import { useTheme } from "../../../components/ThemeProvider";
import { colors } from "../../../components/colors";
import { mainStyles } from "../../../styles/mainStyles";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { TypographyText } from "../../../components/Typography";
import { BALOO_REGULAR, LUSAIL_REGULAR } from "../../../redux/types";
import { useRoute } from "@react-navigation/native";

import { isRTL } from "../../../../utils";
const IMAGE_SIZE = 80;

const ChildCategories = ({ navigation }) => {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();
  const language = i18n.language;
  const {
    params: { childCategories, parentCategoryName },
  } = useRoute();

  const tintColor = isDark ? colors.white : colors.darkBlue;
  const imageBackgroundColor = isDark ? colors.secBlue : "#F5F5F5";
  const wrapperBackgroundColor = isDark ? colors.navyBlue : "#F5F5F5";

  const navigateToMerchant = (category) => {
    navigation.navigate("merchants", {
      screen: "merchants-list",
      params: {
        filters: {
          category_id: category.id,
        },
        parentCategoryId: category?.parent_id?.[0],
        parentCategoryName:
          language === "ar" ? category?.x_name_arabic : category.name,
      },
    });
  };

  const filteredChildCategories = childCategories.filter((item) => {
    if (item.parent_id[0] === 47 && (item.id === 156 || item.id === 160)) {
      return false;
    }

    return true;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.darkBlue : colors.white,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <CommonHeader
          isWhite={isDark}
          label={parentCategoryName}
          style={{ backgroundColor: isDark ? colors.darkBlue : undefined }}
          // onBackPress={handleBackPress}
        />

        <FlatList
          data={filteredChildCategories}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            marginTop: 16,
            paddingBottom: 60,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigateToMerchant(item)}
              style={[
                styles.listItem,
                {
                  flexDirection: isRTL() ? "row-reverse" : "row",
                  backgroundColor: wrapperBackgroundColor,
                },
              ]}
            >
              <View
                style={[
                  styles.imageWrapper,
                  { backgroundColor: isDark ? colors.black : colors.white },
                ]}
              >
                <Image
                  style={[
                    styles.image,
                    {
                      tintColor,
                      backgroundColor: imageBackgroundColor,
                    },
                  ]}
                  source={{
                    uri: item.image3,
                  }}
                />
              </View>
              <TypographyText
                textColor={isDark ? colors.white : colors.darkBlue}
                size={16}
                font={BALOO_REGULAR}
                title={language === "ar" ? item.x_name_arabic : item.name}
                style={styles.categoryName}
                numberOfLines={1}
              />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 45,
    height: 45,
  },
  categoryName: {
    marginTop: 4,
    flex: 1,
    width: IMAGE_SIZE,
    fontWeight: "700",
    marginHorizontal: 30,
  },
  list: {
    marginTop: 16,
    paddingBottom: 40,
  },
  imageWrapper: {
    ...mainStyles.generalShadow,
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
  },
  noData: {
    height: IMAGE_SIZE + 26,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainerStyle: {
    paddingLeft: 5,
  },
});

export default ChildCategories;
