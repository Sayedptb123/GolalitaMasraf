import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  getActiveTextColor,
  getGreyColor,
  getUnActiveTextColor,
} from '../../../../colors/app_colors';
import {SizedBox} from '../../../../components/DeliveryComp/sized_box';
import {useTheme} from "../../../../components/ThemeProvider";
import {
  DeliveryIcon as _DeliveryIcon,
  TakeawayIcon as _TakeawayIcon,
  DeliveryIconDark as _DeliveryIconDark,
  TakeawayIcon as _TakeawayIconDark,
  DeliveryIconDarkInactive as _DeliveryIconDarkInactive,
  TakeAwayDarkInactive as _TakeAwayDarkInactive,
  TakeAwayDark as _TakeAwayDark
}  from '../../../../assets/delivery_assets';
const ModeTest = () => 
{
    const isDarkMode = () => useTheme().isDark ;
    return isDarkMode()? true : false
};
function DeliveryTabs({
  isDelivery,
  setIsDelivery,
}) {
  return (
    <View style={[styles.row, styles.tabLayout]}>
      <TouchableOpacity
        style={[styles.row, styles.tap, getAppropriateTabStyle(isDelivery)]}
        onPress={() => setIsDelivery(true)}>
        {DeliveryIcon(isDelivery)} 
        <SizedBox size={8} />
        <Text style={getAppropriateTabTextStyle(isDelivery)}>Delivery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.row, styles.tap, getAppropriateTabStyle(!isDelivery)]}
        onPress={() => setIsDelivery(false)}>
          {TakeawayIcon(!isDelivery)}
        <SizedBox size={8} />
        <Text style={getAppropriateTabTextStyle(!isDelivery)}>Takeaway</Text>
      </TouchableOpacity>
    </View>
  );
}

function getAppropriateTabStyle(isActive) {
  return isActive ? styles.activeTap : styles.unActiveTap;
}

function getAppropriateTabTextStyle(isActive) {
  return isActive ? styles.activeTabTextStyle : styles.unActiveTabTextStyle;
}

function DeliveryIcon(isActive) {
  switch(`${+isActive}${+ModeTest()}`) {
    case "11":
      return <_DeliveryIconDark/>;
    case "01":
      <_DeliveryIconDarkInactive/>
    default:
      return <_DeliveryIconDarkInactive/>;
  }
}

function TakeawayIcon(isActive) {
  switch(`${+isActive}${+ModeTest()}`) {
    case "11":
      return <_TakeAwayDark/>;
    case "01":
      <_TakeAwayDarkInactive/>
    default:
      return <_TakeAwayDarkInactive/>;
  }
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabLayout: {marginTop: 16, paddingHorizontal: 0},
  tap: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 10,
  },
  unActiveTap: {
    borderBottomColor: getGreyColor(),
    borderBottomWidth: 1,
  },
  activeTap: {
    borderBottomColor: '#b49056',
    borderBottomWidth: 2,
  },
  activeTabIcon: {
    width: 40,
    height: 24,
    fill: '#000000',
  },
  activeTabTextStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: getActiveTextColor(),
  },
  unActiveTabTextStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: getUnActiveTextColor(),
  },
});

export default DeliveryTabs;
