import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../redux/instance';
import store from '../redux/store';

export const getMerchants = async (params = {}) => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/category/merchant/lists', {
    params: { token, ...params, x_org_linked: 'golalita' },
  });

  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result.sort((a, b) => (a.x_sequence > b.x_sequence ? 1 : -1));
};

export const getMerchantById = async merchant_id => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/merchant/lists', {
    params: { token, merchant_id },
  });

  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result;
};

export const getOffers = async (params = {}) => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/offers/v2', {
    params: { token, ...params },
  });

  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result;
};

export const getMerchantDetails = async params => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/merchant/moi/details', {
    params: {
      token,
      ...params,
    },
  });

  return res.data.result;
};

export const getPasscard = async (userName, expDate, barcode) => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/golalta/passcard/v2', {
    params: {
      token,
      key_label1: userName,
      key_label2: expDate,
      barcode,
    },
  });

  return res.data.result;
};

export const getAllMerchants = async () => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/category/merchant/lists', {
    params: {
      token,
    },
  });

  return res.data.result;
};

export const getLocalClients = async () => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/category/new/merchant/lists', {
    params: {
      token,
    },
  });

  return res.data.result;
};

export const getBranchesById = async merchant_id => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/merchant/branch/list', {
    params: {
      token,
      merchant_id,
    },
  });

  return res.data.result;
};

export const getMerchantDisscountForOffers = async merchant_id => {
  const token = await AsyncStorage.getItem('token');
  const x_for_employee_type = store.getState().authReducer.user.employee_type;

  const res = await instance.post('/user/offers-discount-tag', {
    params: {
      token,
      merchant_id,
      x_for_employee_type,
    },
  });

  const result = res.data.result?.[0];

  return {
    ribbon_text: result?.ribbon_text || '',
    x_ribbon_text_arabic: result?.x_discount_tag_arabic || '',
  };
};

export const getFavouriteMerchants = async customer_id => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/get/favourite/merchants', {
    params: {
      token,
      customer_id,
    },
  });

  return res.data.result;
};

export const getNearbyMerchants = async ({ latitude, longitude }) => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/category/merchant/list/nearby', {
    params: {
      token,
      latitude,
      longitude,
    },
  });

  return res.data.result?.merchants || [];
};

export const getPremiumMerchants = async () => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/merchant/lists/premium', {
    params: {
      token,
    },
  });

  return res.data.result;
};

export const getGoPointsMerchants = async () => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/category/merchant/lists/', {
    params: {
      token,
      gpoint: true,
      offset: 0,
      category_id: [],
    },
  });
  return res.data.result;
};

export const getPremiumMerchantsCount = async () => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/merchant/count/premium', {
    params: {
      token,
    },
  });

  return res.data.result;
};

export const getGoPointMerchatnsCount = async () => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/merchant/count/gpoint', {
    params: {
      token,
    },
  });

  return res.data.result;
};

export const getTemsAndConditions = async merchant_id => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/terms-conditions', {
    params: {
      token,
      merchant_id,
    },
  });

  return res.data.result;
};

export const getContracts = async merchant_id => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/contracts', {
    params: {
      token,
      merchant_id,
    },
  });

  return res.data.result;
};

export const saveBill = async params => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/user/scan/bills', {
    params: {
      token,
      ...params,
    },
  });

  return res.data.result;
};
