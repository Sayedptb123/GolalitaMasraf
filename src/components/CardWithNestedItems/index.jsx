import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TypographyText } from "../Typography";
import {
  BALOO_BOLD,
  BALOO_REGULAR,
  BALOO_SEMIBOLD,
  LUSAIL_REGULAR,
} from "../../redux/types";
import { colors } from "../colors";
import { useTheme } from "../ThemeProvider";
import ArrowSvg from "../../assets/arrow_right.svg";
import StartIcon from "../../assets/star.svg";
import { sized } from "../../Svg";
import { useTranslation } from "react-i18next";
import FullScreenLoader from "../Loaders/FullScreenLoader";
import { getFlexDirection, isRTL } from "../../../utils";

const IMAGE_SIZE = 66;

const CardWithNesetedItems = (props) => {
  const { parentProps, toggleBtns, children } = props;

  const { i18n, t } = useTranslation();
  const { isDark } = useTheme();
  const [openedIndex, setOpenedIndex] = useState(null);

  const isArabic = i18n.language === "ar";
  const ArrowIconSmall = sized(
    ArrowSvg,
    18,
    18,
    isDark ? colors.mainDarkModeText : colors.darkBlue
  );

  const StartIconSmall = sized(
    StartIcon,
    18,
    18,
    isDark ? colors.mainDarkModeText : colors.darkBlue
  );

  const renderToggleBtn = (item, index) => {
    const isActive = item.type === openedIndex;

    return (
      <TouchableOpacity
        onPress={() => setOpenedIndex(isActive ? null : item.type)}
        style={styles.toggle}
      >
        <View
          style={{ transform: [{ rotate: isActive ? "270deg" : "90deg" }] }}
        >
          <ArrowIconSmall
            color={isDark ? colors.mainDarkMode : colors.darkBlue}
          />
        </View>
        <TypographyText
          textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
          size={12}
          font={BALOO_BOLD}
          title={isActive ? item.hideText : item.showText}
        />
      </TouchableOpacity>
    );
  };
  const isRtl = isRTL();
  const newIconStyles = {
    borderTopLeftRadius: isRtl ? 0 : 4,
    borderBottomLeftRadius: isRtl ? 0 : 4,
    borderTopRightRadius: isRtl ? 4 : 0,
    borderBottomRightRadius: isRtl ? 4 : 0,
  };

  const renderParent = (
    <View>
      <TouchableOpacity
        onPress={() => parentProps.onPress()}
        style={[styles.row, getFlexDirection(), { paddingVertical: 10 }]}
      >
        {parentProps.new && (
          <View style={[styles.newIcon, newIconStyles]}>
            <TypographyText
              textColor={isDark ? colors.white : "#000"}
              size={14}
              font={LUSAIL_REGULAR}
              title={t("MainScreen.new")}
              style={styles.newText}
            />
          </View>
        )}
        {parentProps.goPoints && (
          <View style={[styles.newIcon, newIconStyles]}>
            <TypographyText
              textColor={isDark ? colors.white : "#000"}
              size={14}
              font={LUSAIL_REGULAR}
              title={t("MainScreen.goPoints")}
              style={styles.newText}
            />
          </View>
        )}
        {parentProps.premium && (
          <View style={[styles.newIcon, newIconStyles]}>
            <TypographyText
              textColor={isDark ? colors.white : "#000"}
              size={14}
              font={LUSAIL_REGULAR}
              title={t("MainScreen.exclusive")}
              style={styles.newText}
            />
          </View>
        )}
        <View
          style={[
            styles.image,
            {
              backgroundColor: isDark ? "#fff" : "#F5F5F5",
              overflow: "hidden",
              marginLeft: isRTL() ? 15 : 0,
            },
          ]}
        >
          <Image source={{ uri: parentProps.uri }} style={styles.image} />
        </View>

        <View style={styles.infoWrapper}>
          <TypographyText
            textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
            size={18}
            font={BALOO_SEMIBOLD}
            title={parentProps.name}
            numberOfLines={1}
          />

          {parentProps.loadingDescription && (
            <FullScreenLoader style={{ alignSelf: "flex-start" }} />
          )}

          <View style={styles.discountBlock}>
            {!!parentProps.description && !parentProps.loadingDescription && (
              <TypographyText
                textColor={isDark ? colors.white : colors.darkBlue}
                size={14}
                font={BALOO_REGULAR}
                title={parentProps?.description}
                numberOfLines={1}
                style={{
                  alignSelf: isRTL() ? "flex-end" : "flex-start",
                  flex: 1,
                }}
              />
            )}

            {parentProps.acceptGoLoyaltyPoint && (
              <Image
                source={require("../../assets/loyalty.jpg")}
                style={styles.loyaltyImage}
              />
            )}
          </View>
        </View>

        <TouchableOpacity
          style={{ padding: 13 }}
          onPress={() => parentProps.onPressFavourite()}
        >
          {parentProps.isSaved ? (
            <StartIconSmall
              color={isDark ? colors.mainDarkMode : colors.darkBlue}
              fill={isDark ? colors.mainDarkMode : colors.darkBlue}
            />
          ) : (
            <StartIconSmall
              color={isDark ? colors.mainDarkMode : colors.darkBlue}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: isDark ? colors.black : colors.white,
          borderBottomWidth: 2,
          borderColor: isDark ? colors.borderGrey : colors.highlatedGrey,
        },
      ]}
    >
      {renderParent}

      <View
        style={[
          styles.toggleBtn,
          {
            justifyContent: toggleBtns?.length > 1 ? "space-between" : "center",
          },
        ]}
      >
        {toggleBtns?.map(renderToggleBtn)}
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
      >
        {!children?.map && children}

        {children?.map((item, index) => {
          if (openedIndex !== item?.props?.type) {
            return null;
          }

          return item;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    // shadowColor: "#000000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 4.59,
    //elevation: 5,
    // borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 16,
    marginBottom: 16,
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 15,
  },
  name: {
    flex: 1,
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  valueText: {
    color: "#E32251",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 4,
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-around",
    height: IMAGE_SIZE,
  },
  childWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#DDDFE4",
    padding: 8,
    marginTop: 16,
  },
  childInfoWrapper: {
    flex: 1,
    justifyContent: "space-around",
    height: IMAGE_SIZE,
    marginLeft: 8,
  },
  infoLink: {
    flexDirection: "row",
    alignItems: "center",
  },
  loader: {
    marginTop: 16,
  },
  noDataText: {
    marginTop: 16,
    alignSelf: "center",
  },
  logo: {
    backgroundColor: "#fff",
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 4,
    padding: 4,
  },
  toggleBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  discountBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loyaltyImage: {
    width: 50,
    height: 25,
  },
  newIcon: {
    position: "absolute",
    top: -10,
    right: -16,
    backgroundColor: "#E32251",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  newText: {
    color: "#fff",
  },
});

export default CardWithNesetedItems;
