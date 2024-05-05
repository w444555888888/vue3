/*
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-02-28 20:34:52
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-04-25 00:55:50
 * @FilePath: \vue3\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import i18n from './i18n'
import { createPinia } from 'pinia'
import store from './store/store.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueCropper from 'vue-cropper'
import 'vue-cropper/dist/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import eventBus from 'vue3-eventbus'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// eventbus掛載全局
app.use(eventBus)

app.use(VueVirtualScroller)


// vue的調適工具配置
app.config.devtools = true


// vuex
app.use(store)


// Pinia
// 持久化piniaPluginPersistedstate
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


// 剪裁圖片Cropper
app.use(VueCropper)
// element-plus
app.use(ElementPlus)
app.use(i18n)
app.use(router)
app.use(pinia).mount('#app')