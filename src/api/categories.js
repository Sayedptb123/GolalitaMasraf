import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../redux/instance';

export const getChildCategoriesById = async (parent_id, type, country) => {
  const token = await AsyncStorage.getItem('token');

  const res = await instance.post('/child/category/v2', {
    params: {
      token,
      parent_id,
      org_id: 6603,
      type,
      country,
    },
  });

  if (!res.data.result) {
    throw new Error();
  }

  return res.data.result;
};
