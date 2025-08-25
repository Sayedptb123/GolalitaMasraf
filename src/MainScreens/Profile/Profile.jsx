import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import { colors } from '../../components/colors';
import { sized } from '../../Svg';
import styles from './styles';
import CameraSvg from '../../assets/camera.svg';
import { mainStyles, SCREEN_HEIGHT } from '../../styles/mainStyles';
import Input from '../../components/Input/Input';
import CommonButton from '../../components/CommonButton/CommonButton';
import CommonButtonSecondary from '../../components/CommonButtonSecondary/CommonButtonSecondary';
import { DialogWindow } from '../../components/DialogWindow/DialogWindow';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useTheme } from '../../components/ThemeProvider';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { updateProfile } from '../../redux/auth/auth-thunks';
import * as Yup from 'yup';
import EditSvg from '../../assets/profile_edit.svg';
import { useTranslation } from 'react-i18next';
import { LUSAIL_REGULAR, VERSION } from '../../redux/types';
import { TypographyText } from '../../components/Typography';
import { deleteAccount } from '../../redux/merchant/merchant-thunks';
import TopCircleShadow from '../../components/TopCircleShadow';
import LogOutBtn from '../../components/CustomDrawer/components/LogOutBtn';

import {
  requestMultiple,
  PERMISSIONS,
  checkMultiple,
} from 'react-native-permissions';
import Header from '../../components/Header';
import { phoneRegExp } from '../../../utils';

const CameraIcon = sized(CameraSvg, 36, 32);
const EditIcon = sized(EditSvg, 31);

