import AsyncStorage from "@react-native-async-storage/async-storage";
import instance from "../redux/instance";

export const getAllLocations = async () => {
  const token = await AsyncStorage.getItem("token");

  const res = await instance.post("/user/get/locations", {
    params: {
      token,
    },
  });
  if (!res.data?.result) {
    throw new Error();
  }

  return res.data.result;
};
