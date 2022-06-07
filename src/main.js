import { createApp } from 'vue'
import App from './App.vue'
import i18n from './language/i18n'
import router from './router'
import ElementPlus from 'element-plus'
import {wallet} from './abi'
import 'element-plus/dist/index.css'
import store from './store';

const app = createApp(App)
app.config.globalProperties.wallet = wallet
app.use(i18n).use(ElementPlus).use(router).use(store).mount('#app')

store.dispatch("subscribeChain");

