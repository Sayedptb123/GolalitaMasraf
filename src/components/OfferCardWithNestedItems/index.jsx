import { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,ImageBackground
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
console.log("parentPropsparentProps:",parentProps)
  const { i18n, t } = useTranslation();
  const { isDark } = useTheme();
  const [openedIndex, setOpenedIndex] = useState(null);

  const ArrowIconSmall = sized(
    ArrowSvg,
    22,
    22,
    isDark ? colors.mainDarkModeText : colors.darkBlue
  );

  const StartIconSmall = sized(
    StartIcon,
    22,
    22,
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

  const renderParent = (
    <View>
      <View
        style={[
          styles.image,
          {
            backgroundColor: isDark ? "#fff" : "#F5F5F5",
            overflow: "hidden",
            // marginLeft: isRTL() ? 15 : 0,
          },
        ]}
      >
        <ImageBackground source={{ uri: parentProps.uri }} style={styles.image}>
          {/* <Image
            style={{width:'45%',height:30}}
            source={ require("../../assets/discount_flag.png")
            }
          /> */}
        </ImageBackground>
      </View>
      <View style={[styles.row, getFlexDirection()]}>
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

        <View style={[styles.infoWrapper,
          {  flexDirection: isRTL() ? "row-reverse" : "row" }]}>
          <View style={{ flex: 1,alignItems: isRTL() ? 'flex-end':'flex-start' }}>
          <View style={{width:'70%'}}>
            <TypographyText
              textColor={isDark ? colors.mainDarkMode : colors.black}
              size={18}
              font={BALOO_SEMIBOLD}
              title={parentProps.name}
              style={{}}
              // numberOfLines={1}
            />
            </View>
          </View>
          <View
            style={{ width: 1, height: "100%", backgroundColor: "grey" }}
          ></View>
          <View
            style={{
              flex: 1,
              padding: 8,
               flexDirection: isRTL() ? "row-reverse" : "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.discountBlock}>
              {!!parentProps.description && !parentProps.loadingDescription && (
                <TypographyText
                  textColor={isDark ? colors.white : colors.darkBlue}
                  size={14}
                  font={BALOO_REGULAR}
                  title={parentProps?.description}
                  //numberOfLines={1}
                  style={{
                    alignSelf: isRTL() ? "flex-end" : "flex-start",
                    //  flex: 1,
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
            <TouchableOpacity
              style={{ padding: 13, justifyContent: "center" }}
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
          </View>

          {parentProps.loadingDescription && (
            <FullScreenLoader style={{ alignSelf: "flex-start" }} />
          )}
        </View>
      </View>
    </View>
  );

  return (
    <TouchableOpacity
    onPress={() => parentProps.onPress()}
      style={[
        styles.wrapper,
        {
          backgroundColor: isDark ? colors.categoryGrey : "#F5F5F5",
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
   // padding: 16,
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
    width: "100%",
    height: 150,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    flex:1,
    //backgroundColor:'red',
    resizeMode:"contain"
  },
  infoWrapper: {
    flex: 1,
    marginLeft: 10,
    flexDirection: isRTL() ? "row-reverse" : "row",
    justifyContent:'space-between',
    height: IMAGE_SIZE,
    padding:6
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
    justifyContent:'center',
    alignSelf:'center',
    alignItems: "center",
    flex:1,
   // width:'100%'
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
