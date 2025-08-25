import authApi from './auth-api';
import {
  setIsAuthorized,
  setIsLoginError,
  setIsMainUser,
  setIsUserJustLogOut,
  setLoginLoading,
  setPublicOrganizations,
  setToken,
  setUser,
  setUserId,
  setVersion,
  setWorkStatus,
} from './auth-actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_DISABLED, APP_ENABLED, CONTENT_DISABLED } from './auth-types';
import { showMessage } from 'react-native-flash-message';
import { setPremiumMerchants } from '../merchant/merchant-actions';
import { navigationRef } from '../../Navigation/navigationHelpers';
import i18next from 'i18next';
import { Platform } from 'react-native';
import { getMessageNotifications } from '../notifications/notifications-thunks';
import { getAdvert, getParentCategories } from '../merchant/merchant-thunks';
import { LOGIN_INPUT_TYPES } from '../../AuthScreens/Login';

export const getInitialData = () => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    const { categoriesType } = getState().merchantReducer;

    if (userId) dispatch(setUserId(userId));
    if (token) {
      dispatch(getUserData(token));
      dispatch(setToken(token));
      dispatch(getAdvert());
      dispatch(getParentCategories(categoriesType));
      dispatch(getMessageNotifications());
    }
  } catch (err) {
    console.log(err, 'user error');
  }
};

export const login =
  (body, inputType, setFieldError) => async (dispatch, getState) => {
    dispatch(setLoginLoading(true));

    dispatch(setIsLoginError(false));

    const pushToken = await AsyncStorage.getItem('deviceToken');
    const { categoriesType } = getState().merchantReducer;

    const newBody = {
      params: {
        ...body,
        device_id: pushToken,
        expo_token: pushToken,
        device_token: pushToken,
      },
    };

    console.log(newBody, 'new body');

    try {
      const res = await authApi.login(newBody);

      console.log(res.data, 'login res');

      if (typeof res.data.result.error === 'string') {
        setFieldError(
          inputType === LOGIN_INPUT_TYPES.phone ? 'phone' : 'email',
          res.data.result.error,
        );
        dispatch(setIsLoginError(true));

        return;
      }

      await AsyncStorage.setItem('userId', res.data.result.id.toString());
      await AsyncStorage.setItem(
        'family_head_id',
        `${res.data.result.family_head_id}`,
      );
      await AsyncStorage.setItem(
        'tracking_partner_id',
        `${res.data.result.tracking_partner_id}`,
      );
      await AsyncStorage.setItem(
        'paused_notification',
        `${res.data.result.paused_notification}`,
      );
      await AsyncStorage.setItem('token', res.data.result.token);
      await AsyncStorage.setItem('isUserLoggedOut', 'false');

      dispatch(setToken(res.data.result.token));
      dispatch(setUserId(res.data.result.id));

      dispatch(getUserData(res.data.result.token));
      dispatch(getAdvert());
      dispatch(getParentCategories(categoriesType));
      dispatch(getMessageNotifications());
      dispatch(setIsAuthorized(true));
    } catch (err) {
      dispatch(setIsLoginError(true));
      console.log(err, 'login error');
    } finally {
      dispatch(setLoginLoading(false));
    }
  };

export const logout = () => async dispatch => {
  // let { token } = getState().authReducer;
  // await authApi.logout({ params: { token } });
  dispatch(setIsUserJustLogOut(true));
  dispatch(setToken(null));
  dispatch(setUserId(null));
  dispatch(setUser(null));
  dispatch(setIsAuthorized(false));

  await AsyncStorage.setItem('isUserLoggedOut', 'true');
  // await AsyncStorage.removeItem("token");
  // await AsyncStorage.removeItem("userId");
  // await AsyncStorage.removeItem("family_head_id");
};

export const updateProfile =
  (body, navigation, t) => async (dispatch, getState) => {
    const { token, user, userId } = getState().authReducer;
    console.log('update profiel');

    if (body.email && user.email !== body.email) {
      const res = await authApi.checkEmail({
        params: {
          token,
          email: body.email,
        },
      });

      if (res.data?.result?.error) {
        showMessage({
          message: t('Profile.emailExists'),
          type: 'danger',
        });

        return;
      }
    }
    if (body.phone && user.phone !== body.phone) {
      const res = await authApi.checkPhone({
        params: {
          token,
          phone: body.phone,
        },
      });
      if (res.data?.result?.error) {
        showMessage({
          message: t('Profile.phoneExists'),
          type: 'danger',
        });

        return;
      }
    }

    try {
      const response = await authApi.updateProfile(userId, {
        params: {
          token,
          update_vals: JSON.stringify(body),
        },
      });

      if (response.data?.result?.success) {
        dispatch(getUserData(token));
        showMessage({
          message: t('Profile.profileUpdated'),
          type: 'success',
        });
        return { success: true, result: response.data.result };
      } else
        showMessage({
          message: response.data?.result?.error,
          type: 'success',
        });
    } catch (error) {
      showMessage({
        message: t('Profile.updateFailed'), // Provide a fallback message
        type: 'error',
      });
      return { success: false, error: error.message };
    }
    if (navigation) navigation.navigate('Profile');
  };

