import { GLOBAL_SET_USER_LOCATION } from './global-types';

export const setUserLocation = (coordiates, status) => ({
  type: GLOBAL_SET_USER_LOCATION,
  coordiates,
  status,
});
