import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import {createEpicMiddleware} from 'redux-observable'
import rootReducer from './epics-reducers/rootReducer'
import rootEpic from './epics-reducers/rootEpic'
import {fetchToast, fetchWait} from "./epics-reducers/fetch/fetch-toast.duck";
import axios from 'axios'
import Main from './views/Main/index'
// Import Main styles for this application
import './scss/style.scss'

const epicMiddleware = createEpicMiddleware(rootEpic);

const initialState = {
  //global variable
};
let store = createStore(rootReducer, initialState, applyMiddleware(epicMiddleware))
let countApiRequest = 0;
let countApiResponse = 0;
axios.interceptors.request.use(function (config) {
  countApiRequest++;
  //store.dispatch(fetchWait(CONSTANTS.SHOW))
  config.headers['Authorization'] = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNzBlZTE3NjhmM2JmZTIzMDMwMDlkOSIsImlhdCI6MTUzNjU4NDMwMywiZXhwIjoxNTM3NDQ4MzAzfQ.K8ixor6v9tsZt1fm4xH30-oss1KtLguEqi6wpNFTjv4'
  config.timeout = 20000;
  config.withCredentials =  false;
  return config;
}, function (error) {
  return Promise.reject(error);
})
axios.interceptors.response.use(res => {
  countApiResponse++
  if (countApiRequest === countApiResponse) {
    //store.dispatch(fetchWait(CONSTANTS.HIDE))
  }
  return res
}, error => {
  /*if (error.response.status !== 200) {
    store.dispatch(fetchToast({success: false, method: error.response.config.method}))
  }*/
  return Promise.reject(error)
})

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}

export default App;
