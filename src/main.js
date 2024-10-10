import App from './App'
import {createSSRApp} from 'vue';
import * as Pinia from 'pinia';
import share from './utils/share';
import axios from '@/utils/axiosAdapter.js';
export function createApp() {
    const app = createSSRApp(App);
    app.use(Pinia.createPinia());
    app.mixin(share)
	// 将 axios 添加到 Vue 原型中
	app.config.globalProperties.$axios = axios;
    return {
        app,
        Pinia,
    };
}