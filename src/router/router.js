// router.js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/components/Index.vue'),

    },
    {
        path: '/TodoList',
        name: 'TodoList',
        component: () => import('@/components/TodoList.vue'),

    },
    {
        path: '/todo/:index',
        name: 'TodoDetail',
        component: () => import('@/components/TodoDetail.vue'),
        props: true,
        children: [
            {
                path: 'children',
                name: 'children',
                components: {

                }

            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/components/Login.vue')
    },
    {
        path: '/scroll',
        name: 'Scroll',
        component: () => import('@/components/Scroll.vue')
    }
]



const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


router.beforeEach((to, from, next) => {
    const authenticate = localStorage.getItem('token') //localStorage token

    if (!authenticate && to.name !== 'Login') {
        next('/login')
    } else if (authenticate && (to.name == 'Login')) {
        next('/')
    } else {
        next()
    }
})

export default router