import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pagamento',
    name: 'pagamento',
    component: function () {
      return import(/* webpackChunkName: "pagamento" */ '../views/PaymentView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Captura o userid enviado na URL (ex: /home?userid=re_xxx) e mantém salvo
// para ser usado como identificador do recebedor nas demais requisições.
router.beforeEach((to, from, next) => {
  if (to.query.userid) {
    store.dispatch('setUserId', to.query.userid)
  }
  next()
})

export default router
