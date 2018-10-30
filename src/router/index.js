import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import listing from '@/components/listing'
Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/favourite',
      name: 'listing',
      component: listing
    }
  ]
})
