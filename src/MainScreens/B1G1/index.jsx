import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
} from "react-native";
import { colors } from "../../components/colors";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import { mainStyles } from "../../styles/mainStyles";
import { useTheme } from "../../components/ThemeProvider";
import { connect } from "react-redux";
import {
  saveOffer,
  getFavoriteOffers,
} from "../../redux/merchant/merchant-thunks";
import { useTranslation } from "react-i18next";
import ListNoData from "../../components/ListNoData";
import CardWithNesetedItems from "../../components/OfferCardWithNestedItems";
import { getDescription, handleOfferCardPress } from "../AllOffers/helpres";
import useB1G1Offers from "./hooks";

const B1G1 = ({ saveOffer, favoriteOffers, getFavoriteOffers }) => {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const language = i18n.language;
  const { data, isLoading } = useB1G1Offers();

  useEffect(() => {
    getFavoriteOffers(false, null);
  }, []);

  const handleFavouritePress = (item) => {
    saveOffer(item.id, t);
  };

  const keyExtractor = (_, index) => index;

  const renderItem = ({ item }) => {
    const isFavorite = favoriteOffers?.some((offer) => offer.id === item.id);
    const isArabic = language === "ar";

    return (
      <CardWithNesetedItems
        parentProps={{
          onPress: () => handleOfferCardPress(item),
          onPressFavourite: () => handleFavouritePress(item),
          uri: item.image_url,
          name: isArabic
            ? item.x_arabic_name || item.name
            : item.name,
          description: getDescription(item),
          isSaved: isFavorite,
        }}
      ></CardWithNesetedItems>
    );
  };

  return (
    <View
      style={{
        backgroundColor: isDark ? colors.darkBlue : colors.white,
        ...styles.wrapper,
      }}
    >
      <SafeAreaView style={styles.safeAreaWrapper}>
        <CommonHeader
          isWhite={isDark}
          label={"B1G1"}
          style={{ backgroundColor: isDark ? colors.darkBlue : undefined }}
        />

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          initialNumToRender={20}
          ListFooterComponent={() =>
            isLoading ? (
              <View style={[mainStyles.centeredRow, { marginTop: 30 }]}>
                <ActivityIndicator
                  size={"large"}
                  color={colors.mainDarkModeText}
                />
              </View>
            ) : null
          }
          style={styles.list}
          ListEmptyComponent={
            !isLoading && <ListNoData text={t("AllOffers.noOffersFound")} />
          }
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  safeAreaWrapper: {
    flex: 1,
  },
  filterBtns: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
  iconBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});

const mapStateToProps = (state) => ({
  favoriteOffers: state.merchantReducer.favoriteOffers,
});

export default connect(mapStateToProps, {
  saveOffer,
  getFavoriteOffers,
})(B1G1);
