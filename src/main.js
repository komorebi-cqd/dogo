import { createApp } from 'vue'
import App from './App.vue'
import i18n from './language/i18n'
import ElementPlus from 'element-plus'
import router from './router'
import store from './store';
store.dispatch("subscribeChain");

createApp(App).use(i18n).use(router).use(ElementPlus).use(store).mount('#app')
