import {createAction} from 'redux-actions';
import axios from 'axios';
import {Observable} from 'rxjs';

import {COMMON_APP} from "../../common/common_app";
import {CONSTANTS} from "../../common/constants";
import {API} from "../../common/api";

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsRequest = createAction(FETCH_PRODUCTS_REQUEST);
export const fetchProductsSuccess = createAction(FETCH_PRODUCTS_SUCCESS);
export const fetchProductsFailure = createAction(FETCH_PRODUCTS_FAILURE);

export const fetchProductsEpic = (action, store) =>
  action.ofType(FETCH_PRODUCTS_REQUEST)
    .mergeMap(() => {
      let data = store.getState().productsReq.data
      let method = store.getState().productsReq.method
      let url = method === CONSTANTS.GET ? // only get or delete or put
        `${COMMON_APP.HOST_API}${API.PRODUCT}${'?start='}${data.start}${'&end='}${data.end}` :
        `${COMMON_APP.HOST_API}${API.PRODUCT}${data._ids}`
      if (method === CONSTANTS.DELETE) data = {}
      return axios({
        method: method,
        url: url,
        data: data
      })
        .then(res => {
          if (res.data.success) {
            res.data.data.method = method
            return fetchProductsSuccess(res.data.data);
          }
          else {
            return fetchProductsFailure(null)
          }
        })
        .catch(error => {
          return fetchProductsFailure(null)
        })
    });


export function requestProductsReducer(productsReq = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return action.payload;
    default:
      return productsReq;
  }
}

export function fetchProductsReducer(productsRes = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return action.payload;
    case FETCH_PRODUCTS_FAILURE:
      return action.payload;
    default:
      return productsRes;
  }
}


//////////////////SINGLE PROFUCT
export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const fetchProductRequest = createAction(FETCH_PRODUCT_REQUEST);
export const fetchProductSuccess = createAction(FETCH_PRODUCT_SUCCESS);
export const fetchProductFailure = createAction(FETCH_PRODUCT_FAILURE);

export const fetchProductEpic = (action, store) =>
  action.ofType(FETCH_PRODUCT_REQUEST)
    .mergeMap(() => {
      let data = store.getState().productReq.data
      let method = store.getState().productReq.method
      let url = method === CONSTANTS.POST ? // only get or delete
        `${COMMON_APP.HOST_API}${API.PRODUCT}${'/'}` :
        `${COMMON_APP.HOST_API}${API.PRODUCT}${'/'}${data._id}`
      return axios({
        method: method,
        url: url,
        data: data
      })
        .then(res => {
          if (res.data.success) {
            res.data.data.method = method
            return fetchProductSuccess(res.data.data);
          }
          else {
            return fetchProductFailure(null)
          }
        })
        .catch(error => {
          return fetchProductFailure(null)
        })
    });


export function requestProductReducer(productReq = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return action.payload;
    default:
      return productReq;
  }
}

export function fetchProductReducer(productRes = {}, action) {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return action.payload;
    case FETCH_PRODUCT_FAILURE:
      return action.payload;
    default:
      return productRes;
  }
}
