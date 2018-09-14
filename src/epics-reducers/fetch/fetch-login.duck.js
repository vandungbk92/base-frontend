import {createAction} from 'redux-actions';
import axios from 'axios';
import {Observable} from 'rxjs';

import {COMMON_APP} from '../../common/common_app'
import {CONSTANTS} from '../../common/constants'
import {RESOURCE} from '../../common/resource'
import {API} from '../../common/api'

export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE';

export const fetchLoginRequest = createAction(FETCH_LOGIN_REQUEST);
export const fetchLoginSuccess = createAction(FETCH_LOGIN_SUCCESS);
export const fetchLoginFailure = createAction(FETCH_LOGIN_FAILURE);

export const fetchLoginEpic = (action, store) =>
  action.ofType(FETCH_LOGIN_REQUEST)
    .mergeMap(() => {
      return axios.post(`${COMMON_APP.HOST_API}${API.LOGIN}`, store.getState().loginReq)
        .then(res => {
          if (res.data.success) {
            COMMON_APP.setCookie(CONSTANTS._USER_LOGIN_, JSON.stringify(res.data.data))
            return fetchLoginSuccess(res.data.data);
          }
          else {
            COMMON_APP.deleteCookie(CONSTANTS._USER_LOGIN_)
            return fetchLoginFailure(null)
          }
        })
        .catch(error => {
          COMMON_APP.deleteCookie(CONSTANTS._USER_LOGIN_)
          return fetchLoginFailure(null)
        })
    });

export function requestLoginReducer(loginReq = {}, action) {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return action.payload;
    default:
      return loginReq;
  }
}

export function fetchLoginReducer(loginRes = {}, action) {
  switch (action.type) {
    case FETCH_LOGIN_SUCCESS:
      return action.payload;
    case FETCH_LOGIN_FAILURE:
      return action.payload;
    default:
      return loginRes;
  }
}
