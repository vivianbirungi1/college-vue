//importing Vue,router and App.vue
import Vue from 'vue'
import App from './App.vue'
import router from './router'

//importing BootstrapVue and bootstrap css files to project
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//importing AOS library animations
import AOS from 'aos'
import 'aos/dist/aos.css'

//installing BootstrapVue within the app
Vue.use(BootstrapVue)

//displays the message of production mode.
Vue.config.productionTip = false

//initializing router, AOS library and App.vue within new Vue
new Vue({
  router,
  created () {
   AOS.init()
 }, //initializing aos
  render: h => h(App),
}).$mount('#app')
