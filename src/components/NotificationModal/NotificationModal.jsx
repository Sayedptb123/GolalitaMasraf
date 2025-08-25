import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../colors';
import { getMerchantDetails } from '../../redux/merchant/merchant-thunks';
import CloseSvg from '../../assets/close.svg';
import { sized } from '../../Svg';
import { setIsNotificationModal } from '../../redux/notifications/notifications-actions';
import { ActivityIndicator } from 'react-native';
import { getMessageNotifications } from '../../redux/notifications/notifications-thunks';
import NotificationItem from './NotificationItem';
import { BALOO_MEDIUM } from '../../redux/types';
import { TypographyText } from '../Typography';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useRef } from 'react';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import Portal from '../Portal';
import { useTheme } from '../ThemeProvider';
import { isRTL } from '../../../utils';

const CloseIcon = sized(CloseSvg, 14);

const NotificationModal = ({
  messageNotifications,
  setIsNotificationModal,
  getMessageNotifications,
  isVisible,
  isMerchantDetails,
  isMerchantDetailsLoading,
}) => {
  const notifications = messageNotifications.filter(
    d => d.imp_notification === true,
  );
  //console.log("notifications:",notifications)
  const { t } = useTranslation();
  const bottomSheetModalRef = useRef(null);
  const { isDark } = useTheme();

  const isVisibleVar =
    isVisible &&
    notifications?.length > 0 &&
    !isMerchantDetailsLoading &&
    !isMerchantDetails;

  useEffect(() => {
    if (!messageNotifications?.length) {
      getMessageNotifications();
    }
  }, []);

  const handleClosePress = () => {
    bottomSheetModalRef?.current?.close();
    setIsNotificationModal(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isVisibleVar) {
        bottomSheetModalRef.current?.present();
      } else {
        bottomSheetModalRef?.current?.close();
      }
    }, 3000); // Delay of 300ms (adjust as needed)

    return () => clearTimeout(timer); // Cleanup timer on unmount or dependency change
  }, [isVisibleVar]);

  // variables
  const snapPoints = useMemo(() => ['75%']);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <Portal name="notofications-home-screen-modal">
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backgroundStyle={{
              backgroundColor: isDark ? '#2E2E2E' : colors.white,
            }}
          >
            <View style={styles.header}>
              <TypographyText
                title={t('Notifications.newOffers')}
                size={18}
                font={BALOO_MEDIUM}
                style={styles.title}
                textColor={isDark ? colors.white : colors.darkBlue}
              />

              <TouchableOpacity
                onPress={handleClosePress}
                style={styles.notificationModal__close}
              >
                <CloseIcon color={isDark ? colors.white : colors.darkBlue} />
              </TouchableOpacity>
            </View>

            <BottomSheetFlatList
              showsVerticalScrollIndicator={false}
              data={notifications}
              contentContainerStyle={styles.contentContainerStyle}
              renderItem={({ item }) => <NotificationItem item={item} />}
              ListEmptyComponent={() => {
                return <ActivityIndicator />;
              }}
            />
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 16,
    paddingBottom: 16,
  },
  contentContainer: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 30,
  },
  notificationModal__close: {},
});

const mapStateToProps = state => ({
  messageNotifications: state.notificationsReducer.messageNotifications,
  isMerchantDetails: !!state.merchantReducer.merchantDetails,
  isMerchantDetailsLoading: state.merchantReducer.merchantDetailsLoading,
  messageNotificationsLoading:
    state.notificationsReducer.messageNotificationsLoading,
  isVisible: state.notificationsReducer.isNotificationModal,
});

export default connect(mapStateToProps, {
  getMerchantDetails,
  setIsNotificationModal,
  getMessageNotifications,
})(NotificationModal);
