import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

import login from './components/login.vue'
import register from './components/register'
import eltable from './components/eltable'
import eltable2 from './components/eltable2'
import show from './components/show'

const routes = [
  {path: '/login', component: login},
  {path: '/register', component: register},
  {path: '/show', component: eltable},
  {path: '/zixuan', component: eltable2},
  {path: '/:code(\\d+)', component: show},
  {path: '/logout'}
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
