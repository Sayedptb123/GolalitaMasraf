import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  getDeliveryInformationColor,
  getDeliveryInformationTextColor,
} from '../../../../colors/app_colors';
import {SizedBox} from '../../../../components/DeliveryComp/sized_box';
import {CloseIcon, LocationIcon} from '../../../../assets/delivery_assets';

function ChangeLocationBottomSheet({onCloseSheet}) {
  const navigation = useNavigation();
  return (
    <View style={{marginHorizontal: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={onCloseSheet}>
          <CloseIcon
            stroke={'#999CAD'}
            style={{width: 20, height: 20, stroke: '#999CAD'}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: '600', color: '#b49056'}}>
          Select Delivery Location
        </Text>
        <SizedBox size={1} />
      </View>
      <SizedBox size={24} />
      <View style={style.row}>
        <LocationIcon style={style.locationIcon} />
        <View>
          <Text style={style.subTitle}>Deliver to:</Text>
          <Text style={style.title}>Lusail</Text>
        </View>
        <View style={{flex: 1}} />
        <BouncyCheckbox
          size={16}
          innerIconStyle={{
            borderRadius: 4,
            borderColor: '#999CAD',
          }}
          onPress={(isChecked) => {}}
        />
      </View>
      <SizedBox size={24} />

      <View style={style.layout}>
        <LocationIcon style={style.locationIcon} />
        <View>
          <Text style={style.title}>Deliver to current location</Text>
          <Text style={style.subTitle}>Enable device location</Text>
        </View>
      </View>
      <SizedBox size={24} />
      <TouchableOpacity onPress={() => navigation.navigate('locationMap')}>
        <View style={style.layout}>
          <LocationIcon style={style.locationIcon} />
          <View>
            <Text style={style.title}>Manually select location</Text>
            <Text style={style.subTitle}>
              choose location on the map or Blue plate
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    borderRadius: 16,
    borderColor: getDeliveryInformationColor(),
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    borderRadius: 16,
    alignItems: 'center',
  },
  locationIcon: {
    width: 20,
    height: 20,
    fill: getDeliveryInformationColor(),
    marginEnd: 12,
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 18,
    color: getDeliveryInformationTextColor(),
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: getDeliveryInformationTextColor(),
  },
});
export default ChangeLocationBottomSheet;
