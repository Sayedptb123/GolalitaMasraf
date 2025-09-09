import {
  getMerchantDetails,
  getOfferById,
} from "../redux/merchant/merchant-thunks";
import store from "../redux/store";
import i18n from "i18next";
import { setClickedNotificationData } from "../redux/notifications/notifications-actions";

export const NotificatiionClickHanlder = {
  merchant: (merchant_id) => {
    store.dispatch(setClickedNotificationData(null));
    console.log("before get merchant details");
    store.dispatch(getMerchantDetails(merchant_id, null, i18n.t));
  },
  product: (product_id, notification) => {
    store.dispatch(setClickedNotificationData(notification));
    store.dispatch(getOfferById(product_id));
  },
};

export const handleNotificationClick = (notification) => {
  if (!notification) {
    return;
  }

  const { data } = notification;

  if (data.merchant_id && data.merchant_id !== "False") {
    NotificatiionClickHanlder.merchant(Number(data.merchant_id));
    return;
  }

  if (data.product_id && data.product_id !== "False") {
    NotificatiionClickHanlder.product(Number(data.product_id), notification);
  }
};
