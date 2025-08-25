import { applyMiddleware, combineReducers, createStore } from 'redux';

import thunk from 'redux-thunk';
import { authReducer } from './auth/auth-reducer';
import { merchantReducer } from './merchant/merchant-reducer';
import { notificationsReducer } from './notifications/notifications-reducer';
import { loadersReducer } from './loaders/loaders-reducer';
import { voucherReducer } from './voucher/voucher-reducer';
import { giftcardsReducer } from './giftCards/giftcards-reducer';
import { favouriteMerchantsReducer } from './favouriteMerchants/favourite-merchants-reducer';
import { globalReducer } from './global/global-reducer';

let reducers = combineReducers({
  authReducer,
  merchantReducer,
  notificationsReducer,
  loadersReducer,
  voucherReducer,
  giftcardsReducer,
  favouriteMerchantsReducer,
  globalReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));
export default store;
