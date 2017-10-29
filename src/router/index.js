import Vue from 'vue'
import Router from 'vue-router'
import { Home, Search } from '@/views'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
