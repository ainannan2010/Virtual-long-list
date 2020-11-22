import axios from 'axios'

// 添加实例方法
const baseOptions = {
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  cache: false // 禁用缓存
};

const request = axios.create(baseOptions);

const authInterceptor = config => {
  /** TODO: Add auth token */
  return config;
};

const requestErrorHandle = (error) => {
  console.log(error);
  return Promise.reject(error);
};

const responseErrorHandle = (error) => {
  console.log('***error-response***', error);
};

// request interceptor
request.interceptors.request.use(authInterceptor, requestErrorHandle);

// response interceptor
request.interceptors.response.use(
  response => {
    const { data, status } = response;
    if (status === 200) {
      return data;
    } else {
      responseErrorHandle(data);
      throw new Error(data.error);
    }
  },
  error => {
    const { response } = error;
    responseErrorHandle(response);
    const errData = (response && response.data) || {};
    return Promise.reject(errData || error);
  }
);

export { request };
