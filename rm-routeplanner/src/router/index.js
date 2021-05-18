import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Planner from '../views/planner/Planner.vue'
import Places from '../views/planner/Places.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/planner',
    name: 'Planner',
    component: Planner,
    children: [
    {
        path: '/planner/places',
        component: Places
    }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
