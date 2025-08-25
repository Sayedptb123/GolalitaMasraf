import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import { colors } from '../../components/colors';
import CommonHeader from '../../components/CommonHeader/CommonHeader';
import { mainStyles } from '../../styles/mainStyles';
import { useTheme } from '../../components/ThemeProvider';
import { connect } from 'react-redux';
import {
  getOffers,
  saveOffer,
  getFavoriteOffers,
} from '../../redux/merchant/merchant-thunks';
import { useTranslation } from 'react-i18next';
import { B1G1, PROMOCODE } from '../../redux/types';
import ListNoData from '../../components/ListNoData';
import CardWithNesetedItems from '../../components/CardWithNestedItems';
import TwoButtons from '../../components/TwoButtons/TwoButtons';
import PagerView from 'react-native-pager-view';
import { handleOfferCardPress } from './helpres';

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
  const [selectedFilter, setSelectedFilter] = useState(null);
  const canGetMoreDataRef = useRef(true);
  const pagerViewRef = useRef(null);
  const [selectedPage, setSelectedPage] = useState('0');
  const language = i18n.language;

  useEffect(() => {
    getFavoriteOffers(false, null);
  }, []);

  const handlePageSelect = e => {
    setSelectedPage(e.nativeEvent.position.toString());
  };

  const handleFavouritePress = item => {
    saveOffer(item.id, t);
  };

  const renderItem = ({ item, index }) => {
    const isFavorite = favoriteOffers?.some(offer => offer.id === item.id);
    const isArabic = language === 'ar';

    return (
      <CardWithNesetedItems
        parentProps={{
          onPress: () => handleOfferCardPress(item),
          onPressFavourite: () => handleFavouritePress(item),
          uri: item.merchant_logo,
          name: isArabic ? item.x_arabic_name || item.name : item.name,
          description: isArabic ? item.x_label_arabic : item.offer_label,
          isSaved: isFavorite,
        }}
      ></CardWithNesetedItems>
    );
  };

  const renderFlatlist = ({ item }) => {
    return (
      <FlatList
        data={offers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.4}
        onEndReached={fetchMoreData}
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        initialNumToRender={20}
        ListFooterComponent={() =>
          isOffersLoading ? (
            <View style={[mainStyles.centeredRow, { marginTop: 30 }]}>
              <ActivityIndicator
                size={'large'}
                color={colors.mainDarkModeText}
              />
            </View>
          ) : null
        }
        style={styles.list}
        ListEmptyComponent={
          !isOffersLoading && <ListNoData text={t('AllOffers.noOffersFound')} />
        }
      />
    );
  };

  const keyExtractor = (item, index) => index;

  const HEADER_ITEMS = [
    {
      name: t('AllOffers.allOffers'),
      key: '0',
    },
    {
      name: t('AllOffers.b1g1Free'),
      key: '1',
    },
    {
      name: t('AllOffers.promocode'),
      key: '2',
    },
  ];
  const fetchMoreData = () => {
    if (isOffersLoading || !canGetMoreDataRef.current) {
      return;
    }

    let params;

    if (selectedFilter) {
      params = { x_offer_type: selectedFilter };
    }

    getOffers({
      merchant_id: null,
      merchant_category_id: null,
      page: 'next',
      params,
      onGetData: (dataLength, limit) => {
        if (dataLength !== limit) {
          canGetMoreDataRef.current = false;
        }
      },
    });
  };

  useEffect(() => {
    let params;

    if (selectedFilter) {
      params = { x_offer_type: selectedFilter };
    }

    canGetMoreDataRef.current = true;

    getOffers({
      merchant_id: null,
      merchant_category_id: null,
      page: 1,
      params,
      onGetData: (dataLength, limit) => {
        if (dataLength !== limit) {
          canGetMoreDataRef.current = false;
        }
      },
    });
  }, [selectedFilter]);

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
          label={t('TabBar.allOffersHeader')}
          style={{ backgroundColor: isDark ? colors.darkBlue : undefined }}
        />
        <TwoButtons
          isLight={!isDark}
          selectedButton={
            selectedPage === '0' ? 0 : selectedPage === '1' ? 1 : 2
          }
          onPress1={() => {
            setSelectedFilter(null);
            pagerViewRef.current.setPage(+HEADER_ITEMS[0].key);
          }}
          onPress2={() => {
            setSelectedFilter(B1G1);
            pagerViewRef.current.setPage(+HEADER_ITEMS[1].key);
          }}
          onPress3={() => {
            setSelectedFilter(PROMOCODE);
            pagerViewRef.current.setPage(+HEADER_ITEMS[2].key);
          }}
          label1={HEADER_ITEMS[0].name}
          label2={HEADER_ITEMS[1].name}
          label3={HEADER_ITEMS[2].name}
        />

        <PagerView
          ref={pagerViewRef}
          style={styles.pagerView}
          initialPage={+selectedPage}
          onPageSelected={handlePageSelect}
        >
          <View key="0" style={styles.listWrapper}>
            {renderFlatlist}
          </View>
          <View key="1" style={styles.listWrapper}>
            {renderFlatlist}
          </View>
          <View key="2" style={styles.listWrapper}>
            {renderFlatlist}
          </View>
        </PagerView>

        <FlatList
          data={offers}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.4}
          onEndReached={fetchMoreData}
          contentContainerStyle={{ flexGrow: 1, padding: 16 }}
          initialNumToRender={20}
          ListFooterComponent={() =>
            isOffersLoading ? (
              <View style={[mainStyles.centeredRow, { marginTop: 30 }]}>
                <ActivityIndicator
                  size={'large'}
                  color={colors.mainDarkModeText}
                />
              </View>
            ) : null
          }
          style={styles.list}
          ListEmptyComponent={
            !isOffersLoading && (
              <ListNoData text={t('AllOffers.noOffersFound')} />
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

const mapStateToProps = state => ({
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
