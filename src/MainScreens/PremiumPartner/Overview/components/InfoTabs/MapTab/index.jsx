import { Linking, StyleSheet } from 'react-native';
import Map from '../../../../../MapPage/Map';
import { useSelector } from 'react-redux';
import { globalUserCoordinatesSelector } from '../../../../../../redux/global/global-selectors';

const MapTab = ({ merchantDetails }) => {
  const coordiates = useSelector(globalUserCoordinatesSelector);

  const userLatitude = coordiates?.latitude;
  const userLongitude = coordiates?.longitude;

  console.log(userLatitude, userLongitude);

  const handleMarkerPress = () => {
    if (userLatitude && userLongitude) {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&origin=${userLatitude},${userLongitude}&destination=${merchantDetails.partner_latitude},${merchantDetails.partner_longitude}&travelmode=driving`,
      );
      return;
    }

    Linking.openURL(
      `https://www.google.com/maps/dir/Current+Location/${merchantDetails.partner_latitude},${merchantDetails.partner_longitude}`,
    );
  };

  return (
    <Map
      isMapTab={true}
      merchants={[merchantDetails]}
      style={styles.map}
      initialRegion={{
        latitude: merchantDetails.partner_latitude,
        longitude: merchantDetails.partner_longitude,
      }}
      onMarkerPress={handleMarkerPress}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDFE4',
    overflow: 'hidden',
    marginTop: 25,
  },
});

export default MapTab;
