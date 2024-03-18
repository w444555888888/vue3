// i18n.js
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            titleFirst: 'Create a ToDoList',
            titleSecond: 'TO DO LIST',
            searchButton: 'Add ToDoList',
            delete: 'delete',
            detail: 'detail',
            undone: 'undone',
            done: 'done',
            postBoard: 'Customer service message board',
        },
        zh: {
            titleFirst: '創建待辦事項',
            titleSecond: '待辦記事本',
            searchButton: '新增待辦事項',
            delete: '刪除項目',
            detail: '詳情',
            undone: '待辦',
            done: '已完成',
            postBoard: '客服留言板',

        }
    },

})


export default i18n