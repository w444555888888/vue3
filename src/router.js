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
        path: '/todo/:index/:someRouter',
        name: 'TodoDetail',
        component: TodoDetail,
        props: true,
        beforeEnter: (to, from, next) => {
            const index = to.params.index;
            to.props = { index };
            next();
          }
    },
];



const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router