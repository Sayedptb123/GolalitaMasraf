import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  Text,
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';

import i18next from 'i18next';
import { colors } from '../../components/colors';
import { getPixel, mainStyles, SCREEN_HEIGHT } from '../../styles/mainStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TypographyText } from '../../components/Typography';
import { LUSAIL_REGULAR } from '../../redux/types';
import { Formik } from 'formik';
import Input from '../../components/Input/Input';
import CommonButton from '../../components/CommonButton/CommonButton';
import { useTheme } from '../../components/ThemeProvider';
import { useTranslation } from 'react-i18next';
import authApi from '../../redux/auth/auth-api';
import { getValidationSchema } from './validation';
import ContinueAsGuestBtn from '../component/ContinueAsGuestBtn';
import LogoSvg from '../../assets/logo.svg';
import AuthLayout from '../component/AuthLayout';
import { connect } from 'react-redux';

import {
  changePassword,
  register,
  sendOTP,
} from '../../redux/auth/auth-thunks';
import TopCircleShadow from '../../components/TopCircleShadow';
import FullScreenLoader from '../../components/Loaders/FullScreenLoader';
import Header from '../../components/Header';

const DEFAULT_ORGANIZATION_NAME = 'Ministry of Interior';
const DEFAULT_ORGANIZATION_CODE = '24967';
const Register = ({ route, navigation, register, loginLoading }) => {
  let params = route?.params;

  const { isDark } = useTheme();
  const ref_to_input2 = useRef();
  const ref_to_input3 = useRef();
  const ref_to_input4 = useRef();
  const ref_to_input5 = useRef();
  const ref_to_input6 = useRef();
  const ref_to_input7 = useRef();
  const ref_to_input8 = useRef();
  const [isAgreed, setIsAgreed] = useState(false);
  const [data, setData] = useState(params);

  const CARD_NUMBER = data?.serial_number;
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);

  const language = i18n.language;
  const toLogin = useCallback(() => {
    navigation.navigate('Login');
  }, []);
  const logoColor = isDark ? colors.mainDarkMode : colors.darkBlue;

  return (
    <AuthLayout light>
      <Formik
        initialValues={{
          name: data?.firstNameEn,
          x_moi_last_name: data?.lastNameEn,
          cardNumber: data?.cardNumber,
          login: '',
          email: '',
          phone: '+974',
          password: '',
          repeatPassword: '',
          first_name_arbic: data?.firstNameAr,
          last_name_arbic: data?.lastNameAr,
          // organizationCode: "",
        }}
        onSubmit={async (values, { setFieldError }) => {
          try {
            setLoading(true);

            const {
              name,
              x_moi_last_name,
              first_name_arbic,
              last_name_arbic,
              cardNumber,
              email,
              phone,
            } = values;

            const res = await authApi.checkEmail({
              params: { email },
            });

            if (res.data.result?.error) {
              setFieldError('email', t('Profile.emailExists'));
              throw 'err';
            }

            const phoneRes = await authApi.checkPhone({
              params: { phone },
            });

            if (phoneRes.data.result?.error) {
              setFieldError('phone', t('Profile.phoneExists'));
              throw 'err';
            }

            const registerBody = {
              name,
              x_moi_last_name,
              email,
              phone,
              card_number: cardNumber,
              parent_id: DEFAULT_ORGANIZATION_CODE,
              password: values.password,
              first_name_arbic,
              last_name_arbic,
            };
            console.log('registerBodyregisterBody:', registerBody);

            if (!isAgreed) {
              alert('Kindly Agree Terms & Conditions');

              throw 'err';
            }

            const registerRes = await register(registerBody);
            // Handle the successful registration response
            if (!registerRes?.data?.success) {
              setLoading(false);
              // Perform any additional actions, e.g., navigate to a new screen
            }
          } catch (err) {
            console.log(err, 'err');
            setLoading(false);
          }
        }}
        validationSchema={getValidationSchema()}
      >
        {({ values, handleChange, handleSubmit, errors, submitCount }) => {
          errors = submitCount > 0 ? errors : {};

          return (
            <View
              scrollEnabled={Platform.OS === 'android'}
              style={{
                height: SCREEN_HEIGHT,
              }}
            >
              <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAwareScrollView
                  contentContainerStyle={styles.contentContainerStyle}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      Keyboard.dismiss();
                    }}
                    style={{ flex: 1 }}
                  >
                    <View style={styles.goldShadeWrapper}></View>
                    <View
                      style={[
                        mainStyles.centeredRow,
                        { margin: 30, flexDirection: 'column' },
                      ]}
                    >
                      <LogoSvg width={92} height={49} color={logoColor} />
                    </View>
                    {loginLoading ? (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          width: '100%',
                          marginTop: '90%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <TypographyText
                          title={'Logging In......'}
                          textColor={
                            isDark ? colors.mainDarkMode : colors.darkBlue
                          }
                          size={23}
                          style={{ alignItems: 'flex-end' }}
                          font={LUSAIL_REGULAR}
                        />
                        <View>
                          <FullScreenLoader
                            style={{ alignItems: 'flex-start' }}
                          />
                        </View>
                      </View>
                    ) : (
                      <View
                        style={[
                          mainStyles.p20,
                          { marginTop: getPixel(7), flex: 1 },
                        ]}
                      >
                        <>
                          {language == 'ar' ? (
                            <View
                              style={{
                                flexDirection: 'row-reverse',
                                flex: 1,
                              }}
                            >
                              <Input
                                label={t('Login.yourName')}
                                placeholder={t('Login.yourNamePlaceholder')}
                                value={values.first_name_arbic}
                                //onChangeText={handleChange("name")}
                                error={errors.first_name_arbic}
                                returnKeyType={'next'}
                                //onSubmitEditing={() => ref_to_input2.current.focus()}
                                wrapperStyle={{
                                  marginBottom: 12,
                                  flex: 1,
                                  marginLeft: 20,
                                }}
                                editable={false}
                                style={{ fontSize: 16 }}
                              />

                              <Input
                                label={t('Login.lastName')}
                                innerRef={ref_to_input3}
                                placeholder={t('Login.lastNamePlaceholder')}
                                value={values.last_name_arbic}
                                //onChangeText={handleChange("x_moi_last_name")}
                                error={errors.last_name_arbic}
                                returnKeyType={'next'}
                                //onSubmitEditing={() => ref_to_input3.current.focus()}
                                wrapperStyle={{
                                  marginBottom: 12,
                                  flex: 1,
                                  marginRight: 20,
                                }}
                                style={{ fontSize: 16 }}
                                editable={false}
                              />
                            </View>
                          ) : (
                            <View
                              style={{
                                flexDirection: 'row',
                                flex: 1,
                              }}
                            >
                              <Input
                                label={t('Login.yourName')}
                                placeholder={t('Login.yourNamePlaceholder')}
                                value={values.name}
                                //onChangeText={handleChange("name")}
                                error={errors.name}
                                returnKeyType={'next'}
                                //onSubmitEditing={() => ref_to_input2.current.focus()}
                                wrapperStyle={{
                                  marginBottom: 12,
                                  flex: 1,
                                  marginRight: 20,
                                }}
                                editable={false}
                                style={{ fontSize: 16 }}
                              />

                              <Input
                                label={t('Login.lastName')}
                                innerRef={ref_to_input3}
                                placeholder={t('Login.lastNamePlaceholder')}
                                value={values.x_moi_last_name}
                                //onChangeText={handleChange("x_moi_last_name")}
                                error={errors.x_moi_last_name}
                                returnKeyType={'next'}
                                //onSubmitEditing={() => ref_to_input3.current.focus()}
                                wrapperStyle={{
                                  marginBottom: 12,
                                  flex: 1,
                                  marginLeft: 20,
                                }}
                                style={{ fontSize: 16 }}
                                editable={false}
                              />
                            </View>
                          )}

                          <Input
                            label={t('Login.cardNo')}
                            innerRef={ref_to_input4}
                            placeholder={t('Login.cardNo')}
                            value={values.cardNumber}
                            //onChangeText={handleChange("x_moi_last_name")}
                            error={errors.cardNumber}
                            returnKeyType={'next'}
                            //onSubmitEditing={() => ref_to_input5.current.focus()}
                            wrapperStyle={{ marginBottom: 12 }}
                            editable={false}
                            style={{ fontSize: 16 }}
                          />

                          <Input
                            // label={t("Login.email")}
                            placeholder={t('Login.emailPlaceholder')}
                            value={values.email}
                            onChangeText={e =>
                              handleChange('email')(e.toLowerCase())
                            }
                            innerRef={ref_to_input5}
                            error={errors.email}
                            returnKeyType={'next'}
                            autoCapitalize="none"
                            // onSubmitEditing={Keyboard.dismiss}
                            wrapperStyle={{ marginBottom: 12 }}
                            style={{ fontSize: 16 }}
                          />
                          <Input
                            label={t('ContactUs.mobileNumber')}
                            //placeholder={t("Login.yourPhone")}
                            initialValue={values.phone}
                            onChangePhoneNumber={handleChange('phone')}
                            innerRef={ref_to_input6}
                            error={errors.phone}
                            returnKeyType={'next'}
                            onSubmitEditing={() =>
                              ref_to_input7.current.focus()
                            }
                            disableInputRtl
                            style={{ fontSize: 16 }}
                          />

                          <Input
                            label={t('Login.password')}
                            placeholder={t('Login.passwordPlaceholder')}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            error={errors.password}
                            keyboardType={'ascii-capable'}
                            returnKeyType={'next'}
                            secureTextEntry={true}
                            innerRef={ref_to_input7}
                            onSubmitEditing={() =>
                              ref_to_input8.current.focus()
                            }
                            style={{ fontSize: 16 }}
                            wrapperStyle={{ marginBottom: 12 }}
                          />
                          <Input
                            label={t('Profile.confirmPassword')}
                            placeholder={t('Login.confirmPasswordPlaceholder')}
                            innerRef={ref_to_input8}
                            value={values.repeatPassword}
                            onChangeText={handleChange('repeatPassword')}
                            error={errors.repeatPassword}
                            secureTextEntry={true}
                            returnKeyType={'next'}
                            onSubmitEditing={Keyboard.dismiss}
                            wrapperStyle={{ marginBottom: 12 }}
                            style={{ fontSize: 16 }}
                          />

                          <View style={styles.bottom}>
                            <TypographyText
                              title={t('Login.haveAccount')}
                              textColor={isDark ? colors.darkGrey : colors.grey}
                              size={14}
                              font={LUSAIL_REGULAR}
                            />

                            <TouchableOpacity
                              style={styles.link}
                              onPress={toLogin}
                            >
                              <TypographyText
                                title={t('Login.logIn')}
                                textColor={
                                  isDark ? colors.mainDarkMode : colors.darkBlue
                                }
                                size={16}
                                style={[mainStyles.underline, { margin: 6 }]}
                                font={LUSAIL_REGULAR}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginBottom: 16,
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                marginRight: 11,
                                height: 22,
                                borderRadius: 6,
                                width: 22,
                                padding: 1,
                                borderWidth: 2,
                                borderColor: isDark
                                  ? colors.mainDarkMode
                                  : colors.darkBlue,
                                overflow: 'hidden',
                              }}
                              onPress={() => setIsAgreed(!isAgreed)}
                            >
                              {isAgreed ? (
                                <View
                                  style={{
                                    flex: 1,
                                    width: '110%',
                                    height: '110%',
                                    //borderRadius: 6,
                                    overflow: 'hidden',
                                  }}
                                >
                                  {isDark ? (
                                    <Image
                                      source={require('../../assets/Checkbox1.png')}
                                      style={styles.logo}
                                    />
                                  ) : (
                                    <Image
                                      source={require('../../assets/Checkbox2.png')}
                                      style={styles.logo}
                                    />
                                  )}
                                </View>
                              ) : (
                                <View
                                  style={{
                                    backgroundColor: isDark
                                      ? colors.black
                                      : colors.white,
                                    flex: 1,
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 6,
                                    overflow: 'hidden',
                                  }}
                                ></View>
                              )}
                            </TouchableOpacity>
                            {language == 'ar' ? (
                              <TouchableOpacity
                                style={{ flex: 1, flexDirection: 'row' }}
                                onPress={() => {
                                  navigation.navigate('PrivacyPolicy');
                                }}
                              >
                                <Text
                                  style={{
                                    color: isDark
                                      ? colors.mainDarkMode
                                      : 'blue',
                                  }}
                                >
                                  {t('Profile.privacypPolicy')}
                                </Text>

                                <TouchableOpacity>
                                  <Text
                                    style={{
                                      color: isDark
                                        ? colors.white
                                        : colors.grey,
                                      fontSize: 16,
                                    }}
                                  >
                                    {t('Profile.agreeTo')}{' '}
                                  </Text>
                                </TouchableOpacity>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                style={{ flex: 1, flexDirection: 'row' }}
                              >
                                <Text
                                  style={{
                                    color: isDark ? colors.white : colors.grey,
                                  }}
                                >
                                  {t('Profile.agreeTo')}{' '}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    navigation.navigate('PrivacyPolicy');
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: isDark
                                        ? colors.mainDarkMode
                                        : 'blue',
                                    }}
                                  >
                                    {t('Profile.privacypPolicy')}
                                  </Text>
                                </TouchableOpacity>
                              </TouchableOpacity>
                            )}
                          </View>

                          <CommonButton
                            onPress={handleSubmit}
                            label={t('Login.register')}
                            loading={loading}
                            textColor={
                              isDark ? colors.mainDarkModeText : colors.white
                            }
                          />

                          <ContinueAsGuestBtn />
                        </>
                      </View>
                    )}
                  </TouchableOpacity>
                  <TopCircleShadow />
                </KeyboardAwareScrollView>
              </SafeAreaView>
            </View>
          );
        }}
      </Formik>
    </AuthLayout>
  );
};

const styles = {
  bg: {
    position: 'absolute',
    left: '5%',
    right: '5%',
    top: 0,
    width: '100%',
  },
  bottom: {
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  link: {
    paddingVertical: 5,
  },
  contentContainerStyle: {
    paddingBottom: 30,
  },
  goldShadeWrapper: {
    width: 500,
    height: 500,
    borderRadius: 250,
    position: 'absolute',
    right: -260,
    top: -230,
    shadowColor: '#DDBD6B',
    shadowOffset: {
      width: 120,
      height: 120,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 55,
    zIndex: 10000,
  },
  logo: {
    resizeMode: 'stretch',
    with: '100%',
    height: '100%',
  },
};

const mapStateToProps = state => ({
  loading: state.authReducer.loginLoading,
  loginLoading: state.authReducer.loginLoading,
});

export default connect(mapStateToProps, { register })(Register);
