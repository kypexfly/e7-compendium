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
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchHero.vue')
    },
    // Resources

    // Tools
    {
      path: '/tools/dev-notes',
      name: 'DevNotes',
      component: () => import('../views/Tools/DevNotes.vue')
    },
    // {
    //   path: '/tools/calculator',
    //   name: 'Calculator',
    //   component: () => import('../views/Tools/Calculator.vue')
    // },
    // All routes that doesn't match goes to 404
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
