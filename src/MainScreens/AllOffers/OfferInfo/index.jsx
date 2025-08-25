import Header from '../../../components/Header';
import MainLayout from '../../../components/MainLayout';
import InfoBlocks from './components/InfoBlocks';
import InfoButtons from './components/InfoButtons/index';
import OfferInfoSwiper from './components/OfferInfoSwiper';
import CommonButton from '../../../components/CommonButton/CommonButton';
import OfferTypeInfoButtons from './components/OfferTypeInfoButtons';

import { colors } from '../../../components/colors';
import {
  getInfoBlocksConfig,
  getInfoBtnsConfig,
  getOfferTypeInfoBtnsConfig,
} from './config';
import { SCREEN_HEIGHT } from '../../../styles/mainStyles';
import useOffer from './hooks/useOffer';
import FullScreenImageModal from './components/FullScreenImageModal';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MerchantInfoBlock from './components/MerchatInfoBlock';
import { isRTL } from '../../../../utils';
import FullScreenLoader from '../../../components/Loaders/FullScreenLoader';
import { useTheme } from '../../../components/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { handleMerchantCardPress } from '../../MerchantsPage/helpers';
import { transformDate } from './helpers';
import { navigateToBookNow } from '../helpres';
import ListNoData from '../../../components/ListNoData';

const OfferInfo = ({ route }) => {
  const { productId, title, bookNow = 'fasle', merchant = {} } = route.params;
  const { offer, loading, error } = useOffer(productId);
  const { isDark } = useTheme();
  const { t, i18n } = useTranslation();

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const infoBtnsConfig = getInfoBtnsConfig(offer, isDark);
  const infoBlocksConfig = getInfoBlocksConfig(offer, bookNow);
  const offerTypeInfoBtnsConfig = getOfferTypeInfoBtnsConfig(offer);
  const isArabic = isRTL();

  const closeModal = () => {
    setSelectedImageUrl(null);
  };

  const handleImagePress = url => {
    setSelectedImageUrl(url);
  };
  const handleMerchatDetails = offer => {
    handleMerchantCardPress(offer);
  };

  return (
    <>
      <MainLayout
        outsideScroll={true}
        headerChildren={<Header label={title} btns={['back']} />}
        headerHeight={50}
        contentStyle={{ height: SCREEN_HEIGHT - 120, paddingHorizontal: 20 }}
      >
        {!loading && !error && (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
          >
            <OfferInfoSwiper
              images={[offer.image_url]}
              onImagePress={handleImagePress}
            />
            <MerchantInfoBlock
              merchantName={
                isArabic ? offer.merchant_name_arabic : offer.merchant_name
              }
              merchantUrl={offer.merchant_logo}
              offerLabel={isArabic ? offer.label_arabic : offer.offer_label}
              start_date={transformDate(offer?.start_date)}
              end_date={transformDate(offer?.end_date)}
            />
            <InfoButtons data={infoBtnsConfig} />
            <OfferTypeInfoButtons data={offerTypeInfoBtnsConfig} />
            <InfoBlocks data={infoBlocksConfig} />

            <FullScreenImageModal
              visible={!!selectedImageUrl}
              url={selectedImageUrl}
              onClose={closeModal}
            />

            <CommonButton
              onPress={() => handleMerchatDetails(offer)}
              label={t('ProductPage.merchantDetails')}
              textColor={isDark ? colors.mainDarkModeText : colors.white}
              style={styles.merchantBtn}
            />

            {bookNow === 'true' && (
              <CommonButton
                onPress={() => navigateToBookNow(offer, merchant)}
                label={t('Merchants.requestReservation')}
                textColor={isDark ? colors.mainDarkModeText : colors.white}
                style={styles.merchantBtn}
              />
            )}
          </ScrollView>
        )}
        {error && <ListNoData />}
      </MainLayout>
      {loading && <FullScreenLoader absolutePosition style={styles.loader} />}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  loader: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  merchantBtn: {
    marginTop: 20,
  },
});

export default OfferInfo;
