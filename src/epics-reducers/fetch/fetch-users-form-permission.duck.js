import {createAction} from 'redux-actions';
import axios from 'axios';
import {Observable} from 'rxjs';

import {COMMON_APP} from '../../common/common_app'
import {CONSTANTS} from '../../common/constants'
import {RESOURCE} from '../../common/resource'
import {API} from '../../common/api'

export const FETCH_USERS_FORM_PERMISSION_REQUEST = 'FETCH_USERS_FORM_PERMISSION_REQUEST';
export const FETCH_USERS_FORM_PERMISSION_SUCCESS = 'FETCH_USERS_FORM_PERMISSION_SUCCESS';
export const FETCH_USERS_FORM_PERMISSION_FAILURE = 'FETCH_USERS_FORM_PERMISSION_FAILURE';

export const fetchUsersFormPermissionRequest = createAction(FETCH_USERS_FORM_PERMISSION_REQUEST);
export const fetchUsersFormPermissionSuccess = createAction(FETCH_USERS_FORM_PERMISSION_SUCCESS);
export const fetchUsersFormPermissionFailure = createAction(FETCH_USERS_FORM_PERMISSION_FAILURE);

export const fetchUsersFormPermissionEpic = (action, store) =>
  action.ofType(FETCH_USERS_FORM_PERMISSION_REQUEST)
    .mergeMap(() => {
      let frmCode = store.getState().usersFormPermissionReq.frmCode
      return axios.get(`${COMMON_APP.HOST_API}${API.USERS_FORM_PERMISSION.format('form_code', frmCode)}`)
        .then(res => {
          if (res.data) {
            return fetchUsersFormPermissionSuccess(res.data);
          }
          else {
            return fetchUsersFormPermissionFailure(null)
          }
        })
        .catch(error => {
          return fetchUsersFormPermissionFailure(null)
        })
    });

export function requestUserFormPermissionReducer(usersFormPermissionReq = {}, action) {
  switch (action.type) {
    case FETCH_USERS_FORM_PERMISSION_REQUEST:
      return action.payload;
    default:
      return usersFormPermissionReq;
  }
}

export function fetchUsersFormPermissionReducer(usersFormPermissionRes = {}, action) {
  switch (action.type) {
    case FETCH_USERS_FORM_PERMISSION_SUCCESS:
      return action.payload;
    case FETCH_USERS_FORM_PERMISSION_FAILURE:
      return action.payload;
    default:
      return usersFormPermissionRes;
  }
}
