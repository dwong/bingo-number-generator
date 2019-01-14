import Vue from 'vue'
import Router from 'vue-router'
import BingoNumbers from '@/components/BingoNumbers'
import NumberValidator from '@/components/NumberValidator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/generate',
      name: 'BingoNumbers',
      component: BingoNumbers
    },
    {
      path: '/validate',
      name: 'ValidateNumber',
      component: NumberValidator
      /*,
      props: {
        bingoNumbersParam: bingoNumbe
      }
      */
    }
  ]
})
