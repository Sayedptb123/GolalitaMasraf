import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  getDeliveryInformationColor,
  getDeliveryInformationTextColor,
} from '../../../../colors/app_colors';
import {LocationIcon} from '../../../../assets/delivery_assets';

function DeliveryInformation({onChangeLocation}) {
  return (
    <View style={style.layout}>
      <LocationIcon style={style.locationIcon} />
      <View>
        <Text style={style.subTitle}>Deliver to:</Text>
        <Text style={style.title}>Lusail</Text>
      </View>
      <View style={{flex: 1}} />
      <TouchableOpacity onPress={onChangeLocation}>
        <Text style={[style.title, {marginHorizontal: 12}]}>Change</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    borderRadius: 16,
    borderColor: getDeliveryInformationColor(),
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
  },
  locationIcon: {
    width: 20,
    height: 20,
    fill: getDeliveryInformationColor(),
    marginHorizontal: 12,
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

export default DeliveryInformation;
