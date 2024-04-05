// router.js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import TodoList from '../components/TodoList.vue'
import TodoDetail from '../components/TodoDetail.vue'
import Cropper from '../components/Cropper.vue'
import Child from '../components/child.vue'
import Child2 from '../components/child2.vue'


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
]



const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router