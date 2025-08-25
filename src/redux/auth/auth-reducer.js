import { Platform } from "react-native";
import {
  SET_IS_LOGIN_ERROR,
  SET_PUBLIC_ORGANIZATIONS,
  SET_TOKEN,
  SET_USER,
  SET_USER_ID,
  SET_VERSION,
  SET_WORK_STATUS,
  SET_IS_USER_JUST_LOG_OUT,
  SET_IS_AUTHORIZED,
  SET_SPLASH_SCREEN_VISIBLE,
  SET_IS_MAIN_USER,
  SET_LOGIN_LOADING,
  SET_PROFILE_LOADING,
} from "./auth-types";

const initialState = {
  user: null,
  userBanners: [],
  userBannersLoading: false,
  isLoginError: false,
  loginLoading: false,
  token: "",
  userId: null,
  workStatus: null,
  publicOrganizations: [],
  version: null,
  isUserJustLogOut: false,
  isAuthorized: null,
  isSplashScreenVisible: Platform.OS === "ios" ? true : false,
  isMainUser: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_LOADING:
      return { ...state, profileLoading: action.profileLoading };
    case SET_USER:
      return { ...state, user: action.user };
    case SET_IS_LOGIN_ERROR:
      return { ...state, isLoginError: action.isLoginError };
    case SET_LOGIN_LOADING:
      return { ...state, loginLoading: action.loading };
    case SET_TOKEN:
      return { ...state, token: action.token };
    case SET_IS_MAIN_USER:
      return { ...state, isMainUser: action.payload };
    case SET_USER_ID:
      return { ...state, userId: action.userId };
    case SET_WORK_STATUS:
      return { ...state, workStatus: action.workStatus };
    case SET_PUBLIC_ORGANIZATIONS:
      return { ...state, publicOrganizations: action.publicOrganizations };
    case SET_VERSION:
      return { ...state, version: action.version };
    case SET_IS_USER_JUST_LOG_OUT:
      return { ...state, isUserJustLogOut: action.payload };
    case SET_IS_AUTHORIZED:
      return { ...state, isAuthorized: action.payload };
    case SET_SPLASH_SCREEN_VISIBLE:
      return { ...state, isSplashScreenVisible: action.payload };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoginError: true,
      };
    case "RESET_LOGIN_ERROR":
      return {
        ...state,
        isLoginError: false,
      };
    default:
      return state;
  }
};
