/*
 * @Author: w444555888 w444555888@yahoo.com.tw
 * @Date: 2024-02-28 19:59:23
 * @LastEditors: w444555888 w444555888@yahoo.com.tw
 * @LastEditTime: 2024-02-28 21:09:20
 * @FilePath: \vue3\src\router.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// router.js
import { createRouter, createWebHistory } from 'vue-router'
import TodoList from './TodoList.vue'
import TodoDetail from './TodoDetail.vue'


const routes = [
    {
        path: '/',
        name: 'TodoList',
        component: TodoList,

    },
    {
        path: '/todo/:index',
        name: 'TodoDetail',
        component: TodoDetail,
        props: true,
        beforeEnter: (to, from, next) => {
            const index = to.params.index
            to.props = { index }
            next()
        }
    },
]



const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router