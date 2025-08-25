import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useVerify = (validate_code,verifyEmail,verifyPhone, t) => {

  const [generatedCode, setGeneratedCode] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState(null);
  const [isCheckEmail, setIsCheckedEmail] = useState(false);
  const [isCheckPhone, setIsCheckedPhone] = useState(false);

  const generateRandomCode = (type, value,check) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setGeneratedCode(randomCode);

    const payload = {
      params: {
        [type]: value,
        "validate_code": randomCode,
        method: type
      }
    };
    validate_code(payload, t);
    setModalVisible(true);
    setType(type);
    type == "phone" ? setIsCheckedPhone(check) : setIsCheckedEmail(check);
    console.log("Generated Code:", randomCode);
  };

  const verifyHandler = async (validationSchema, values, type,check) => {
    try {
      await validationSchema.fields[type].validate(values[type]);
      !isModalVisible && generateRandomCode(type, values[type],check);
    } catch (error) {
      showMessage({
        message: error.message,
        type: "danger",
      });
      console.error(`${type} validation error:`, error.message);
    }
  };

  const emailHandler = (b) =>{
    console.log("emailHandler type:" ,type)
    console.log("emailHandler isCheckEmail:" ,isCheckEmail)
    isCheckEmail && verifyEmail(b)
  }
  const phoneHandler = (b) =>{
    console.log("phoneHandler type:" ,type)
    console.log("phoneHandler isCheckPhone:" ,isCheckPhone)
    isCheckPhone &&  verifyPhone(b)
  }

 const onVerify = async () => {

  const token = await AsyncStorage.getItem("token");
    try {
      let b = {
        params: {
          token: token,
        },
      };
    type == "phone" ? phoneHandler(b) : emailHandler(b);
    } catch (error) {
      showMessage({
        message: error.message,
        type: "danger",
      });
      console.error(`${type} validation error:`, error.message);
    }
  };
  

  return {
    generatedCode,
    isModalVisible,
    setModalVisible,
    type,
    onVerify,
    verifyHandler,
  };
};