const Profile = ({ navigation, user, updateProfile, deleteAccount }) => {
  const { i18n, t } = useTranslation();
  const { isDark } = useTheme();
  const [isDialogWindow, setIsDialogWindow] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [image, setImage] = useState('');
  const [hasChanged, setHasChanged] = useState(false); // Track form changes
  console.log('useruseruser:', user);

  const language = i18n.language;
  const ref_to_input2 = useRef();

  const checkAndRequestPermissions = async () => {
    let permissions = [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ];

    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        permissions.push(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      } else {
        permissions.push(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      }
    }

    try {
      let statuses = await checkMultiple(permissions);

      let notGrantedPermissions = Object.entries(statuses)
        .filter(item => item[1] !== 'granted')
        .map(item => item[0]);

      if (notGrantedPermissions.length) {
        statuses = await requestMultiple(notGrantedPermissions);

        notGrantedPermissions = Object.entries(statuses)
          .filter(item => item[1] !== 'granted')
          .map(item => item[0]);
      }

      // if (notGrantedPermissions.length) {
      //   Alert.alert(
      //     "Permission Required",
      //     "Sorry, we need camera roll permissions to make this work!"
      //   );
      //   return false;
      // }
      if (notGrantedPermissions.length > 0) {
        // Check if any permissions are blocked
        const blockedPermissions = notGrantedPermissions.some(
          permission => statuses[permission] === 'blocked',
        );

        if (blockedPermissions) {
          Alert.alert(
            'Permission Required',
            'Camera and storage permissions are required to proceed. Please enable them in your app settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: () => Linking.openSettings(), // Open app settings
              },
            ],
          );
        } else {
          Alert.alert(
            'Permission Required',
            'Sorry, we need camera permissions to proceed.',
          );
          return;
        }
      }

      return true;
    } catch (err) {
      console.error('Permission error:', err);
      Alert.alert(
        'Permission Error',
        'An error occurred while requesting permissions.',
      );
      return false;
    }
  };

  const handleFormChange = values => {
    // Check if the form values differ from the initial user data
    const hasChanges =
      values.name !== user?.name ||
      values.email !== user?.email ||
      values.phone !== user?.phone ||
      values.x_moi_last_name !== user?.x_moi_last_name ||
      !!image;

    setHasChanged(hasChanges);
  };

  const handleUpdateProfile = async values => {
    try {
      const result = await updateProfile(
        {
          ...values,
          // image_1920:user?.photo || image,
        },
        undefined,
        t,
      );
      if (result?.success) {
        setHasChanged(false); // Reset state only if update is successful
      } else {
        console.error('Profile update failed:', result?.error);
      }
      //setHasChanged(false); // Reset state after updating profile
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const pickImage = async () => {
    setIsClicked(true);
    let data = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    });

    setIsClicked(false);

    const base64 = data?.assets?.[0]?.base64;

    if (!base64) {
      return;
    }

    setImage(base64);

    updateProfile(
      {
        image_1920: base64,
      },
      undefined,
      t,
    );
    if (!data.cancelled) {
      setIsDialogWindow(false);
    }
  };

  const launchCameraFunc = async () => {
    setIsClicked(true);

    let data = await launchCamera({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    });

    setIsClicked(false);

    const base64 = data?.assets?.[0]?.base64;

    if (!base64) {
      return;
    }

    setImage(base64);

    updateProfile({
      image_1920: base64,
    });
    if (!data.cancelled) {
      setIsDialogWindow(false);
    }
  };

  let items = [
    {
      name: t('Profile.deletePhoto'),
      func: () => {
        updateProfile(
          {
            image_1920: '',
          },
          undefined,
          t,
        );
        setImage(null);
        setIsDialogWindow(false);
      },
      color: colors.red,
    },
    {
      name: t('Profile.takePhoto'),
      func: launchCameraFunc,
    },
    {
      name: t('Profile.choosePhoto'),
      func: pickImage,
    },
  ];

  return (
    <View
      style={{
        backgroundColor: isDark ? colors.darkBlue : colors.white,
        flex: 1,
      }}
    >
      {isDialogWindow && (
        <DialogWindow
          items={items}
          isClicked={isClicked}
          isVisible={isDialogWindow}
          onCancel={() => setIsDialogWindow(false)}
        />
      )}
      <Formik
        initialValues={{
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          x_moi_last_name: user?.x_moi_last_name,
          x_first_name_arbic: user?.x_first_name_arbic,
          x_last_name_arbic: user?.x_last_name_arbic,
        }}
        onSubmit={handleUpdateProfile}
        // onSubmit={(values) => {
        //   let body = { ...values };

        //   updateProfile(body, undefined, t);
        // }}
        validationSchema={Yup.object({
          name: Yup.string().required(t('Login.required')),
          email: Yup.string()
            .email(t('ContactUs.enterValidEmail'))
            .required(t('Login.required')),
          phone: Yup.string()
            .matches(phoneRegExp, t('Login.invalidPhone'))
            .required(t('Login.required')),
        })}
      >
        {({ values, handleChange, handleSubmit, errors, submitCount }) => {
          useEffect(() => {
            handleFormChange(values);
          }, [values]);

          errors = submitCount > 0 ? errors : {};
          return (
            <SafeAreaView>
              <TopCircleShadow />
              <Header
                label={t('Profile.myProfile')}
                btns={['back', 'settings']}
                additionalBtnsProps={{
                  back: {
                    onPress: () => {
                      if (
                        user.name !== values.name ||
                        user.email !== values.email ||
                        user.phone !== values.phone
                      ) {
                        Alert.alert(t('Profile.doYouWantSaveChanges'), '', [
                          {
                            text: t('Profile.yes'),
                            onPress: () => {
                              updateProfile(
                                {
                                  name: values.name,
                                  email: values.email,
                                  phone: values.phone,
                                },
                                undefined,
                                t,
                              );
                              navigation.goBack();
                            },
                          },
                          {
                            text: t('Profile.no'),
                            onPress: () => navigation.goBack(),
                            style: 'cancel',
                          },
                        ]);
                      } else {
                        navigation.navigate('Main');
                      }
                    },
                  },
                  settings: {
                    onPress: () => navigation.navigate('Settings'),
                  },
                }}
              />

              <ScrollView style={{ height: SCREEN_HEIGHT - 100 }}>
                <View style={mainStyles.p20}>
                  <View style={mainStyles.centeredRow}>
                    <TouchableOpacity
                      activeOpacity={image !== null || user?.photo ? 1 : 0.7}
                      onPress={() => {
                        if (!(image !== null || user?.photo))
                          setIsDialogWindow(true);
                      }}
                      style={styles.changePhoto}
                    >
                      {image !== null || user?.photo ? (
                        <Image
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 50,
                            position: 'absolute',
                            left: 0,
                            top: 0,
                          }}
                          source={{
                            uri: image
                              ? `data:image/png;base64,${image}`
                              : user?.photo,
                          }}
                        />
                      ) : (
                        <CameraIcon />
                      )}
                      {(image !== null || user?.photo) && (
                        <TouchableOpacity
                          onPress={() => setIsDialogWindow(true)}
                          style={styles.changePhoto__icon}
                        >
                          <EditIcon />
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  </View>
                  <TypographyText
                    title={`v ${VERSION}`}
                    textColor={isDark ? colors.white : colors.darkBlue}
                    size={14}
                    font={LUSAIL_REGULAR}
                    style={{ alignSelf: 'center', fontWeight: '700' }}
                  />
                  {language == 'ar' ? (
                    <Input
                      label={t('Profile.firstName')}
                      value={values.x_first_name_arbic}
                      editable={false}
                      // onChangeText={handleChange("name")}
                      error={errors.x_first_name_arbic}
                      returnKeyType={'next'}
                      // onSubmitEditing={() => ref_to_input2.current.focus()}
                    />
                  ) : (
                    <Input
                      label={t('Profile.firstName')}
                      value={values.name}
                      editable={false}
                      // onChangeText={handleChange("name")}
                      error={errors.name}
                      returnKeyType={'next'}
                      // onSubmitEditing={() => ref_to_input2.current.focus()}
                    />
                  )}
                  {language == 'ar' ? (
                    <Input
                      label={t('Profile.lastName')}
                      value={values.x_last_name_arbic}
                      editable={false}
                      wrapperStyle={{ marginVertical: 20 }}
                      // onChangeText={handleChange("lastName")}
                      error={errors.x_last_name_arbic}
                      returnKeyType={'next'}
                      // onSubmitEditing={() => ref_to_input2.current.focus()}
                    />
                  ) : (
                    <Input
                      label={t('Profile.lastName')}
                      value={values.x_moi_last_name}
                      editable={false}
                      wrapperStyle={{ marginVertical: 20 }}
                      // onChangeText={handleChange("lastName")}
                      error={errors.name}
                      returnKeyType={'next'}
                      // onSubmitEditing={() => ref_to_input2.current.focus()}
                    />
                  )}
                  <Input
                    label={t('ContactUs.email')}
                    wrapperStyle={{ marginBottom: 20 }}
                    value={values.email}
                    innerRef={ref_to_input2}
                    onChangeText={e => {
                      handleChange('email')(e.toLowerCase());
                    }}
                    returnKeyType={'next'}
                    onSubmitEditing={Keyboard.dismiss}
                    error={errors.email}
                    style={{ textTransform: 'lowercase' }}
                    autoCorrect={false}
                    keyboardType={
                      Platform.OS === 'ios' ? 'default' : 'visible-password'
                    }
                    // secureTextEntry={true}

                    secureTextEntry={false}
                  />
                  <Input
                    label={t('ContactUs.mobileNumber')}
                    initialValue={values.phone}
                    onChangePhoneNumber={handleChange('phone')}
                    returnKeyType={'next'}
                    onSubmitEditing={Keyboard.dismiss}
                    error={errors.phone}
                    disableInputRtl
                  />

                  {/*<CommonButton icon={<WhitePremiumIcon/>} label={'Get VIP Account'}*/}
                  {/*              style={{marginTop: 26, backgroundColor: colors.orange}}/>*/}
                  {hasChanged && (
                    <CommonButton
                      onPress={handleSubmit}
                      label={t('Profile.updateProfile')}
                      style={{ marginTop: 27 }}
                      textColor={
                        isDark ? colors.mainDarkModeText : colors.white
                      }
                    />
                  )}
                  <CommonButtonSecondary
                    onPress={() => navigation.navigate('ChangePassword')}
                    label={t('Profile.changePassword')}
                    style={{ marginVertical: 27 }}
                    textColor={isDark ? colors.mainDarkMode : colors.white}
                  />
                  <View
                    style={{
                      height: 200,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginTop: 11,
                    }}
                  >
                    і
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          t('Profile.deleteAccount'),
                          t('Profile.deleteAccountDescription'),
                          [
                            {
                              text: t('Profile.no'),
                              onPress: () => {},
                              style: 'cancel',
                            },
                            {
                              text: t('Profile.yes'),
                              onPress: () => deleteAccount(),
                            },
                          ],
                        );
                      }}
                      style={
                        {
                          //paddingVertical: 13,
                          //  alignItems: "center",
                          // marginBottom: 140,
                        }
                      }
                    >
                      <TypographyText
                        title={t('Profile.deleteAccount')}
                        textColor={colors.red}
                        size={18}
                        font={LUSAIL_REGULAR}
                        style={{ marginTop: 5 }}
                      />
                    </TouchableOpacity>
                    <LogOutBtn />
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          );
        }}
      </Formik>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { updateProfile, deleteAccount })(
  Profile,
);
