import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../colors";
import { TypographyText } from "../Typography";
import { LUSAIL_REGULAR } from "../../redux/types";
import { mainStyles } from "../../styles/mainStyles";
import { sized } from "../../Svg";
import BackSvg from "../../assets/back.svg";
import { useTheme } from "../ThemeProvider";
import { useTranslation } from "react-i18next";
import FastImage from "react-native-fast-image";
import { getFlexDirection } from "../../../utils";

const IMAGE_SIZE = 123;

const Categories = ({
  data,
  isShowLoading,
  title,
  onPress,
  onBackPress,
  style,
  selectedCategory,
  selectedChildCategory,
}) => {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const [subCategories, setSubCategories] = useState(null);
  const scrollRef = useRef(null);

  const BackIcon = sized(
    BackSvg,
    12,
    12,
    isDark ? colors.white : colors.darkBlue
  );

  const language = i18n.language;

  useEffect(() => {
    if (selectedCategory) {
      const subCategories = data.find(
        (category) => +category.id === +selectedCategory
      )?.children;

      if (subCategories?.length) {
        setSubCategories(subCategories);
      }
    }
  }, []);

  if (!data)
    return (
      <View style={[mainStyles.centeredRow, { paddingVertical: 50 }, style]}>
        <ActivityIndicator size={"large"} color={colors.green} />
      </View>
    );

  const handlePress = (category) => {
    const subCategories = data.find(
      (item) => +item.id === +category.id
    )?.children;

    if (subCategories?.length) {
      setSubCategories(subCategories);

      scrollRef.current?.scrollTo({
        x: 0,
        animated: false,
      });
    }

    const { parent_id: parentIdData = null, id } = category;
    const parentCategoryId = parentIdData?.[0];

    onPress(id, parentCategoryId);
  };

  const handleBackPress = () => {
    setSubCategories(null);
    // onPress(null);
    onBackPress?.(null);

    scrollRef.current?.scrollTo({
      x: 0,
      animated: false,
    });
  };

  const categories = subCategories || data;

  return (
    <View style={style}>
      {!!title && (
        <View
          style={[
            mainStyles.row,
            getFlexDirection(),
            { justifyContent: "space-between" },
          ]}
        >
          <TypographyText
            textColor={isDark ? colors.white : colors.darkBlue}
            size={20}
            font={LUSAIL_REGULAR}
            style={{ fontWeight: "700" }}
            title={title}
          />

          {Array.isArray(subCategories) && (
            <TouchableOpacity
              onPress={handleBackPress}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <BackIcon />

              <TypographyText
                textColor={isDark ? colors.white : colors.darkBlue}
                size={14}
                font={LUSAIL_REGULAR}
                style={{ fontWeight: "700" }}
                title={t("General.back")}
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      <ScrollView
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.list}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {categories?.map((category, index) => {
          return (
            <TouchableOpacity
              onPress={() => handlePress(category)}
              key={`category${index}`}
              style={styles.categoryItem}
            >
              <View style={styles.imageWrapper}>
                <FastImage
                  style={[
                    styles.image,
                    subCategories
                      ? {
                          width: IMAGE_SIZE,
                          height: IMAGE_SIZE,
                        }
                      : {},
                  ]}
                  source={{
                    uri: subCategories
                      ? category.image_icon
                      : category.x_image_url_3 || undefined,
                  }}
                />
              </View>
              <TypographyText
                textColor={isDark ? colors.white : "#000"}
                size={14}
                font={LUSAIL_REGULAR}
                title={
                  language === "ar" ? category.x_name_arabic : category.name
                }
                style={styles.categoryName}
                numberOfLines={1}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryName: {
    marginTop: 4,
    flex: 1,
    width: IMAGE_SIZE,
    fontWeight: "700",
  },
  categoryItem: {
    marginRight: 16,
  },
  list: {
    marginTop: 16,
  },
  imageWrapper: {
    ...mainStyles.generalShadow,
    backgroundColor: "#fff",
    borderRadius: 8,
    height: IMAGE_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
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

export default Categories;
