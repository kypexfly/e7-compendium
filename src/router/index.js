import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mechanics',
      name: 'mechanics',
      component: () => import('../views/Mechanics.vue')
    },
    {
      path: '/search/hero',
      name: 'search-hero',
      component: () => import('../views/SearchHero.vue')
    },
    {
      path: '/dev-notes',
      name: 'DevNotes',
      component: () => import('../views/DevNotes.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
