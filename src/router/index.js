import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'notes' }
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import(
      /*
        webpackChunkName: "notes-page",
        webpackPreload: true
      */
      '@/views/Notes.vue'
    )
  },
  {
    path: '/reminders',
    name: 'reminders',
    component: () => import(
      /*
        webpackChunkName: "reminders-page",
        webpackPrefetch: true
      */
     '@/views/Reminders.vue'
    )
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
