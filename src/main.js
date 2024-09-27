import App from './App'
import {createSSRApp} from 'vue';
import * as Pinia from 'pinia';
import share from './utils/share';

export function createApp() {
    const app = createSSRApp(App);
    app.use(Pinia.createPinia());
    app.mixin(share)
    return {
        app,
        Pinia,
    };
}