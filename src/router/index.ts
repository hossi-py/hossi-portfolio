import MainView from '@/views/MainView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import customRoutes from './customRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...(customRoutes as RouteRecordRaw[]),
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
  ],
})

export default router
