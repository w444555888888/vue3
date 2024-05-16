// i18n.js
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            titleFirst: 'Create New Item',
            searchButton: 'Add New Item',
            delete: 'delete',
            detail: 'detail',
            undone: 'undone',
            done: 'done',
            edit: 'deit',
            menu: 'menu',
            home: 'Home',

        },
        zh: {
            titleFirst: '創建項目',
            searchButton: '新增項目',
            delete: '刪除項目',
            detail: '詳情',
            undone: '待辦',
            done: '已完成',
            edit: '編輯',
            menu: '選單',
            home: '首頁',

        }
    },

})


export default i18n