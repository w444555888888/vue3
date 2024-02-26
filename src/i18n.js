// i18n.js
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            title: 'TO DO LIST'
        },
        zh: {
            title: '待辦記事本'
        }
    },

})


export default  i18n;