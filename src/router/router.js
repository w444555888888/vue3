// router.js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import TodoList from '../components/TodoList.vue'
import TodoDetail from '../components/TodoDetail.vue'
import Cropper from '../components/Cropper.vue'
import Child from '../components/child.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'


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
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]



const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    const authenticate = localStorage.getItem('token'); //localStorage token

    if (!authenticate && to.name !== 'Login' && to.name !== 'Register') {
        next('/login');
    } else if (authenticate && (to.name == 'Login' || to.name == 'Register')) {
        next('/');
    } else {
        next();
    }
});

export default router