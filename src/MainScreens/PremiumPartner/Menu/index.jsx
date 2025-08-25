import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';
import { useTheme } from '../../../components/ThemeProvider';
import { colors } from '../../../components/colors';
import FullScreenLoader from '../../../components/Loaders/FullScreenLoader';
import { TypographyText } from '../../../components/Typography';
import { useTranslation } from 'react-i18next';
import { LUSAIL_REGULAR } from '../../../redux/types';
import Header from '../../../components/Header';

const Menu = props => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const company_contract_url = props.route?.params?.company_contract_url;

  const [error, setError] = useState(!company_contract_url);

  const handleBackPress = () => {
    props.navigation.goBack
      ? props.navigation.goBack()
      : props.navigation.navigate('Main');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.darkBlue : colors.white,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          btns={['back']}
          label={t('Merchants.contract')}
          additionalBtnsProps={{
            onPress: handleBackPress,
          }}
        />

        {!!company_contract_url && !error && (
          <Pdf
            source={{
              uri: company_contract_url,
              cache: true,
            }}
            onError={error => {
              console.log(error, 'pdf on error');
              setError(true);
            }}
            style={styles.pdf}
            renderActivityIndicator={() => {
              return <FullScreenLoader style={styles.loader} />;
            }}
            trustAllCerts={false}
          />
        )}

        {error && (
          <View style={styles.errorWrapper}>
            <TypographyText
              title={t('General.error')}
              textColor={isDark ? colors.white : colors.darkBlue}
              size={18}
              font={LUSAIL_REGULAR}
              style={{ fontWeight: '700' }}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  pdf: { flex: 1 },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  errorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Menu;
