import axios from 'axios';

// 确定API基础URL
const getBaseUrl = () => {
  // 在生产环境中使用相对路径，这样会自动使用当前域名
  if (import.meta.env.PROD) {
    return '/api';
  }
  // 在开发环境中使用完整URL
  return 'http://localhost:3001/api';
};

// 创建axios实例
const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    const errorMessage = error.response?.data?.error?.message || '服务器错误';
    console.error('API错误:', errorMessage);
    return Promise.reject(error);
  }
);

export default api;