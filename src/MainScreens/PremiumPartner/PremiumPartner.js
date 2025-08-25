import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import Overview from './Overview/Overview';
import { colors } from '../../components/colors';
import { useTheme } from '../../components/ThemeProvider';
import { connect } from 'react-redux';
import { setMerchantDetails } from '../../redux/merchant/merchant-actions';
import { useEffect } from 'react';

export default function PremiumPartner({ setMerchantDetails, route }) {
  const { isDark } = useTheme();
  const params = route?.params;

  useEffect(() => {
    return () => {
      setMerchantDetails(null);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.darkBlue : colors.white,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Overview title={params.title} />
      </SafeAreaView>
    </View>
  );
}

PremiumPartner = connect(() => ({}), { setMerchantDetails })(PremiumPartner);
