/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';




AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => firebaseBackgroundMessage,
);


AppRegistry.registerComponent(appName, () => App);
