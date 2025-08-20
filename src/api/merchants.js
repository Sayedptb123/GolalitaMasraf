import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../redux/instance";
import { getOffsetAndLimit } from "../../utils";
import store from "../redux/store";

export const getMerchants = async (params = {}) => {
  const token = await AsyncStorage.getItem("token");

  console.log(params, "getMerchants params");
  const res = await instance.post("/user/category/merchant/lists", {
    params: { token, ...params, x_org_linked: "masrif" },
  });

  //console.log(res.data, "getMerchants res data");
  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result.sort((a, b) => (a.x_sequence > b.x_sequence ? 1 : -1));
};

export const getMerchantById = async (merchant_id) => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/merchant/lists", {
    params: { token, merchant_id, x_org_linked: "masrif" },
  });

  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result;
};

export const getOffers = async (params = {}) => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/offers/v2", {
    params: { token, ...params },
  });

  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result;
};

export const getMerchantDetails = async (params = {}) => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/merchant/details", {
    params: {
      token,
      ...params,
    },
  });

  return res.data.result;
};

export const getPasscard = async (userName, expDate, barcode) => {
  const token = await AsyncStorage.getItem("token");

  console.log({
    token,
    key_label1: userName,
    key_label2: expDate,
    barcode,
  });

  const res = await instance.post("/golalta/passcard/v3", {
    params: {
      token,
      key_label1: userName,
      key_label2: expDate,
      barcode,
    },
  });

  return res.data.result;
};

export const getAllMerchants = async (otherParams = {}) => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/category/merchant/lists", {
    params: {
      token,
      x_org_linked: "masrif",
      ...otherParams,
    },
  });

  return res.data.result;
};

export const getNearbyMerchants = async ({ latitude, longitude }) => {
  const token = await AsyncStorage.getItem("token");
  const res = await instance.post("/user/category/merchant/list/nearby", {
    params: {
      token,
      latitude,
      longitude,
    },
  });
  return res.data.result?.merchants || [];
};

export const getTemsAndConditions = async (merchat_id) => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/terms-conditions", {
    params: {
      token,
      merchant_id: merchat_id,
    },
  });

  return res.data.result;
};

export const getLocalClients = async () => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/category/new/merchant/lists", {
    params: {
      token,
    },
  });

  return res.data.result;
};

export const getPremiumMerchants = async () => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/merchant/lists/premium", {
    params: {
      token,
    },
  });

  return res.data.result;
};

export const getGoPointsMerchants = async () => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/category/merchant/lists/", {
    params: {
      token,
      gpoint: true,
      offset: 0,
      category_id: [],
    },
  });
  console.log("res.data.resultL", res.data.result.length);
  return res.data.result;
};

export const getBranchesById = async (merchant_id) => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/merchant/branch/list", {
    params: {
      token,
      merchant_id,
    },
  });

  return res.data.result;
};

export const getMerchantDisscountForOffers = async (merchant_id) => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/offers-discount-tag", {
    params: {
      token,
      merchant_id,
    },
  });

  const result = res.data.result?.[0];

  return {
    ribbon_text: result?.ribbon_text || "",
    x_ribbon_text_arabic: result?.x_discount_tag_arabic || "",
  };
};

export const getFavouriteMerchants = async (customer_id) => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/get/favourite/merchants", {
    params: {
      token,
      customer_id,
    },
  });

  return res.data.result;
};

export const saveBill = async (params) => {
  const token = await AsyncStorage.getItem("token");
  console.log("saveBill starts.........:", params);
  const res = await instance.post("/user/scan/bills", {
    params: {
      token,
      ...params,
    },
  });

  console.log("saveBill res.data.........:", res.data);
  return res.data.result;
};

export const getPremiumMerchantsCount = async () => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/merchant/count/premium", {
    params: {
      token,
    },
  });

  return res.data.result;
};

export const getGoPointMerchatnsCount = async () => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/merchant/count/gpoint", {
    params: {
      token,
    },
  });

  return res.data.result;
};

export const getContracts = async (merchat_id) => {
  const token = await AsyncStorage.getItem("token");

  console.log(merchat_id, "merchant id");

  const res = await instance.post("/user/contracts", {
    params: {
      token,
      merchant_id: merchat_id,
    },
  });

  console.log(res?.data?.result, "contracts result");

  return res.data.result;
};
