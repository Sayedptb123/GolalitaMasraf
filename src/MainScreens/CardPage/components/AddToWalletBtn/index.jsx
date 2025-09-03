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

    const { name, x_moi_last_name, x_user_expiry, barcode, photo, phone, x_first_name_arbic, x_last_name_arbic } = user;

    let fName = name + " " + x_moi_last_name;
    const data = {
      name: fName,
      x_user_expiry,
      organisation: user.organisation,
      available_points: 1,
      barcode
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
      textColor={isDark ? colors.mainDarkMode : colors.white}
      onPress={handlePress}
      style={{
        width: (SCREEN_WIDTH / 100) * 85,
        alignSelf: 'center',
        marginTop: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        shadowColor: 'rgba(0, 0, 0, 0)',
        marginBottom: 40,
       // backgroundColor: 'transparent',
        borderColor: isDark ? colors.darkBlue : colors.darkBlue,
      }}
      loading={loading}
    />
  );
};

export default AddToWalletBtn;
