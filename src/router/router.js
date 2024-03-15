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