import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { TypographyText } from "../Typography";
import PremiumSvg from "../../assets/premium.svg";
import { SCREEN_HEIGHT, mainStyles } from "../../styles/mainStyles";
import { colors } from "../colors";
import { LUSAIL_REGULAR } from "../../redux/types";
import { sized } from "../../Svg";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../../utils";
import {
  getLocalClients,
  getGoPointsMerchants,
  getMerchantDisscountForOffers,
} from "../../api/merchants";
import CardWithNesetedItems from "../CardWithNestedItems";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourites } from "../../redux/merchant/merchant-thunks";

const IMAGE_SIZE = 120;
const PremiumIcon = sized(PremiumSvg, 24, 24, "white");

const GoPointsMerchants = (props) => {
  const { title, onPress, isDark, style } = props;
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { favouriteMerchants } = useSelector(
    (state) => state.favouriteMerchantsReducer
  );

  const language = i18n.language;
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGoPointsMerchants()
      .then(async (i) => {
        const updatedClients = await Promise.all(
          i.map(async (client) => {
            const discountData = await getMerchantDisscountForOffers(
              client.merchant_id
            );
            return { ...client, ...discountData };
          })
        );
        setData(updatedClients);
      })
      .catch((error) => {
        console.error("Error fetching or updating client data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderLocalClient = useCallback(
    ({ item }) => {
      const isSaved = favouriteMerchants.some(
        (o) => o.merchant_id === item.merchant_id
      );

      return (
        <CardWithNesetedItems
          onPress={() => onPress(item.merchant_id)}
          parentProps={{
            onPress: () => onPress(item.merchant_id),
            uri: item.merchant_logo,
            name: language === "ar" ? item?.x_arabic_name : item.merchant_name,
            description:
              language === "ar" ? item.x_ribbon_text_arabic : item.ribbon_text,
            goPoints: true,
            onPressFavourite: () =>
              dispatch(toggleFavourites(item.merchant_id)),
            isSaved,
          }}
        ></CardWithNesetedItems>
      );
    },
    [title, isDark, i18n.language, favouriteMerchants?.length]
  );

  return (
    <View style={style}>
      {!!title && (
        <View
          style={[
            mainStyles.row,
            styles.titleWrapper,
            { alignSelf: isRTL() ? "flex-end" : "flex-start" },
          ]}
        >
          <PremiumIcon color="white" />
          <TypographyText
            textColor={isDark ? colors.white : "#000"}
            size={20}
            font={LUSAIL_REGULAR}
            title={title}
            style={{ marginHorizontal: 12 }}
          />
        </View>
      )}

      <FlatList
        data={data}
        windowSize={SCREEN_HEIGHT * 2}
        showsVerticalScrollIndicator={false}
        renderItem={renderLocalClient}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={
          <View style={styles.listEmptyLoader}>
            <ActivityIndicator
              size={"large"}
              color={isDark ? colors.mainDarkMode : colors.darkBlue}
            />
          </View>
        }
        ListFooterComponent={
          loading &&
          data?.length && (
            <View style={styles.loader}>
              <ActivityIndicator
                size={"large"}
                color={isDark ? colors.mainDarkMode : colors.darkBlue}
              />
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    marginBottom: 16,
  },
  item: {
    width: "100%",
    marginBottom: 11,
    position: "relative",
    flexDirection: "row",
  },
  logoWrapper: {
    ...mainStyles.generalShadow,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  logo: {
    width: IMAGE_SIZE - 20,
    aspectRatio: 1,
  },
  newIcon: {
    position: "absolute",
    top: 10,
    right: 0,
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
  name: {
    paddingRight: 16,
    fontWeight: "700",
  },
  contentContainerStyle: {
    paddingLeft: 5,
    flexGrow: 1,
  },
  listEmptyLoader: {
    paddingVertical: 50,
    alignSelf: "center",
    width: "100%",
  },
  loader: {
    paddingVertical: 50,
  },
});

export default GoPointsMerchants;
