import axios from 'axios';
import {CONSTANTS} from '../../common/constants';
import {RESOURCE} from '../../common/resource';
import {COMMON_APP} from '../../common/common_app';
import {API} from '../../common/api';
import {URL} from "../../common/url";

function getListUsers(value) {
  return axios.get(`${COMMON_APP.HOST_API}${API.USERS}`).then(res => {
    if (res.data) {
      return res.data;
    }
    else {
      return null
    }
  })
    .catch(error => {
      return null
    });
}

function createUser(data){
  return axios.post(`${COMMON_APP.HOST_API}${API.USERS}`, data).then(res => {
    if (res.data) {
      return res.data;
    }
    else {
      return null
    }
  })
    .catch(error => {
      return null
    });
}

export {getListUsers, createUser}