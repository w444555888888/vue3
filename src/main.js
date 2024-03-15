/*
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-02-28 20:34:52
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-03-10 23:18:14
 * @FilePath: \vue3\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// mian.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import i18n from './i18n'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App);


// app.config.devtools = true;
// vuex
// app.use(store);


// Pinia
// 持久化piniaPluginPersistedstate
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);


// element-plus
app.use(ElementPlus)
app.use(i18n)
app.use(router)
app.mount('#app')