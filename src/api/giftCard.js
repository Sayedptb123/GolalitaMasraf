import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../redux/instance";
import axios from "axios";
import store from "../redux/store";

export const CARDMOOLA_BASE_URL1 = "https://api-dev.business.cardmoola.com";
export const CARDMOOLA_BASE_URL = "https://api.business.cardmoola.com";

//DEV KEY
const Key1 = {
  apiKey: "elSHUBAx",
  apiSecret: "Y3pE2ceLLOhVzhB8HHQhp",
}

//PROD KEY
const Key = {
  apiKey: "EToStwO_",
  apiSecret: "GfTqmproCkR9aUSS7jRx9",
} 

export const getGiftCardCountries = async () => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/ugo2gift.country/search", {
    params: {
      token,
      fields:
        "['id','name','code', 'currency_name','x_arabic_name','x_flag_image', 'currency_code', 'timezone', 'mobile_number_formats', 'mobile_number_regex', 'detail_url' ]",
    },
  });

  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result;
};

export const getGiftCardById = async (reference_id) => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("user/ugo2gift/search/id", {
    params: {
      token,
      reference_id,
    },
  });

  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result;
};

export const getGiftCardCategories = async () => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("ugo2gift.category/search", {
    params: {
      token,
      fields: "['id','name', 'category_id']", //'image',
    },
  });

  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result;
};

export const createGiftCardOrder = async (body) => {
  const token = await AsyncStorage.getItem("token");

  const params = {
    token,
    ...body,
    message: "Well Done!,\nI thought you would like this gift!",
    delivery_language: "en",
    notify: 1,
  };

  const res = await instance.post("/user/ugo2gift/create", {
    params: params,
  });

  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result;
};

export const getGiftCardAmount = async (giftCardId) => {
  const token = await AsyncStorage.getItem("token");
  let a = {
    token,
    domain: `[ ['brand_id', '=', ${giftCardId}], ['is_active','=',True]]`,
    fields: "['amount','min_amount', 'max_amount', 'currency', 'brand_id']",
  }
  console.log("getGiftCardAmount starts")
  const res = await instance.post("ugo2gift.denomination/search", {
    params: a
  });

  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result;
};

export const getGiftCards = async (body) => {
  const token = await AsyncStorage.getItem("token");

  console.log("getGiftCardAmount body:",body)
  const res = await instance.post("/ugo2gift.brand/search", {
    params: {
      token,
      ...body,
    },
  });

 // console.log("getGiftCardAmount res:",res.data)
  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result;
};

export const getPurchasedGiftCards = async (customer_id) => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("user/ugo2gift/bought/list", {
    params: {
      token,
      customer_id,
    },
  });

  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result;
};

export const getPurchasedGiftCardCode = async (reference_id) => {
  const res = await instance.get(
    `https://sandbox.yougotagift.com/barcode/generate/${reference_id}/`
  );

  return res.data;
};

// card mola gift cards

export const getCardmolaToken = async () => {
  const res = await axios.post(
    `${CARDMOOLA_BASE_URL}/auth/token`,
    Key
  );


  const token = res.data?.data?.accessToken?.token;

  if (!token) {
    throw "Error, Can not get cardmola token";
  }

  return token;
};

export const getCardmolaGiftCards = async (country) => {
  const token = await getCardmolaToken();
let fCountry = country == "undefined-undefined" ? undefined : country;
  const res = await axios.get(
    `${CARDMOOLA_BASE_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      cultureCode: fCountry,
    },
  });

  if (!res.data.data) {
    throw new Error();
  }

  return { token, data: res.data.data };
};

export const getCardmolaGiftCardById = async (encodedId, token) => {
  const { selectedCardmolaCountry } = store.getState().giftcardsReducer;
  
  let a = (selectedCardmolaCountry === "undefined-undefined" || selectedCardmolaCountry ===  null) ? 
  `${CARDMOOLA_BASE_URL}/products/${encodedId}` :
   `${CARDMOOLA_BASE_URL}/products/${encodedId}?cultureCode=${selectedCardmolaCountry}`;

   const res = await axios.get(a,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.data.data) {
    throw new Error();
  }

  return res.data.data;
};

export const requestGiftCardPayment = async (data) => {
  const token = await AsyncStorage.getItem("token");

  const res = await axios.post(
    "https://www.golalita.com/cardmola/payment/request",
    {
      params: {
        ...data,
        token,
        message: "Well Done!,\nI thought you would like this gift!",
        delivery_language: "en",
        notify: 1,
      },
    }
  );

  if (!res.data?.result) {
    throw new Error();
  }

  return res.data.result;
};

export const getCardmolaCountries = async () => {
  const { cardmolaToken } = store.getState().giftcardsReducer;

  const res = await axios.get(
    `${CARDMOOLA_BASE_URL}/countries`, {
    headers: {
      Authorization: `Bearer ${cardmolaToken}`,
    },
  });

  if (!res.data.data) {
    throw new Error();
  }

  return res.data.data;
};

export const getCardmoolaCategories = async (country) => {
  const { cardmolaToken } = store.getState().giftcardsReducer;

  const res = await axios.get(
    `${CARDMOOLA_BASE_URL}/products/get-categories`, {
      headers: {
        Authorization: `Bearer ${cardmolaToken}`,
      },
      params: {
        countryCode: country,
      },
    });
  if (!res.data.data) {
    throw new Error();
  }

  return res.data.data;
};

export const checkCardmolaPaymentById = async (encodedId) => {
  const token = await AsyncStorage.getItem("token");
  console.log("checkCardmolaPaymentById encodedId:",encodedId)
  const res = await axios.post(
    "https://www.golalita.com/go/api/user/cardmoola/search/id",
    {
      params: {
        token,
        reference_id: encodedId,
      },
    }
  );

  console.log("checkCardmolaPaymentById res:",res.data)
  if (!res.data.result?.[0]) {
    throw new Error("check cardmola payent error");
  }

  return res.data.result?.[0];
};

export const getCardmolaCurrencies = async () => {
  const token = await AsyncStorage.getItem("token");

  const res = await axios.post(
    "https://www.golalita.com/go/api/res.currency/search",
    {
      params: {
        token,
        fields: "['name', 'rate', 'symbol']",
        domain: "[['active', '!=', False]]",
      },
    }
  );

  if (!res.data.result) {
    throw new Error("get currencies error error");
  }

  return res.data.result;
};
