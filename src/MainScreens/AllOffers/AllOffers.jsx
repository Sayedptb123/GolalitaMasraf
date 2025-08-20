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
  getOffers,
  saveOffer,
  getFavoriteOffers,
} from "../../redux/merchant/merchant-thunks";
import { useTranslation } from "react-i18next";
import ListNoData from "../../components/ListNoData";
import CardWithNesetedItems from "../../components/OfferCardWithNestedItems";
import { getDescription, handleOfferCardPress } from "./helpres";

const AllOffers = ({
  offers,
  isOffersLoading,
  getOffers,
  saveOffer,
  favoriteOffers,
  getFavoriteOffers,
}) => {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const canGetMoreDataRef = useRef(true);
  const language = i18n.language;

  useEffect(() => {
    getFavoriteOffers(false, null);
  }, []);

  useEffect(() => {
    canGetMoreDataRef.current = true;
    getOffers({
      merchant_id: null,
      merchant_category_id: null,
      page: 1,
      params: {},
      onGetData: (dataLength, limit) => {
        if (dataLength !== limit) {
          canGetMoreDataRef.current = false;
        }
      },
    });
  }, []);

  const handleFavouritePress = (item) => {
    saveOffer(item.id, t);
  };

  const keyExtractor = (item, index) => index;

  const fetchMoreData = () => {
    if (isOffersLoading || !canGetMoreDataRef.current) {
      return;
    }
    getOffers({
      merchant_id: null,
      merchant_category_id: null,
      page: "next",
      params: {},
      onGetData: (dataLength, limit) => {
        if (dataLength !== limit) {
          canGetMoreDataRef.current = false;
        }
      },
    });
  };

  const renderItem = ({ item, index }) => {
    const isFavorite = favoriteOffers?.some((offer) => offer.id === item.id);
    const isArabic = language === "ar";
    return (
      <CardWithNesetedItems
        parentProps={{
          onPress: () => handleOfferCardPress(item,true),
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
          label={t("TabBar.allOffersHeader")}
          style={{ backgroundColor: isDark ? colors.darkBlue : undefined }}
        />
        <FlatList
          data={offers}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.6}
          onEndReached={fetchMoreData}
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          initialNumToRender={20}
          ListFooterComponent={() =>
            isOffersLoading ? (
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
            !isOffersLoading && (
              <ListNoData text={t("AllOffers.noOffersFound")} />
            )
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
  offers: state.merchantReducer.offers,
  isOffersLoading: state.loadersReducer.isOffersLoading,
  categories: state.merchantReducer.categories,
  favoriteOffers: state.merchantReducer.favoriteOffers,
});

export default connect(mapStateToProps, {
  saveOffer,
  getOffers,
  getFavoriteOffers,
})(AllOffers);
