import { Linking, Platform } from "react-native";
import { getBase64PkpassFile } from "../api/wallet";

const isIos = Platform.OS === "ios";
const isAndroid = Platform.OS === "android";
const Brand = Platform.constants.Brand;
const Manufacturer = Platform.constants.Manufacturer;

const useWalletCard = () => {
 

};

export default useWalletCard;
