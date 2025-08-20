import instance, { API_BASE_URL } from "../instance";
import axios from "axios";
import { APP_NAME } from "../../constants";

const authApi = {
  login: (body) => instance.post("/user/get_token/masrif", body),
  logout: (body) => instance.post("/user/delete_token", body),
  updateProfile: (userId, body) =>
    instance.post(`/res.users/update/${userId}`, body),
  getUserData: (body) => instance.post("/user/dashboard/data", body),
  getUserBanners: (body) => instance.post("/user/dashboard/banner", body),
  contactUs: (body) => instance.post("/loyalty.contact.us/create", body),
  resetPassword: (body) =>
    instance.post("https://www.golalita.com/mobile/reset_password", body),
  getPublicOrganizations: () => instance.post("/user/org/lists/v2", {}),
  checkCode: (body) => instance.post("/code/check/v2", body),
  register: (body) =>
    instance.post(
      `https://www.golalita.com/organisation/employee/registration/v2/masrif`,
      body
    ),
  sendOTP: (body) => instance.post(`/send/otp/${APP_NAME}`, body),
  sendOTPEmail: (body) => instance.post(`/send/otp/email/${APP_NAME}` , body),
  sendOTPRegister: (body) => instance.post("/send/otp/new_user", body),
  verify: (body) => instance.post("/otp/verify", body),
  verifyEmail: (body) => instance.post("/user/verify/email", body),
  verifyPhone: (body) => instance.post("/user/verify/phone", body),
  validate_code: (body) => instance.post("/user/validate", body),
  verifyRegister: (body) => instance.post("/otp/verify/new_user", body),
  changePassword: (body) => instance.post("/create/otp/password", body),
  checkEmail: (body) => instance.post("/user/email/check", body),
  checkPhone: (body) => instance.post("/user/phone/check", body),
  getVersion: () =>
    instance.post(`https://www.golalita.com/mobile/version_org`, {
      params: { app_company_id: "6603" },
    }),

  getAppStatus: () =>
    axios.get("https://keepcalmlabs.com/wp-json/wp/v2/apps/401"),
};

export default authApi;
