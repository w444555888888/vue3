// i18n.js
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            titleFirst: 'Vehicle Information',
            searchButton: 'Add New Item',
            delete: 'delete',
            detail: 'detail',
            undone: 'undone',
            done: 'done',
            edit: 'deit',
            menu: 'menu',
            home: 'home',
            search: 'search',
            personalize: 'personalize',

        },
        zh: {
            titleFirst: '車輛資訊',
            searchButton: '新增車輛資訊',
            delete: '刪除項目',
            detail: '詳情',
            undone: '待辦',
            done: '已完成',
            edit: '編輯',
            menu: '選單',
            home: '首頁',
            search: '搜尋',
            personalize: '個人化',

        }
    },

})


export default i18n