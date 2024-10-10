import axios from "axios";
import {useCounterStore} from '@/stores/counter.js'
import {useToast} from 'wot-design-uni';

const toast = useToast()
// 获取 counter store 的实例
const counterStore = useCounterStore()

// 创建 axios实例，将来对创建出来的实例，进行自定义配置
const instance = axios.create({
    baseURL: 'http://1d905bee.r25.cpolar.top',
    // 请求超时设置
    timeout: 10000
});

//自定义配置
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 获取 store 中的用户信息token
    const token = counterStore.user?.token
    // 如果token存在，则添加到请求头中
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const res = response.data;
    // console.log(res);

    return res;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response === 401) {
        uni.navigateTo({
            url: '/pages/login/login'
        });
        toast.show("请先登录")
    }
    return Promise.reject(error);
});

// 导出配置好的实例
export default instance