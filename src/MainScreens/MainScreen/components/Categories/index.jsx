import { StyleSheet, View, Image, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../../components/ThemeProvider";
import { TypographyText } from "../../../../components/Typography";
import { BALOO_REGULAR, LUSAIL_REGULAR } from "../../../../redux/types";
import { colors } from "../../../../components/colors";
import { useNavigation } from "@react-navigation/native";
import FullScreenLoader from "../../../../components/Loaders/FullScreenLoader";
import CategoriesFilter from "./CategoriesFilter";
import { getParentCategories } from "../../../../redux/merchant/merchant-thunks";
import ListNoData from "../../../../components/ListNoData";
import { setCategoriesType } from "../../../../redux/merchant/merchant-actions";
import useUpdateEffect from "../../../../hooks/useUpdateEffect";

const IMAGE_SIZE = 72;

const Categories = () => {
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { categoriesType } = useSelector((state) => state.merchantReducer);

  const parentCategories = useSelector(
    (state) => state.merchantReducer.parentCategories
  );
  const loading = useSelector(
    (state) => state.merchantReducer.parentCategoriesLoading
  );

  const language = i18n.language;
  const imageTintColor = isDark ? colors.mainDarkMode : colors.white;
  const imageBackgroundColor = isDark ? colors.navyBlue : colors.darkBlue;
  const textColor = isDark ? colors.white : "#000";

  useUpdateEffect(() => {
    if (categoriesType) {
      dispatch(getParentCategories(categoriesType));
    }
  }, [categoriesType]);

  const navigateToMerchant = (category) => {
    if (!category.children?.length) {
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

  const handleTypeChange = (type) => {
    dispatch(setCategoriesType(type));
  };

  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: isDark ? colors.darkBlue : colors.white,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TypographyText
          title={t("Categories.title")}
          textColor={isDark ? colors.mainDarkMode : "#000"}
          size={26}
          font={LUSAIL_REGULAR}
        />

        <CategoriesFilter onChange={handleTypeChange} type={categoriesType} />
      </View>

      <FlatList
        style={styles.list}
        data={!loading ? parentCategories : []}
        numColumns={3}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={
          !loading ? (
            <ListNoData title={t("General.noData")} />
          ) : (
            <FullScreenLoader />
          )
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigateToMerchant(item)}
            style={styles.listItem}
          >
            <View style={[styles.imageWrapper]}>
              <Image
                style={[
                  styles.categoryImage,
                  {
                    backgroundColor: imageBackgroundColor,
                    tintColor: imageTintColor,
                  },
                ]}
                source={{
                  uri: item.image3,
                }}
              />
            </View>
            <TypographyText
              textColor={textColor}
              size={16}
              font={BALOO_REGULAR}
              title={language === "ar" ? item.x_name_arabic : item.name}
              style={styles.categoryName}
              numberOfLines={2}
              textBreakStrategy="simple"
              lineBreakStrategyIOS="none"
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
    marginTop: 25,
  },
  list: {
    marginTop: 20,
  },
  listItem: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 32,
  },
  categoryName: {
    marginTop: 4,
    flex: 1,
    width: "100%",
    fontWeight: "700",
    textAlign: "center",
    width: 95,
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
  contentContainerStyle: { flexGrow: 1, paddingBottom: 60 },
});

export default Categories;
