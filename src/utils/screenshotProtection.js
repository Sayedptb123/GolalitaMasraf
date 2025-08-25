import RNScreenshotPrevent from 'react-native-screenshot-prevent';

export const enableScreenshotProtection = () => {
  RNScreenshotPrevent.enabled(true);

  RNScreenshotPrevent.enableSecureView();
};

export const disableScreenshotProtection = () => {
  RNScreenshotPrevent.enabled(false);

  RNScreenshotPrevent.disableSecureView();
};
