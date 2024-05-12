// i18n.js
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            titleFirst: 'Create New Item',
            titleSecond: 'New Item',
            searchButton: 'Add New Item',
            delete: 'delete',
            detail: 'detail',
            undone: 'undone',
            done: 'done',
            edit: 'deit',

        },
        zh: {
            titleFirst: '創建待辦事項',
            titleSecond: '待辦記事本',
            searchButton: '新增待辦事項',
            delete: '刪除項目',
            detail: '詳情',
            undone: '待辦',
            done: '已完成',
            edit: '編輯',

        }
    },

})


export default i18n