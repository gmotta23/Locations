// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD7D_7ju2TkNb9jcSp1wTVs6QyxwiJ9qsY',
    libraries: 'places'
  }
})