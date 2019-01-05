import Vue from 'vue'
import BingoNumbers from '@/components/BingoNumbers'

describe('BingoNumbers.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(BingoNumbers)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#bingo-number').textContent)
      .to.be.a('string')
  })

  it('should generate a non-blank value', () => {
    const Constructor = Vue.extend(BingoNumbers)
    const vm = new Constructor().$mount()
    const bingoNumber = vm.generateBingoNumber()
    expect(bingoNumber.length).to.be.greaterThan(1)
  })

  it('should display a valid value after clicking the button', () => {
    const Constructor = Vue.extend(BingoNumbers)
    const vm = new Constructor().$mount()
    const btn = vm.$el.querySelector('#generate-bingo-button')
    btn.click()
    vm._watcher.run()
    const bingoNumber = vm.bingoNumber
    expect(bingoNumber.length).to.be.greaterThan(1)
    expect(bingoNumber.length).to.be.lessThan(5)
    expect(vm.$el.querySelector('#bingo-number').textContent).to.equal(bingoNumber)
  })
})
