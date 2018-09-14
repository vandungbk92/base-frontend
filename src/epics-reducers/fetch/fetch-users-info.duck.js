import {createAction} from 'redux-actions';
import axios from 'axios';
import {Observable} from 'rxjs';

import {COMMON_APP} from '../../common/common_app'
import {CONSTANTS} from '../../common/constants'
import {RESOURCE} from '../../common/resource'
import {API} from '../../common/api'

export const FETCH_USERS_INFO_REQUEST = 'FETCH_USERS_INFO_REQUEST';
export const FETCH_USERS_INFO_SUCCESS = 'FETCH_USERS_INFO_SUCCESS';
export const FETCH_USERS_INFO_FAILURE = 'FETCH_USERS_INFO_FAILURE';

export const fetchUsersInfoRequest = createAction(FETCH_USERS_INFO_REQUEST);
export const fetchUsersInfoSuccess = createAction(FETCH_USERS_INFO_SUCCESS);
export const fetchUsersInfoFailure = createAction(FETCH_USERS_INFO_FAILURE);

export const fetchUsersInfoEpic = (action, store) =>
  action.ofType(FETCH_USERS_INFO_REQUEST)
    .mergeMap(() => {
      return axios.get(`${COMMON_APP.HOST_API}${API.USERS_INFO}`/*, {
          proxy: {
            host: '127.0.0.1',
            port: 8080
          }
        }*/)
        .then(res => {
          if (res.data) {
            return fetchUsersInfoSuccess(res.data);
          }
          else {
            return fetchUsersInfoFailure(null)
          }
        })
        .catch(error => {
          console.log(error)
          return fetchUsersInfoFailure(null)
        })
    });

/*export function requestUserInfoReducer(userInfoReq = {}, action) {
  switch (action.type) {
    case FETCH_USERS_INFO_REQUEST:
      return action.payload;
    default:
      return userInfoReq;
  }
}*/

export function fetchUsersInfoReducer(usersInfoRes = {}, action) {
  switch (action.type) {
    case FETCH_USERS_INFO_SUCCESS:
      return action.payload;
    case FETCH_USERS_INFO_FAILURE:
      return action.payload;
    default:
      return usersInfoRes;
  }
}