export const getUserBanners = token => async dispatch => {
  const userRes = await authApi.getUserBanners({
    params: {
      token,
    },
  });

  const banners = userRes.data.result.banners;
  const sortedBanners = banners.sort((a, b) =>
    a.x_sequence > b.x_sequence ? 1 : -1,
  );

  dispatch(setPremiumBanners(sortedBanners));
};

export const getUserData = token => async dispatch => {
  const paused_notification = await AsyncStorage.getItem('paused_notification');
  console.log('data:token:', token);
  const res = await authApi.getUserData({
    params: { token },
  });

  if (res.data.result.profile) {
    dispatch(
      setUser({
        ...res.data.result.profile,
        x_moi_last_name: res.data.result.x_moi_last_name,
        x_first_name_arbic: res.data.result.x_first_name_arbic,
        x_last_name_arbic: res.data.result.x_last_name_arbic,
        x_user_expiry: res.data.result.x_user_expiry,
        photo: `${res.data.result.profile.photo}?time=${new Date()}`,
        paused_notification: JSON.parse(paused_notification),
      }),
    );

    dispatch(setPremiumMerchants(res.data.result.premium_merchants));
    dispatch(setToken(token));
    dispatch(setIsMainUser(res.data.result.main_member));
  } else {
    dispatch(setToken(null));
    dispatch(setUserId(null));

    // await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('family_head_id');
  }
};

export const contactUs =
  (body, setIsSuccessContact) => async (dispatch, getState) => {
    const { token, user } = getState().authReducer;
    const res = await authApi.contactUs({
      params: {
        create_vals: JSON.stringify({ ...body, partner_id: user.partner_id }),
        token,
      },
    });
    setIsSuccessContact(true);
  };

export const getAppStatus = () => async (dispatch, getState) => {
  try {
    const res = await authApi.getAppStatus();
    if (res.data['enable-app'] === '0') dispatch(setWorkStatus(APP_DISABLED));
    if (res.data['content-display'] === 'Disable')
      dispatch(setWorkStatus(CONTENT_DISABLED));
  } catch (e) {
    dispatch(setWorkStatus(APP_ENABLED));
  }
};

