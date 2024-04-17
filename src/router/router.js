// router.js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import TodoList from '../components/TodoList.vue'
import TodoDetail from '../components/TodoDetail.vue'
import Cropper from '../components/Cropper.vue'
import Child from '../components/child.vue'
import Child2 from '../components/child2.vue'
import Login from '../components/Login.vue'


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
        children: [
            {
                path: 'children',
                name: 'children',
                components: {
                    A: Child,
                    B: Child2,

                }

            }
        ]
    },
    {
        path: '/todo/cropper',
        name: 'Cropper',
        component: Cropper,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]



const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    const authenticate = localStorage.getItem('token'); // 检查本地存储是否有 token

    if (!authenticate && to.name !== 'Login') {
        next('/login');
    } else if (authenticate && to.name === 'Login') {
        next('/');
    } else {
        next();
    }

});

export default router