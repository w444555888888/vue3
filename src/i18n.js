// i18n.js
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            titleFirst: 'Create a ToDo',
            titleSecond: 'TO DO LIST',
            searchButton: 'Add ToDoList',
            delete: 'delete',
            detail: 'detail',
            undone: 'undone',
            done: 'done',
            postBoard: 'post message board',
        },
        zh: {
            titleFirst: '創建待辦記事本',
            titleSecond: '待辦記事本',
            searchButton: '新增待辦事項',
            delete: '刪除項目',
            detail: '詳情',
            undone: '待辦',
            done: '已完成',
            postBoard: '發送留言板',

        }
    },

})


export default i18n