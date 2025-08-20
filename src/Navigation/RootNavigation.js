import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

import { StackActions } from "@react-navigation/native";

export function navigate(name, params) {
  clearTimeout(timeout);

  console.log(navigationRef.isReady(), "is ready");

  let timeout = null;
  if (navigationRef.isReady()) {
    // Perform navigation if the react navigation is ready to handle actions
    clearTimeout(timeout);
    navigationRef.current?.navigate(name, params);
  } else {
    timeout = setTimeout(() => {
      navigate(name, params);
    }, 2000);
    // You can decide what to do if react navigation is not ready
    // You can ignore this, or add these actions to a queue you can call later
  }
}

export const getNavigation = () => navigationRef?.current;

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}
