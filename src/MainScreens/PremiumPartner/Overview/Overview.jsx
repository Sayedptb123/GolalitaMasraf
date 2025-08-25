import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import { mainStyles, SCREEN_WIDTH } from '../../../styles/mainStyles';
import { sized } from '../../../Svg';
import { colors } from '../../../components/colors';
import FullScreenLoader from '../../../components/Loaders/FullScreenLoader';
import { BALOO_REGULAR, BALOO_SEMIBOLD } from '../../../redux/types';
import { TypographyText } from '../../../components/Typography';
import styles from './styles';
import Swiper from 'react-native-swiper';
import NotificationSvg from '../../../assets/notification_yellow.svg';
import NotificationDisabledSvg from '../../../assets/notification.svg';
import { useTheme } from '../../../components/ThemeProvider';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ShareSvg from '../../../assets/share.svg';
import DiscountLabel from '../../../assets/discountLabel.svg';
import { subscribeNotification } from '../../../redux/notifications/notifications-thunks';
import ImageViewer from 'react-native-image-zoom-viewer';
import CloseSvg from '../../../assets/close_white.svg';
import CommonButton from '../common/CommonButton';
import { Tabs } from 'react-native-collapsible-tab-view';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import { saveOffer } from '../../../redux/merchant/merchant-thunks';
import InfoTabs from './components/InfoTabs';
import Header from '../../../components/Header';
import { isRTL } from '../../../../utils';
import { getContracts } from '../../../api/merchants';

const NotificationIcon = sized(NotificationSvg, 17, 20, '#fff');
const NotificationDisabledIcon = sized(NotificationDisabledSvg, 17, 17, '#fff');
const ShareIcon = sized(ShareSvg, 20, 20, '#fff');
const CloseIcon = sized(CloseSvg, 24);

