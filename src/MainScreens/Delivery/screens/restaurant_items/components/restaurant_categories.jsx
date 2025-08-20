import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getActiveTextColor,
  getGreyColor,
  getUnActiveTextColor,
} from '../../../../colors/app_colors';
import {SizedBox} from '../../../../components/DeliveryComp/sized_box';
import {
  DeliveryIcon as _DeliveryIcon,
  TakeawayIcon as _TakeawayIcon,
} from '../../../../assets/delivery_assets';

function RestaurantCategories({
  selectedOption,
  selectOption,
  options,
}) {
  return (
    <ScrollView horizontal={true} style={[styles.tabLayout]}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[styles.tap, getAppropriateTabStyle(option == selectedOption)]}
          onPress={() => selectOption(option)}>
          <Text style={getAppropriateTabTextStyle(option == selectedOption)}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function getAppropriateTabStyle(isActive) {
  return isActive ? styles.activeTap : styles.unActiveTap;
}

function getAppropriateTabTextStyle(isActive) {
  return isActive ? styles.activeTabTextStyle : styles.unActiveTabTextStyle;
}

function DeliveryIcon() {
  return <_DeliveryIcon style={styles.activeTabIcon} />;
}

function TakeawayIcon() {
  return <_TakeawayIcon style={styles.activeTabIcon} />;
}

const styles = StyleSheet.create({
  tabLayout: {paddingHorizontal: 0, height: 40},
  tap: {
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
    width: 24,
    height: 24,
    fill: '#000000',
  },
  activeTabTextStyle: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: '600',
    color: getActiveTextColor(),
  },
  unActiveTabTextStyle: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: '600',
    color: getUnActiveTextColor(),
  },
});

export default RestaurantCategories;
