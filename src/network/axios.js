"use strict";
import axios from "axios";
import {
  ElMessage
} from 'element-plus'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (res) {
    // Do something with response data
    if (typeof res.data.data!== 'object') {
      ElMessage.error('服务端异常！'+JSON.stringify(res.data))
      return Promise.reject(res.data)
    }
    if (res.data.errcode != 0) {
      if (res.data.errmsg) ElMessage.error(res.data.errmsg+"请求失败")
      return Promise.reject(res.data)
    }

    return res.data.data
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);


export default _axios;