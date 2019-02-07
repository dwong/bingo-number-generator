// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import VueAnalytics from 'vue-analytics'
import Meta from 'vue-meta'

Vue.use(Meta)

Vue.use(VueAnalytics, {
  id: 'UA-132460060-1',
  router,
  debug: {
    enabled: process.env.NODE_ENV !== 'production'
  },
  commands: {
    trackGenerate () {
      this.$ga.event('User Action', 'Click', 'Generate', 1)
    },
    trackNewSession () {
      this.$ga.event('User Action', 'Click', 'New Session', 1)
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
