import Vue from 'vue'
import NumberValidator from '@/components/NumberValidator'

describe('NumberValidator.vue', () => {
  it('should have a text box', () => {
    const Constructor = Vue.extend(NumberValidator)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#bingo-number')).to.exist
  })

  it('should not be valid or invalid with no value', () => {
    const Constructor = Vue.extend(NumberValidator)
    const vm = new Constructor().$mount()
    expect(vm.validNumber).to.be.false
    expect(vm.invalidNumber).to.be.false
    expect(vm.normalizedLetter).to.be.null
  })

  it('should not be valid or invalid with only a letter', () => {
    const Constructor = Vue.extend(NumberValidator)
    const vm = new Constructor().$mount()
    vm.bingoNumberToValidate = 'B'
    expect(vm.validNumber).to.be.false
    expect(vm.invalidNumber).to.be.false
  })

  it('should parse capitalized values', () => {
    const Constructor = Vue.extend(NumberValidator)
    const vm = new Constructor().$mount()
    vm.bingoNumberToValidate = 'B1'
    expect(vm.letterFromBingoNumber).to.equal('B')
    expect(vm.numberFromBingoNumber).to.equal(1)
  })

  it('should parse lower-cased values', () => {
    const Constructor = Vue.extend(NumberValidator)
    const vm = new Constructor().$mount()
    vm.bingoNumberToValidate = 'b2'
    expect(vm.normalizedLetter).to.equal('B')
    expect(vm.numberFromBingoNumber).to.equal(2)
  })

  it('should have B, I, N, G, O in the default list', () => {
    const Constructor = Vue.extend(NumberValidator)
    const vm = new Constructor().$mount()
    const lettersToCheck = ['B', 'I', 'N', 'G', 'O']
    for (let i = 0; i < lettersToCheck.length; i++) {
      vm.bingoNumberToValidate = lettersToCheck[i]
      expect(vm.isValidLetter).to.be.true
    }
  })

  it('should not be a valid letter if it is not in the list', () => {
    const Constructor = Vue.extend(NumberValidator)
    const vm = new Constructor().$mount()
    vm.bingoNumberToValidate = 'Z'
    expect(vm.isValidLetter).to.be.false
  })

  it('should be valid for a valid letter and number', () => {
    const Constructor = Vue.extend(NumberValidator)
    const vm = new Constructor({ propsData: { bingoNumbers: ['B1', 'B2'] } }).$mount()
    vm.bingoNumberToValidate = 'B1'
    expect(vm.validNumber).to.be.true
  })

  it('should be invalid for a bingo number not in the list', () => {
    const Constructor = Vue.extend(NumberValidator)
    const vm = new Constructor({ propsData: { bingoNumbers: ['B1', 'B2'] } }).$mount()
    vm.bingoNumberToValidate = 'B3'
    expect(vm.validNumber).to.be.false
    expect(vm.invalidNumber).to.be.true
  })

  it('should be valid for a valid letter and number with wrong casing', () => {
    const Constructor = Vue.extend(NumberValidator)
    const vm = new Constructor({ propsData: { bingoNumbers: ['B1', 'B2'] } }).$mount()
    vm.bingoNumberToValidate = 'b1'
    expect(vm.validNumber).to.be.true
  })

  it('should be valid for a valid letter and number with spaces between', () => {
    const Constructor = Vue.extend(NumberValidator)
    const vm = new Constructor({ propsData: { bingoNumbers: ['B1', 'B2'] } }).$mount()
    vm.bingoNumberToValidate = 'B 1'
    expect(vm.validNumber).to.be.true
  })

  it('should be invalid for a bingo number contained within a valid value', () => {
    const Constructor = Vue.extend(NumberValidator)
    const vm = new Constructor({ propsData: { bingoNumbers: ['B11', 'B2'] } }).$mount()
    vm.bingoNumberToValidate = 'B1'
    expect(vm.validNumber).to.be.false
  })
})
