import Vue from 'vue'
import Doh1 from '@/components/Doh1'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/doh1',
      name: 'doh1',
      component: Doh1
    }
  ]
})
