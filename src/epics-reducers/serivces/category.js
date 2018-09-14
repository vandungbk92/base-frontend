import axios from 'axios';
import {CONSTANTS} from '../../common/constants';
import {RESOURCE} from '../../common/resource';
import {COMMON_APP} from '../../common/common_app';
import {API} from '../../common/api';

function getTopServices() {
  return axios.get(`${COMMON_APP.HOST_API}`);
}

function getAllCategories() {
  return axios.get(`${COMMON_APP.HOST_API}`);
}

function getDynamicServiceFields(id) {
  return axios.get(`${COMMON_APP.HOST_API}`, {
    params: {
      serviceId: id
    }
  });
}

export {getTopServices, getAllCategories, getDynamicServiceFields}