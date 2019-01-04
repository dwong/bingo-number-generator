import Vue from 'vue'
import Router from 'vue-router'
import BingoNumbers from '@/components/BingoNumbers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BingoNumbers',
      component: BingoNumbers
    }
  ]
})
