import { applyMiddleware, combineReducers, createStore } from "redux";

import thunk from "redux-thunk";
import { authReducer } from "./auth/auth-reducer";
import { merchantReducer } from "./merchant/merchant-reducer";
import { transactionsReducer } from "./transactions/transactions-reducer";
import { notificationsReducer } from "./notifications/notifications-reducer";
import { loadersReducer } from "./loaders/loaders-reducer";
import { restaurantReducer } from "./delivery/delivery-reducer";
import { locationsReducer } from "./locations/locations-reducer";
import { cartReducer } from "./cart/cart-reducer";
import { orderHistoryReducer } from "./orderHistory/order-history-reducer";
import { voucherReducer } from "./voucher/voucher-reducer";
import { giftcardsReducer } from "./giftCards/giftcards-reducer";
import { favouriteMerchantsReducer } from "./favouriteMerchants/favourite-merchants-reducer";
import { globalReducer } from "./global/global-reducer";

let reducers = combineReducers({
  authReducer,
  merchantReducer,
  transactionsReducer,
  notificationsReducer,
  loadersReducer,
  restaurantReducer,
  locationsReducer,
  cartReducer,
  orderHistoryReducer,
  voucherReducer,
  giftcardsReducer,
  favouriteMerchantsReducer,
  globalReducer
});

let store = createStore(reducers, applyMiddleware(thunk));
export default store;
