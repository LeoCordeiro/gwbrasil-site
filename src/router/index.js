import { createRouter, createWebHashHistory } from 'vue-router'
import TTHome from '@/pages/TTHome.vue'
import TTComoFunciona from '@/pages/TTComoFunciona.vue'
import TTSejaParceiro from '@/pages/TTSejaParceiro.vue'
import TTSolicitarOrcamento from '@/pages/TTSolicitarOrcamento.vue'
import TTSobre from '@/pages/TTSobre.vue'
import TTPoliticaPrivacidade from '@/pages/TTPoliticaPrivacidade.vue'
import TTPoliticaTermosDeUso from '@/pages/TTPoliticaTermosDeUso.vue'

const routes = [
  { path: '/', component: TTHome },
  { path: '/sobre', component: TTSobre },
  { path: '/como-funciona', component: TTComoFunciona },
  { path: '/parceiro', component: TTSejaParceiro },
  { path: '/solicitar', component: TTSolicitarOrcamento },
  { path: '/privacidade', component: TTPoliticaPrivacidade },
  { path: '/termos', component: TTPoliticaTermosDeUso },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

export default router
