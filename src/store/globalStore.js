import { defineStore } from 'pinia'

// 強制重新渲染路由
export const useGlobalStore = defineStore({
  id: 'global',
  state: () => ({
    routeKey: 0
  })
})
