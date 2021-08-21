import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Planner from '../views/planner/Planner.vue'
import RouteListing from '../views/planner/RouteListing.vue'
import RoutePlanner from '../views/planner/RoutePlanner.vue'
import Places from '../views/planner/Places.vue'
import Vehicles from '../views/planner/Vehicles.vue'
import Drivers from '../views/planner/Drivers.vue'

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
    redirect: '/planner/routes',
    children: [
      {
        path: '/planner/routes',
        component: RouteListing,
      },
      {
        path: 'routes/edit/:id',
        component: RoutePlanner
      },
      {
        path: 'routes/new',
        component: RoutePlanner
      },
      {
        path: '/planner/places',
        name: 'Places',
        component: Places
      },
      {
        path: '/planner/vehicles',
        name: 'Vehicles',
        component: Vehicles
      },
      {
        path: '/planner/drivers',
        name: 'Drivers',
        component: Drivers
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
