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
import { sized } from "../../Svg";
import { useTranslation } from "react-i18next";
import FullScreenLoader from "../Loaders/FullScreenLoader";

const ArrowIcon = sized(ArrowSvg, 22, 22, "#DDDFE4");

const IMAGE_SIZE = 66;

const CardWithNesetedItems = (props) => {
  const { parentProps, toggleBtns, children } = props;
  const { isDark } = useTheme();
  const [openedIndex, setOpenedIndex] = useState(null);

  const ArrowIconSmall = sized(
    ArrowSvg,
    18,
    18,
    isDark ? colors.mainDarkModeText : colors.darkBlue
  );

  const { t, i18n } = useTranslation();
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
          <ArrowIconSmall />
        </View>
        <TypographyText
          textColor={isDark ? colors.mainDarkModeText : colors.darkBlue}
          size={12}
          font={BALOO_BOLD}
          title={isActive ? item.hideText : item.showText}
        />
      </TouchableOpacity>
    );
  };

  const renderParent = (
    <View>
      <TouchableOpacity
        onPress={() => parentProps.onPress()}
        style={styles.row}
      >
        {parentProps.new && (
          <View style={styles.newIcon}>
            <TypographyText
              textColor={isDark ? colors.white : "#000"}
              size={14}
              font={LUSAIL_REGULAR}
              title={t("MainScreen.new")}
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
            },
          ]}
        >
          <Image source={{ uri: parentProps.uri }} style={[styles.image]} />
        </View>

        <View style={styles.infoWrapper}>
          <TypographyText
            textColor={isDark ? colors.mainDarkModeText : colors.darkBlue}
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
                textColor={"red"}
                size={14}
                font={BALOO_REGULAR}
                title={parentProps.description}
                numberOfLines={1}
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

        <View>
          <ArrowIcon
            color={isDark ? colors.mainDarkModeText : colors.darkBlue}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: isDark ? colors.mainDarkMode : colors.white },
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
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
    borderRadius: 10,
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
