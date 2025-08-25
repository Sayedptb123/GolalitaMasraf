import React, { useState } from 'react';
import { useTheme } from '../../../../components/ThemeProvider';
import { useTranslation } from 'react-i18next';
import useWalletCard from '../../../../hooks/useWalletCard';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { colors } from '../../../../components/colors';
import CommonButton from '../../../../components/CommonButton/CommonButton';
import { SCREEN_WIDTH } from '../../../../styles/mainStyles';

const AddToWalletBtn = () => {
  const { isDark } = useTheme();
  const { i18n, t } = useTranslation();
  const { addCardToWallet } = useWalletCard();
  const user = useSelector(state => state.authReducer.user);
  const [loading, setLoading] = useState(false);

  const language = i18n.language;

  const handlePress = async () => {
    const {
      name,
      x_user_expiry,
      barcode,
      x_moi_last_name,
      x_first_name_arbic,
      x_last_name_arbic,
      phone,
    } = user;

    let fName = name + ' ' + x_moi_last_name;
    let fNameAr = x_first_name_arbic + ' ' + x_last_name_arbic;
    let formattedBarcode = barcode.replace(/(.{4})(?=.)/g, '$1 ');

    const data = {
      name: language === 'ar' ? fNameAr : fName,
      fileName: fName,
      x_user_expiry,
              organisation: 'Al Rayan Rewards', // user.organisation,
      available_points: 1,
      organisation_logo:
        'https://golalita.com/web/static/src/img/emitiyaz/Layer.png',
      //photo: photo || cardData.image_url, //profile image
      barcode,
      foregroundColor: '#ffffff',
      backgroundColor: '#000000',
      textColor: '#ffffff',
      labelColor: '#ffffff',
      auxiliaryFieldTextColor: '#000000',
      applink:
        'https://apps.apple.com/in/app/golalita-rewards-and-discount/id6473549296',
      contact: phone,
      appId: [6473549296], //app id from  apple developer account,
      background:
        'https://golalita.com/web/static/src/img/emitiyaz/background.png',
      qid: formattedBarcode,
    };

    try {
      setLoading(true);

      const isCardAdded = await addCardToWallet(data);

      if (isCardAdded) {
        showMessage({
          type: 'warning',
          message: t('CardPage.addedCardMsg'),
        });
      }
    } catch (err) {
      console.log(err, 'err');
      showMessage({
        type: 'danger',
        message: t('General.error'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonButton
      label={t('CardPage.emtiazCard')}
      textColor={isDark ? colors.mainDarkMode : colors.darkBlue}
      onPress={handlePress}
      style={{
        width: (SCREEN_WIDTH / 100) * 85,
        alignSelf: 'center',
        marginTop: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0)',
        marginBottom: 40,
        backgroundColor: 'transparent',
        borderColor: isDark ? colors.mainDarkMode : colors.darkBlue,
      }}
      loadingIsCard={loading}
    />
  );
};

export default AddToWalletBtn;
