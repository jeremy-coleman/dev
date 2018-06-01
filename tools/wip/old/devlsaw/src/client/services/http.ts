import axios from 'axios'
import {Observable} from 'rxjs';
import configs from './configs'

const setHeaders = () => {
    axios.defaults.baseURL = `${configs.api.url}/${configs.apiVersion}`;
    axios.defaults.headers.common['Authorization'] = getJWTToken();
    axios.defaults.headers.post['Content-Type'] = 'application/json';
};


const request = (options) => {
    setHeaders();
    const onSuccess = (response) => {return response.data};
    const onError = (response) => {return Promise.reject(response)};
    return Observable.fromPromise(axios.request(options).then(onSuccess).catch(onError));
};

export const get = (url, params) => {
    return request({
        url: url,
        method: 'get',
        params: params
    });
};

export const post = (url, data) => {
    return request({
        url: url,
        method: 'post',
        data: data
    });
};

export const getJWTToken = () => {
    return localStorage.getItem('JWT');
};