export const resetPassword =
  (body, setFieldError, t, setIsSuccessSend) => async dispatch => {
    try {
      const res = await authApi.resetPassword(body);

      if (res.data.result.error) {
        setFieldError('login', t('Login.emailNotFound'));
      } else {
        setIsSuccessSend(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

export const register = body => async dispatch => {
  try {
    dispatch(setLoginLoading(true));
    const res = await authApi.register({ params: body });

    console.log(res, 'register res');

    if (!res.data?.result?.error) {
      const loginData = {
        device_type: Platform.OS,
        login: body.phone,
        password: body.password,
      };

      dispatch(login(loginData));
    } else {
      dispatch(setLoginLoading(false));

      res.data.result.error
        ? showMessage({
            message: res.data.result.error, // Provide a fallback message
            type: 'error',
          })
        : showMessage({
            message: i18next.t('Login.somethingWrong'), // Provide a fallback message
            type: 'error',
          });
    }
  } catch (e) {
    dispatch(setLoginLoading(false));
    console.log(e, 'register error');
  }
};

export const sendOTPEmail = (email, setFieldError) => async () => {
  try {
    const res = await authApi.sendOTPEmail({
      params: { email },
    });

    if (typeof res.data.result?.error === 'string') {
      setFieldError('email', res.data.result?.error);
      return;
    }

    if (!res.data.result) {
      setFieldError('email', i18next.t('Login.emailDoesntExist'));
      return;
    } else {
      showMessage({
        message: res.data.result.success,
        type: 'success',
      });
    }

    navigationRef.navigate('Verification', {
      email,
      isForgotPassword: true,
    });
  } catch (err) {
    setFieldError('email', i18next.t('Login.somethingWrong'));
  }
};

export const sendOTP =
  (
    body,
    registerBody,
    isResend,
    navigation,
    setFieldError,
    t,
    isForgotPassword,
  ) =>
  async () => {
    try {
      let res;
      if (isForgotPassword) {
        res = await authApi.sendOTP({
          params: body,
        });
      } else {
        res = await authApi.sendOTPRegister({
          params: body,
        });
      }

      if (typeof res.data?.result?.error === 'string') {
        setFieldError('phone', res.data?.result?.error);
        return;
      }

      if (!res?.data?.result) {
        showMessage({
          message: t('Login.somethingWrong'),
          type: 'error',
        });

        return;
      }

      showMessage({
        message: res.data.result.success,
        type: 'success',
      });

      navigation.navigate('Verification', {
        registerBody,
        phone: body.phone,
        isForgotPassword,
      });
    } catch (e) {
      setFieldError('phone', t('Login.somethingWrong'));
    }
  };

export const verify =
  (body, navigation, setFieldError, t, registerBody, isForgotPassword) =>
  async dispatch => {
    try {
      let res;
      if (isForgotPassword) {
        res = await authApi.verify(body);
      } else {
        res = await authApi.verifyRegister(body);
      }

      if (res.data?.result?.success) {
        if (isForgotPassword)
          navigation.navigate('CreatePassword', {
            isForgotPassword: true,
            token: res.data.result?.token,
          });
        else {
          dispatch(register(registerBody, navigation, t));
          navigation.navigate('Login');
        }
      } else {
        setFieldError('code', t('Login.wrongCode'));
      }
    } catch (e) {
      console.log(e);
    }
  };

export const verifyMoiCode =
  (body, navigation, setFieldError, t, registerBody, isForgotPassword) =>
  async dispatch => {
    console.log('verifyMoiCode verifyMoiCode:', body);
    let code = body.params.activationCode;
    try {
      let res;
      res = await authApi.verifyMoiCode(body);
      // Convert response to string if it's not already a string
      let soapResponse = res.data;

      if (typeof soapResponse !== 'string') {
        soapResponse = JSON.stringify(soapResponse); // Convert to string if it's an object or other type
      }

      console.log('Converted soapResponse to string:', soapResponse);

      // Extract data using regular expressions
      const firstNameEn = soapResponse.match(
        /<firstNameEn>(.*?)<\/firstNameEn>/,
      )?.[1];
      const lastNameEn = soapResponse.match(
        /<lastNameEn>(.*?)<\/lastNameEn>/,
      )?.[1];
      const firstNameAr = soapResponse.match(
        /<firstNameAr>(.*?)<\/firstNameAr>/,
      )?.[1];
      const lastNameAr = soapResponse.match(
        /<lastNameAr>(.*?)<\/lastNameAr>/,
      )?.[1];
      const cardNumber = soapResponse.match(
        /<cardNumber>(.*?)<\/cardNumber>/,
      )?.[1];
      const cardType = soapResponse.match(/<cardType>(.*?)<\/cardType>/)?.[1];

      const errorMessageEn = soapResponse.match(
        /<errorMessageEn>(.*?)<\/errorMessageEn>/,
      )?.[1];
      const errorMessageENG = soapResponse.match(
        /<errorMessageENG>(.*?)<\/errorMessageENG>/,
      )?.[1];

      // Check if data was successfully extracted
      if (
        !firstNameEn ||
        !lastNameEn ||
        !cardNumber ||
        !cardType ||
        !firstNameAr ||
        !lastNameAr
      ) {
        console.log(
          'Error: Failed to extract necessary fields from the response.',
        );
        errorMessageENG
          ? setFieldError('qidExpiry', t('Login.wrongExpiry'))
          : setFieldError('registration_code', t('Login.wrongCode'));
        return;
      }

      console.log('First Name (En):', firstNameEn);
      console.log('Last Name (En):', lastNameEn);
      console.log('First Name (Ar):', firstNameAr);
      console.log('Last Name (Ar):', lastNameAr);
      console.log('Card Number:', cardNumber);
      console.log('Card Type:', cardType);
      if (firstNameEn) {
        navigation.navigate('Register', {
          firstNameEn,
          firstNameAr,
          lastNameEn,
          lastNameAr,
          cardNumber,
          cardType,
          code,
        });
      } else {
        errorMessageENG
          ? setFieldError('qidExpiry', t('Login.wrongExpiry'))
          : setFieldError('registration_code', t('Login.wrongCode'));
      }
    } catch (e) {
      console.log('is it error?????', e);
    }
  };

export const verifyMoiCode1 =
  (body, navigation, setFieldError, t, registerBody, isForgotPassword) =>
  async dispatch => {
    console.log('verifyMoiCode verifyMoiCode:', body);
    try {
      let res;
      res = await authApi.verifyMoiCode(body);
      console.log('ressssss verifyMoiCode:', res.data);
      if (res.data?.result?.first_name) {
        navigation.navigate('Register', {
          data: res.data.result,
        });
      } else {
        errorMessageENG
          ? setFieldError('qidExpiry', t('Login.wrongExpiry'))
          : setFieldError('registration_code', t('Login.wrongCode'));
      }
    } catch (e) {
      console.log(e);
    }
  };

export const changePassword =
  (body, navigation, setFieldError, t) => async () => {
    try {
      const res = await authApi.changePassword({ params: body });

      if (!res.data.result?.error) {
        navigation.navigate('Login');
      } else {
        setFieldError('repeatPassword', t('Login.somethingWrong'));
      }
    } catch (e) {}
  };

export const getVersion = () => async dispatch => {
  try {
    const res = await authApi.getVersion();

    dispatch(setVersion(res.data.result.current_mobile_version));
  } catch (e) {
    console.log(e);
  }
};
