import Vue from 'vue'
import BingoNumbers from '@/components/BingoNumbers'

describe('BingoNumbers.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(BingoNumbers)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#bingo-number').textContent)
      .to.be.a('string')
  })
})