const Overview = ({
  route,
  merchantDetails,
  subscribeNotification,
  title,
  loading,
}) => {
  const { i18n, t } = useTranslation();
  const params = route?.params;
  const { isDark } = useTheme();
  const [isFullImage, setIsFullImage] = useState(false);
  const isArabic = i18n.language === 'ar';

  const DiscountLabelF = sized(
    DiscountLabel,
    12,
    12,
    isDark ? colors.black : colors.darkBlue,
  );
  const viewRef = useRef();

  useEffect(() => {
    getContracts();
  }, []);

  const ribbonText =
    i18n.language === 'ar'
      ? merchantDetails?.ribbon_text?.x_ribbon_text_arabic
      : merchantDetails?.ribbon_text?.ribbon_text;

  const onShare = async () => {
    try {
      const url = await viewRef.current.capture({
        result: 'tmpfile',
        height: 400,
        width: 335,
        quality: 1,
        format: 'png',
      });

      await Share.open({ url });
    } catch (error) {
      console.log(error);
    }
  };

  const renderHeader = useCallback(() => {
    const banner = merchantDetails.banners?.length ? (
      merchantDetails.banners?.map((banner, index) => (
        <TouchableOpacity
          onPress={() => {
            setIsFullImage(true);
          }}
          key={index}
        >
          <Image
            style={mainStyles.swiper__img}
            source={{ uri: banner.banner_image }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      ))
    ) : (
      <TouchableOpacity
        onPress={() => {
          setIsFullImage(true);
        }}
      >
        <Image
          style={mainStyles.swiper__img}
          source={{ uri: merchantDetails.map_banner }}
        />
      </TouchableOpacity>
    );

    const imageViwerImages = merchantDetails?.banners?.length
      ? merchantDetails?.banners.map(banner => ({
          url: banner.banner_image,
          width: SCREEN_WIDTH,
          height: 232,
        }))
      : [
          {
            url: merchantDetails.map_banner,
            width: SCREEN_WIDTH,
            height: 232,
          },
        ];

    return (
      <View
        style={{
          paddingBottom: 44,
          backgroundColor: isDark ? colors.navyBlue : '#fff',
        }}
      >
        <View>
          <Header
            label={
              title
                ? title
                : params?.isOrganization
                  ? t('PremiumPartner.organization')
                  : merchantDetails?.category
            }
            style={{ paddingHorizontal: 20, paddingBottom: 20 }}
          />

          <View
            style={{
              marginTop: 14,
              paddingHorizontal: 20,
            }}
          >
            {(merchantDetails.banners || merchantDetails.map_banner) && (
              <Swiper
                autoplay
                style={mainStyles.swiper}
                dot={<View style={mainStyles.dot} />}
                activeDot={
                  <View
                    style={[
                      [
                        mainStyles.dot,
                        {
                          backgroundColor: isDark
                            ? colors.green
                            : colors.darkBlue,
                        },
                      ],
                    ]}
                  />
                }
                removeClippedSubviews={false}
              >
                {banner}
              </Swiper>
            )}
          </View>
        </View>
        <View style={styles.titleWrapper}>
          <View
            style={{
              flexDirection: isRTL() ? 'row-reverse' : 'row',
              alignItems: 'center',
              flex: 1,
              marginTop: 20,
            }}
          >
            <View>
              <Image
                source={{
                  uri:
                    merchantDetails.merchant_logo ?? merchantDetails.org_logo,
                }}
                style={styles.logo}
              />
            </View>
            <TypographyText
              textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
              size={18}
              font={BALOO_SEMIBOLD}
              title={
                isArabic
                  ? merchantDetails?.x_arabic_name
                    ? merchantDetails.x_arabic_name
                    : merchantDetails.merchant_name
                  : merchantDetails.merchant_name
              }
              style={{
                marginHorizontal: 8,
                flex: 1,
              }}
              numberOfLines={1}
            />
            {!!ribbonText && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isDark ? colors.mainDarkMode : null,
                  padding: 5,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: isDark ? null : colors.darkBlue,
                }}
              >
                <DiscountLabelF />
                <TypographyText
                  textColor={isDark ? colors.mainDarkModeText : colors.darkBlue}
                  size={14}
                  font={BALOO_SEMIBOLD}
                  title={ribbonText}
                  style={{
                    // width: "75%",
                    marginLeft: 6,
                    textAlign: 'center',
                  }}
                  numberOfLines={1}
                  textElipsis={'tail'}
                />
              </View>
            )}
          </View>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'flex-end',
              width: 95,
              marginRight: 20,
            }}
          >
            <TouchableOpacity
              onPress={onShare}
              style={[
                styles.shareIcon,
                {
                  borderWidth: 1.5,
                  borderColor: isDark ? colors.mainDarkMode : colors.darkBlue,
                  backgroundColor: null,
                },
              ]}
            >
              <ShareIcon
                color={isDark ? colors.mainDarkMode : colors.darkBlue}
              />
            </TouchableOpacity>
            {!merchantDetails.isOrganization && (
              <TouchableOpacity
                onPress={() =>
                  subscribeNotification(
                    !merchantDetails.is_subscribe,
                    merchantDetails.merchant_id ??
                      merchantDetails.partner_id?.[0] ??
                      merchantDetails.id,
                    t,
                  )
                }
                style={[
                  styles.notificationIcon,
                  {
                    borderWidth: 1.5,
                    borderColor: isDark ? colors.mainDarkMode : colors.darkBlue,
                    backgroundColor: null,
                  },
                ]}
              >
                {merchantDetails.is_subscribe ? (
                  <NotificationIcon
                    color={isDark ? colors.mainDarkMode : colors.darkBlue}
                  />
                ) : (
                  <NotificationDisabledIcon
                    color={isDark ? colors.mainDarkMode : colors.darkBlue}
                  />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        {merchantDetails.x_online_store && (
          <CommonButton
            text={`${t('ProductPage.openOnlineStore')} ${
              merchantDetails.merchant_name.length > 15
                ? `${merchantDetails.merchant_name.slice(0, 15)}...`
                : merchantDetails.merchant_name
            } ${t('TabBar.onlineStore')}`}
            onPress={() => Linking.openURL(merchantDetails.website)}
            wrapperStyle={{
              backgroundColor: '#00A3FF',
              marginHorizontal: 20,
              borderWidth: 0,
              marginTop: 25,
            }}
            textStyle={{ color: '#fff' }}
          />
        )}

        <Modal visible={isFullImage} transparent={true}>
          <ImageViewer
            supportedOrientations={[
              'portrait',
              'portrait-upside-down',
              'landscape',
              'landscape-left',
              'landscape-right',
            ]}
            pageAnimateTime={100}
            saveToLocalByLongPress={false}
            index={0}
            renderImage={({ source, style }) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                  }}
                >
                  <Image
                    source={{
                      uri: merchantDetails.banners
                        ? source.uri
                        : merchantDetails.map_banner,
                    }}
                    style={[
                      {
                        height: '100%',
                        resizeMode: 'contain',
                      },
                      style,
                    ]} // your custom style object
                    // any supported props by Image
                  />
                </View>
              );
            }}
            renderHeader={props => {
              return (
                <View
                  style={[
                    mainStyles.row,
                    {
                      justifyContent: 'space-between',
                      top: 50,
                      left: 20,
                      position: 'absolute',
                      zIndex: 100,
                      width: '90%',
                    },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => setIsFullImage(false)}
                    style={mainStyles.modal__close}
                  >
                    <CloseIcon />
                  </TouchableOpacity>
                </View>
              );
            }}
            onSwipeDown={() => setIsFullImage(false)}
            enableSwipeDown={true}
            imageUrls={imageViwerImages}
            loadingRender={() => (
              <ActivityIndicator size={'large'} color={colors.green} />
            )}
            renderIndicator={(currentIndex, allSize) => (
              <View style={styles.imagesIndicator}>
                <TypographyText
                  textColor={colors.white}
                  size={16}
                  font={BALOO_REGULAR}
                  title={`${currentIndex}/${allSize}`}
                />
              </View>
            )}
          />
        </Modal>
      </View>
    );
  }, [merchantDetails?.id, isFullImage]);

  if (loading) return <FullScreenLoader />;

  return (
    <ViewShot ref={viewRef} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Tabs.Container
          minHeaderHeight={1}
          headerContainerStyle={{ minHeight: 10 }}
          renderTabBar={() => null}
          renderHeader={renderHeader}
        >
          <Tabs.Tab name="a">
            <Tabs.ScrollView
              contentContainerStyle={{
                paddingBottom: 30,
                paddingHorizontal: 20,
              }}
              showsHorizontalScrollIndicator={false}
              bounces={false}
            >
              <InfoTabs merchantDetails={merchantDetails} />
            </Tabs.ScrollView>
          </Tabs.Tab>
        </Tabs.Container>
      </View>
    </ViewShot>
  );
};

const mapStateToProps = state => ({
  merchantDetails: state.merchantReducer.merchantDetails,
  favoriteOffers: state.merchantReducer.favoriteOffers,
  loading: state.merchantReducer.merchantDetailsLoading,
});

export default connect(mapStateToProps, { subscribeNotification, saveOffer })(
  React.memo(Overview),
);
