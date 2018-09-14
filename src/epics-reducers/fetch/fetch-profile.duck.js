import {createAction} from 'redux-actions';
import axios from 'axios';
import {Observable} from 'rxjs';

import {COMMON_APP} from "../../common/common_app";
import {CONSTANTS} from "../../common/constants";
import {API} from "../../common/api";

export const FETCH_PROFILE_REQUEST = 'FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const fetchProfileRequest = createAction(FETCH_PROFILE_REQUEST);
export const fetchProfileSuccess = createAction(FETCH_PROFILE_SUCCESS);
export const fetchProfileFailure = createAction(FETCH_PROFILE_FAILURE);

export const fetchProfileEpic = (action, store) =>
  action.ofType(FETCH_PROFILE_REQUEST)
    .mergeMap(() => {
      let data = store.getState().profileReq.data
      let method = store.getState().profileReq.method
      let url = method === 'GET' ? // only get or put
        `${COMMON_APP.HOST_API}${API.USER_USERNAME}${'/'}${data.username}` :
        `${COMMON_APP.HOST_API}${API.USER_USERNAME}${'/'}${data.username}`
      return axios({
        method: method,
        url: url,
        data: data
      })
        .then(res => {
          if (res.data.success) {
            res.data.data.method = method
            return fetchProfileSuccess(res.data.data);
          }
          else {
            return fetchProfileFailure(null)
          }
        })
        .catch(error => {
          return fetchProfileFailure(null)
        })
    });


export function requestProfileReducer(profileReq = {}, action) {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return action.payload;
    default:
      return profileReq;
  }
}

export function fetchProfileReducer(profileRes = {}, action) {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
      return action.payload;
    case FETCH_PROFILE_FAILURE:
      return action.payload;
    default:
      return profileRes;
  }
}
