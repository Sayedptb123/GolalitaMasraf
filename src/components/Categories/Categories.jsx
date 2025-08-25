import { StyleSheet, View, FlatList, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "../../components/ThemeProvider";
import { TypographyText } from "../../components/Typography";
import { LUSAIL_REGULAR } from "../../redux/types";
import { colors } from "../../components/colors";
import { useNavigation } from "@react-navigation/native";
import FullScreenLoader from "../../components/Loaders/FullScreenLoader";

const IMAGE_SIZE = 72;

const Categories = () => {
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const parentCategories = useSelector(
    (state) => state.merchantReducer.parentCategories
  );
  const loading = useSelector(
    (state) => state.merchantReducer.parentCategoriesLoading
  );

  const language = i18n.language;

  const navigateToMerchant = (category) => {
    if (!category.children?.length) {
      navigation.navigate("merchants", {
        screen: "merchants-list",
        params: {
          selectedCategoryId: category.id,
          parentCategoryId: category?.parent_id?.[0],
          parentCategoryName:
            language === "ar" ? category?.x_name_arabic : category.name,
        },
      });

      return;
    }

    navigation.navigate("categories", {
      screen: "categories-child",
      params: {
        childCategories: category.children,
        parentCategoryName:
          language === "ar" ? category?.x_name_arabic : category.name,
      },
    });
  };

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: isDark ? colors.darkBlue : colors.white,
      }}
    >
      <TypographyText
        title={t("Categories.title")}
        textColor={isDark ? colors.mainDarkMode : "#000"}
        size={26}
        font={LUSAIL_REGULAR}
      />
      <FlatList
        data={parentCategories}
        numColumns={3}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item }) => (
      //  console.log("itemL",item)
          <TouchableOpacity
            onPress={() => navigateToMerchant(item)}
            style={styles.listItem}
          >
            <View style={[styles.imageWrapper]}>
              <Image
                style={styles.categoryImage}
                source={{
                  uri:
                    (isDark ? item.x_image_url_4 : item.x_image_url_3) ||
                    undefined,
                }}
              />
            </View>
            <TypographyText
              textColor={isDark ? colors.white : "#000"}
              size={16}
              font={LUSAIL_REGULAR}
              title={language === "ar" ? item.x_name_arabic : item.name}
              style={styles.categoryName}
              numberOfLines={2}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    minHeight: 200,
    minWidth: "100%",
    marginTop: 25,
  },
  listItem: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 32,
    //backgroundColor:'red'
  },
  categoryName: {
    marginTop: 4,
    flex: 1,
    width: "100%",
    fontWeight: "700",
    width: 74,
    textAlign: "center",
  },
  categoryItem: {
    marginRight: 16,
    flex: 1,
    margin: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    marginTop: 16,
    paddingBottom: 40,
  },
  imageWrapper: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    // ...mainStyles.generalShadow,
    width: IMAGE_SIZE + 5,
    height: IMAGE_SIZE + 5,
    borderRadius: 32,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 32,
  },
  categoryImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 32,
  },
  contentContainerStyle: { flexGrow: 1 },
});

export default Categories;
