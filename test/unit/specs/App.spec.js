import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from '@/router/routes'
import App from '@/App'

describe('App.vue', () => {
  it('should have 2 navigation links', () => {
    Vue.use(VueRouter)
    const Constructor = Vue.extend(App)
    const router = new VueRouter({ routes: Routes })
    const vm = new Constructor({ router: router }).$mount()
    expect(vm.$el.querySelectorAll('.nav-item')).to.have.lengthOf(2)
  })

  it('should initialize with an empty array of bingo numbers', () => {
    Vue.use(VueRouter)
    const Constructor = Vue.extend(App)
    const router = new VueRouter({ routes: Routes })
    const vm = new Constructor({ router: router }).$mount()
    expect(vm.bingoNumbers).to.be.an.instanceOf(Array)
    expect(vm.bingoNumbers).to.have.lengthOf(0)
  })

  it('should update bingo numbers', () => {
    Vue.use(VueRouter)
    const Constructor = Vue.extend(App)
    const router = new VueRouter({ routes: Routes })
    const vm = new Constructor({ router: router }).$mount()
    const value = 'B2'
    vm.numberGenerated(value)
    expect(vm.bingoNumbers).to.be.an.instanceOf(Array)
    expect(vm.bingoNumbers).to.have.lengthOf(1)
    expect(vm.bingoNumbers[0]).to.equal(value)
  })
})
