import axios from 'axios';
import request from './request'

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getRestList = url => { return axios.get(url); };

export const getRestDetail = (url, id) => { return axios.get(`${url}${id}/`); };

export const addRest = (url, params) => { return axios.post(`${url}`, { params: params }); };

export const editRest = (url, id, params) => { return axios.patch(`${url}${id}/`, { params: params }); };

export const removeRest = (url, id) => { return axios.delete(`${url}${id}/`); };

export function http_request (url, method, data,response_type) {
    return new Promise((resolve, reject) => {
      request({
        url: url,
        method: method,
        data: data,
        responseType: response_type
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
