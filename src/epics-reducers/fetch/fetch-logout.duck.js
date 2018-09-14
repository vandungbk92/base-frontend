import {createAction} from 'redux-actions';
import axios from 'axios';
import {Observable} from 'rxjs';

import {COMMON_APP} from '../../common/common_app'
import {CONSTANTS} from '../../common/constants'
import {RESOURCE} from '../../common/resource'
import {API} from '../../common/api'

export const FETCH_LOGOUT_REQUEST = 'FETCH_LOGOUT_REQUEST';
export const FETCH_LOGOUT_SUCCESS = 'FETCH_LOGOUT_SUCCESS';
export const FETCH_LOGOUT_FAILURE = 'FETCH_LOGOUT_FAILURE';

export const fetchLogoutRequest = createAction(FETCH_LOGOUT_REQUEST);
export const fetchLogoutSuccess = createAction(FETCH_LOGOUT_SUCCESS);
export const fetchLogoutFailure = createAction(FETCH_LOGOUT_FAILURE);

export const fetchLogoutEpic = (action, store) =>
  action.ofType(FETCH_LOGOUT_REQUEST)
    .mergeMap(() => {
      return axios.post(`${COMMON_APP.HOST_API}${API.LOGOUT}`, store.getState().logoutReq)
        .then(res => {
          if (res.data.success) {
            COMMON_APP.deleteCookie(CONSTANTS._USER_LOGIN_)
            return fetchLogoutSuccess(res.data.data);
          }
          else {
            return fetchLogoutFailure(null)
          }
        })
        .catch(error => {
          return fetchLogoutFailure(null)
        })
    });

export function requestLogoutReducer(logoutReq = {}, action) {
  switch (action.type) {
    case FETCH_LOGOUT_REQUEST:
      return action.payload;
    default:
      return logoutReq;
  }
}

export function fetchLogoutReducer(logoutRes = {}, action) {
  switch (action.type) {
    case FETCH_LOGOUT_SUCCESS:
      return action.payload;
    case FETCH_LOGOUT_FAILURE:
      return action.payload;
    default:
      return logoutRes;
  }
}