import axios from "axios";
import { toast } from '@/composables/utils'
import { getToken } from '@/composables/auth'

const instance = axios.create({
	baseURL: '/api',
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
	// 往header里面存token
	const token = getToken()
	if (token) {
		config.headers["token"] = token
	}
	return config;
}, function (error) {
	return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
	return response.data.data;
}, function (error) {
	toast(error.response.data.msg || '请求失败', 'error')
	return Promise.reject(error);
});

export default instance