import React, {useCallback, useMemo, } from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {CloseIcon} from '../../../../assets/delivery_assets';
import {SizedBox} from '../../../../components/DeliveryComp/sized_box';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const RestaurantFilters = ({onClose}) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={onClose}>
          <CloseIcon
            stroke={'#999CAD'}
            style={{width: 20, height: 20, stroke: '#999CAD'}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: '600', color: '#b49056'}}>
          Filter Restaurants
        </Text>
        <SizedBox size={1} />
      </View>
      <SizedBox size={24} />
      <Text style={{fontSize: 18, fontWeight: '600', color: '#b49056'}}>
        Most Used
      </Text>
      <SizedBox size={8} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, fontWeight: '600', color: '#999CAD'}}>
          Option1
        </Text>
        <BouncyCheckbox
          size={16}
          innerIconStyle={{
            borderRadius: 4,
            borderColor: '#999CAD',
          }}
          onPress={(isChecked) => {}}
        />
      </View>
      <SizedBox size={8} />
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default RestaurantFilters;
