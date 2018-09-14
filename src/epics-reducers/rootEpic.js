import {combineEpics} from 'redux-observable';
import {fetchLoginEpic} from './fetch/fetch-login.duck'
import {fetchLogoutEpic} from "./fetch/fetch-logout.duck";
import {fetchProfileEpic} from "./fetch/fetch-profile.duck";
import {fetchProductsEpic, fetchProductEpic} from "./fetch/fetch-product.duck";
import {fetchUsersInfoEpic} from "./fetch/fetch-users-info.duck";
import {fetchUsersFormPermissionEpic} from "./fetch/fetch-users-form-permission.duck";

const rootEpic = combineEpics(
  //Get login info
  fetchLoginEpic,
  // Logout
  fetchLogoutEpic,
  // profile
  fetchProfileEpic,
//product
  fetchProductsEpic,
  fetchProductEpic,

  //User info
  fetchUsersInfoEpic,

//Users form permission
  fetchUsersFormPermissionEpic
)

export default rootEpic;
