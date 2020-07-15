import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: () => import('../views/Home.vue'),
      nav: () => import('../components/Nav')
    }
  },
  {
    path: '/users',
    name: 'Users',
    components: {
      default: () => import('../views/Users.vue'),
      nav: () => import('../components/Nav')
    }
  },
  {
    path: '/users/:page',
    name: 'users-paging',
    components: {
      default: () => import('../views/Users.vue'),
      nav: () => import('../components/Nav')
    }
  },
  {
    path: '/users/:user',
    name: 'User-single',
    components: {
      default: () => import('../views/User.vue'),
      nav: () => import('../components/Nav')
    },
    props: {
      default: true,
      nav: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
