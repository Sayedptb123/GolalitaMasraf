import { Linking, Platform } from "react-native";
import { getBase64PkpassFile } from "../api/wallet";
import { WalletPasses } from "react-native-wallet-passes";

const isIos = Platform.OS === "ios";
const isAndroid = Platform.OS === "android";
const Brand = Platform.constants.Brand;
const Manufacturer = Platform.constants.Manufacturer;

const useWalletCard = () => {
  const addCard = async (base64EncodedPass) => {
    const result = await WalletPasses.addPass(
      base64EncodedPass,
      "com.golalitamasraf.fileprovider"
    );

    console.log(result, "result");

    return result;
  };

  const navigateToStoreAndroid = async () => {
    const playMarketAppUrl = "market://details?id=io.walletpasses.android";

    const canOpenPlayMarketApp = await Linking.canOpenURL(playMarketAppUrl);

    if (canOpenPlayMarketApp) {
      await Linking.openURL(playMarketAppUrl);

      return;
    }

    const playMarketUrl =
      "https://play.google.com/store/apps/details?id=io.walletpasses.android";

    const canOpenPlayMarketURL = await Linking.canOpenURL(playMarketUrl);

    if (canOpenPlayMarketURL) {
      await Linking.openURL(playMarketUrl);

      return;
    }

    throw "err";
  };

  const navigateToHuaweiAppGallery = async () => {
    const playMarketAppUrl =
      "https://appgallery.cloud.huawei.com/ag/n/app/C102754379?locale=en_GB&source=appshare&subsource=C102754379&shareTo=com.android.bluetooth&shareFrom=appmarket&shareIds=7206081f16e242c783d37bada6e588af_com.android.bluetooth&callType=SHARE";
    const canOpenPlayMarketApp = await Linking.canOpenURL(playMarketAppUrl);
    if (canOpenPlayMarketApp) {
      await Linking.openURL(playMarketAppUrl);
      return;
    }
    const playMarketUrl =
      "https://appgallery.cloud.huawei.com/ag/n/app/C102754379?locale=en_GB&source=appshare&subsource=C102754379&shareTo=com.android.bluetooth&shareFrom=appmarket&shareIds=7206081f16e242c783d37bada6e588af_com.android.bluetooth&callType=SHARE";
    // "https://play.google.com/store/apps/details?id=io.walletpasses.android";
    const canOpenPlayMarketURL = await Linking.canOpenURL(playMarketUrl);
    if (canOpenPlayMarketURL) {
      await Linking.openURL(playMarketUrl);
      return;
    }
    throw "err";
  };

  const navigateToStoreIOS = async () => {
    const playStoreAppUrl =
      "itms-apps://apps.apple.com/id/app/apple-wallet/id1160481993";

    const canOpenPlayStoreApp = await Linking.canOpenURL(playStoreAppUrl);

    if (canOpenPlayStoreApp) {
      await Linking.openURL(playStoreAppUrl);

      return;
    }

    const playStoreUrl =
      "https://apps.apple.com/us/app/apple-wallet/id1160481993";

    const canOpenPlayStoreURL = await Linking.canOpenURL(playStoreUrl);

    if (canOpenPlayStoreURL) {
      await Linking.openURL(playStoreUrl);

      return;
    }

    throw "err";
  };

  const addCardToWallet = async (data) => {
    const canAddPass = await WalletPasses.canAddPasses();

    if (!canAddPass) {
      if (isAndroid) {
        await (Manufacturer === "HUAWEI" || Brand === "HUAWEI"
          ? navigateToHuaweiAppGallery()
          : navigateToStoreAndroid());
        return;
      }

      if (isIos) {
        await navigateToStoreIOS();
        return;
      }

      throw "err";
    }

    const base64pkpass = await getBase64PkpassFile(data);

    const res = await addCard(base64pkpass);

    return res;
  };

  return { addCardToWallet };
};

export default useWalletCard;
