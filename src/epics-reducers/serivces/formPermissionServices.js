import axios from 'axios';
import {CONSTANTS} from '../../common/constants';
import {RESOURCE} from '../../common/resource';
import {COMMON_APP} from '../../common/common_app';
import {API} from '../../common/api';
import {URL} from "../../common/url";
import {
  fetchUsersFormPermissionSuccess,
  fetchUsersFormPermissionFailure
} from "../fetch/fetch-users-form-permission.duck";

function getFormPermission(frmCode, dispatch) {
  return axios.get(`${COMMON_APP.HOST_API}${API.USERS_FORM_PERMISSION}?form_code=${frmCode}`).then(res => {
    if (res.data) {
      dispatch(fetchUsersFormPermissionSuccess({[frmCode]: res.data}))
      return res.data;
    }
    else {
      dispatch(fetchUsersFormPermissionFailure(null))
      return null
    }
  })
    .catch(error => {
      dispatch(fetchUsersFormPermissionFailure(null))
      return null
    });
}

function checkFormPermission(form) {
  if (!form) {
    return false
  }
  return form.formMain.perYn
}

export {getFormPermission, checkFormPermission}