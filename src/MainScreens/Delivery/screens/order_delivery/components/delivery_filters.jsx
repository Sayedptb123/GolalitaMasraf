import {useNavigation} from '@react-navigation/native';
import React ,{useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';

//import {CALLBACK_TYPE} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import {
  getActiveListIconColor,
  getDeliveryInformationColor,
  getDeliveryInformationTextColor,
  getUnActiveListIconColor,
} from '../../../../colors/app_colors';
import {SizedBox} from '../../../../components/DeliveryComp/sized_box';
import {ListIcon,FilterIcon,FilterIconDark, ListIconDark,BlockIconDark} from '../../../../assets/delivery_assets';
import {useTheme} from "../../../../components/ThemeProvider";
import Toggle from "react-native-toggle-element";


const ModeTest = () => 
{
    const isDarkMode = () => useTheme().isDark ;
    return isDarkMode()? true : false
};

function DeliveryFilters({onOpen}) {
const [toggleValue, setToggleValue] = useState(false);
  return (
    <View style={styles.row}>
     <TouchableOpacity style={styles.container}  onPress={onOpen}>
        {ModeTest()? <FilterIconDark /> :<FilterIcon />}
        <SizedBox size={8} />
        <Text style={styles.title}>Filter Restaurants</Text>
      </TouchableOpacity> 
      <View style={{flex: 1}}></View>
      <Toggle value={toggleValue} onPress={() => setToggleValue(!toggleValue)} 
        trackBar={{
        activeBackgroundColor: useTheme().colors.mainBg,
        inActiveBackgroundColor:  useTheme().colors.mainBg,
        borderActiveColor: "#350d05",
        borderInActiveColor: "#350d05",
        borderWidth: 2,
        radius:25,
        }} 
        thumbButton ={{
          width: 80,
          height:55,
          radius:20,
          activeBackgroundColor: "#350d05",
          inActiveBackgroundColor: "#350d05",
        }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    borderRadius: 25,
    borderColor: getDeliveryInformationColor(),
    marginHorizontal: 8,
    borderWidth: 2,
    padding: 8,
    alignItems: 'center',
    
  },
  unActiveHalfContainer: {
    flexDirection: 'row',
    borderTopStartRadius: 16,
    borderBottomStartRadius: 16,
    borderColor: getDeliveryInformationColor(),
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
  },
  activeHalfContainer: {
    flexDirection: 'row',
    borderTopEndRadius: 16,
    borderBottomEndRadius: 16,
    color: getDeliveryInformationColor(),
    backgroundColor: getDeliveryInformationColor(),
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: getDeliveryInformationTextColor(),
  },
  activeTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: 'white',
  },
  unActiveListIconStyle: {
    width: 8,
    height: 12,
    fill: getUnActiveListIconColor(),
  },
  activeListIconStyle: {
    width: 8,
    height: 12,
    fill: getActiveListIconColor(),
  },

    layout: {
      flexDirection: 'row',
      borderRadius: 16,
      borderColor: getDeliveryInformationColor(),
      marginHorizontal: 3,
      borderWidth: 2,
      padding: 8,
      alignItems: 'center',
    },
});
export default DeliveryFilters;
