import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { setupCalendar, Calendar, DatePicker} from 'v-calendar';
import 'v-calendar/style.css';
const app = createApp(App);


// app.config.devtools = true;
// vuex
// app.use(store);

// 日曆 V-Calendar
app.use(setupCalendar, {})
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)



// Pinia
app.use( createPinia())
// element-plus
app.use(ElementPlus)
app.use(i18n)
app.use(router);
app.mount('#app');