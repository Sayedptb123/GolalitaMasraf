import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getTakeawayInformationColor}from '../../../../colors/app_colors';
import {TakeawayLocationIcon} from '../../../../assets/delivery_assets';

function TakeawayInformation() {
  return (
    <View style={style.layout}>
      <TakeawayLocationIcon style={style.takeawayIcon} />
      <View>
        <Text style={style.title}>Restaurant near your location</Text>
        <Text style={style.subTitle}>Enable device location</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    borderRadius: 16,
    borderColor: getTakeawayInformationColor(),
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
  },
  takeawayIcon: {
    width: 20,
    height: 20,
    fill: getTakeawayInformationColor(),
    marginHorizontal: 12,
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 18,
    color: getTakeawayInformationColor(),
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: getTakeawayInformationColor(),
  },
});

export default TakeawayInformation;
