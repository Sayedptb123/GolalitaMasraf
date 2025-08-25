/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { initializeSslPinning } from 'react-native-ssl-public-key-pinning';
import CryptoJS from 'crypto-js';

const encryptedHashes =
  'U2FsdGVkX18+JXHjfjnyr3gbXWHLex3tq1O/AEtWoJvgwmhxiYyKalVJpcibV0LuolETh0KiEWqJygBvtsj+xudP1w48EqNvE4AFeNeZdgPOvWj83Pzu+p3xR4FPetH8V+rdZiDrckdkBttRWbUs/g==';

function hf() {
  return '2dwadaa3';
}
function er() {
  return '21d*3214jddqdwqj';
}
function pl() {
  return '321321';
}

const key = hf() + er() + pl();

const bytes = CryptoJS.AES.decrypt(encryptedHashes, key);
const utf8 = bytes.toString(CryptoJS.enc.Utf8);

const decryptedHashes = JSON.parse(utf8);

AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => firebaseBackgroundMessage,
);

initializeSslPinning({
  'golalita.com': {
    includeSubdomains: true,
    publicKeyHashes: [
      'Gfr7Ya3ZCvMyTxFJRkitvT19qq9DJYRnSiV8+BqA5V4=',
      'duniiKr8Djf0OQy/lGqtmX1cHJAbPOUT09j626viq4U=',
    ],
  },
});

AppRegistry.registerComponent(appName, () => App);
