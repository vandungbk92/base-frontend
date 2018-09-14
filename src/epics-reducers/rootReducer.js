import {combineReducers} from 'redux';

import {requestLoginReducer, fetchLoginReducer} from './fetch/fetch-login.duck';
import {requestLogoutReducer, fetchLogoutReducer} from "./fetch/fetch-logout.duck";

import {requestProfileReducer, fetchProfileReducer} from "./fetch/fetch-profile.duck";

import {fetchToastReducer, fetchWaitReducer} from "./fetch/fetch-toast.duck";

import {fetchUsersInfoReducer} from "./fetch/fetch-users-info.duck";
import {
  requestProductsReducer,
  fetchProductsReducer,
  requestProductReducer,
  fetchProductReducer
} from "./fetch/fetch-product.duck";

import {
  requestUserFormPermissionReducer,
  fetchUsersFormPermissionReducer
} from "./fetch/fetch-users-form-permission.duck";

const rootReducer = combineReducers({
  loginReq: requestLoginReducer,
  loginRes: fetchLoginReducer,

  logoutReq: requestLogoutReducer,
  logoutRes: fetchLogoutReducer,

  profileReq: requestProfileReducer,
  profileRes: fetchProfileReducer,

  notify: fetchToastReducer,
  wait: fetchWaitReducer,

  productsReq: requestProductsReducer,
  productsRes: fetchProductsReducer,
  productReq: requestProductReducer,
  productRes: fetchProductReducer,
//users info
  usersInfoRes: fetchUsersInfoReducer,
//users form permission
  usersFormPermissionReq: requestUserFormPermissionReducer,
  usersFormPermissionRes: fetchUsersFormPermissionReducer
});

export default rootReducer;
