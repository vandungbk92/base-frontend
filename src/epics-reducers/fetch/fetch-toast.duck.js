import {createAction} from 'redux-actions';

export const FETCH_TOAST = 'FETCH_TOAST';

export const fetchToast = createAction(FETCH_TOAST);

export function fetchToastReducer(notify = {}, action) {
  switch (action.type) {
    case FETCH_TOAST:
      return action.payload;
    default:
      return notify;
  }
}


export const FETCH_WAIT = 'FETCH_WAIT';

export const fetchWait = createAction(FETCH_WAIT);

export function fetchWaitReducer(wait = {}, action) {
  switch (action.type) {
    case FETCH_WAIT:
      return action.payload;
    default:
      return wait;
  }
}