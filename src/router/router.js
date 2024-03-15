// router.js
import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../components/TodoList.vue'
import TodoDetail from '../components/TodoDetail.vue'


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
        props: true
    },
];



const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router