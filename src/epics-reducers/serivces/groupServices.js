import axios from 'axios';
import {CONSTANTS} from '../../common/constants';
import {RESOURCE} from '../../common/resource';
import {COMMON_APP} from '../../common/common_app';
import {API} from '../../common/api';
import {URL} from "../../common/url";

function getListGroups(value) {
  return axios.get(`${COMMON_APP.HOST_API}${API.GROUPS}`).then(res => {
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

function createGroup(data) {
  return axios.post(`${COMMON_APP.HOST_API}${API.GROUPS}`, data).then(res => {
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

export {getListGroups, createGroup}