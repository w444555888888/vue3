import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App);


// app.config.devtools = true;
// vuex
// app.use(store);

// Pinia
app.use( createPinia())
// element-plus
app.use(ElementPlus)
app.use(i18n)
app.use(router);
app.mount('#app');