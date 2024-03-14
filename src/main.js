/*
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-02-28 20:34:52
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-03-10 23:18:14
 * @FilePath: \vue3\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import { setupCalendar, Calendar, DatePicker} from 'v-calendar';
// import 'v-calendar/style.css';
const app = createApp(App);


// app.config.devtools = true;
// vuex
// app.use(store);

// 日曆 V-Calendar
// app.use(setupCalendar, {})
// app.component('VCalendar', Calendar)
// app.component('VDatePicker', DatePicker)



// Pinia
// 持久化piniaPluginPersistedstate
const pinia = createPinia()
app.use(pinia.use(piniaPluginPersistedstate))
// element-plus
app.use(ElementPlus)
app.use(i18n)
app.use(router)
app.mount('#app')