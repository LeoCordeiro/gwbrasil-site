<template>
  <div>
    <div class="page-header">
      <v-container style="max-width:1200px">
        <div class="page-label">Quem somos</div>
        <h1 class="page-title">Sobre a Turbo Track</h1>
        <p class="page-sub">Agenciamento de fretes B2B com tecnologia, rede e resultado</p>
      </v-container>
    </div>

    <section class="section-white">
      <v-container style="max-width:1200px">
        <div class="historia-grid">
          <div>
            <div class="page-label" style="color:#E8821A">Nossa história</div>
            <h2 class="block-title">De São Paulo para<br>todo o Brasil</h2>
            <div class="timeline">
              <div class="timeline-item" v-for="item in timeline" :key="item.ano">
                <div class="timeline-ano">{{ item.ano }}</div>
                <div>
                  <div class="timeline-title">{{ item.title }}</div>
                  <div class="timeline-desc">{{ item.desc }}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="about-text">Fundada em <strong>dezembro de 2021</strong>, a Turbo Track nasceu na Av. Paulista com um objetivo claro: tornar o agenciamento de fretes B2B simples, ágil e transparente.</p>
            <p class="about-text">Indústrias, distribuidores e atacadistas perdem tempo e dinheiro tentando negociar fretes com dezenas de transportadoras. A Turbo Track resolve isso: o cliente descreve a carga, nós analisamos, cotamos, contratamos e acompanhamos.</p>
            <p class="about-text">Atuamos com cargas intermunicipais e interestaduais em todo o Brasil, com foco em operações B2B corporativas que exigem confiabilidade e prazo.</p>
            <div class="stats-grid">
              <div class="stat-box" v-for="n in numeros" :key="n.value">
                <div class="stat-value">{{ n.value }}</div>
                <div class="stat-label">{{ n.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </section>

    <section class="section-gray">
      <v-container style="max-width:1200px">
        <div class="text-center mb-10">
          <div class="page-label" style="color:#E8821A; text-align:center">Nossa essência</div>
          <h2 class="block-title" style="text-align:center">O que nos move</h2>
        </div>
        <div class="valores-grid">
          <div class="valor-card" v-for="v in valores" :key="v.title">
            <div class="valor-icon"><v-icon size="24" color="#E8821A">{{ v.icon }}</v-icon></div>
            <h3 class="valor-title">{{ v.title }}</h3>
            <p class="valor-desc">{{ v.desc }}</p>
          </div>
        </div>
      </v-container>
    </section>

    <section class="section-dark-cta">
      <v-container style="max-width:900px; text-align:center">
        <h2 class="cta-title">Pronto para simplificar<br>sua logística?</h2>
        <div class="cta-actions">
          <router-link to="/solicitar" class="btn-orange">Cotar meu frete</router-link>
          <router-link to="/parceiro" class="btn-outline-white">Quero ser parceiro</router-link>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup>
const timeline = [
  { ano: '2021', title: 'Fundação', desc: 'A Turbo Track é fundada em dezembro, com sede na Av. Paulista, São Paulo.' },
  { ano: '2022', title: 'Estruturação da rede', desc: 'Montamos nossa rede de transportadoras parceiras para cargas intermunicipais e interestaduais.' },
  { ano: '2023', title: 'Crescimento B2B', desc: 'Passamos a atender indústrias, distribuidores e atacadistas com operações recorrentes.' },
  { ano: '2024', title: 'Plataforma digital', desc: 'Lançamos o site de briefing de carga para facilitar a contratação do agenciamento.' },
]
const numeros = [
  { value: 'SP', label: 'Sede em São Paulo' },
  { value: 'B2B', label: 'Foco corporativo' },
  { value: '24h', label: 'Proposta garantida' },
  { value: '100%', label: 'Operação coordenada' },
]
const valores = [
  { icon: 'mdi-shield-check-outline', title: 'Transparência', desc: 'Proposta clara, sem taxas escondidas ou surpresas no processo.' },
  { icon: 'mdi-lightning-bolt-outline', title: 'Agilidade', desc: 'Resposta em até 24h para qualquer demanda de frete corporativo.' },
  { icon: 'mdi-truck-check-outline', title: 'Confiabilidade', desc: 'Transportadoras rigorosamente selecionadas para garantir prazo e segurança.' },
  { icon: 'mdi-handshake-outline', title: 'Parceria', desc: 'Tratamos cada operação como se fosse nossa própria carga.' },
  { icon: 'mdi-map-marker-check-outline', title: 'Cobertura nacional', desc: 'Atendemos cargas intermunicipais e interestaduais em todo o Brasil.' },
  { icon: 'mdi-chart-line', title: 'Resultado', desc: 'Nosso sucesso é medido pela eficiência e economia gerada para nossos clientes.' },
]
</script>

<style scoped>
.page-header { background: #1B2B6B; padding: 36px 16px 28px; }
.page-label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #E8821A; margin-bottom: 8px; }
.page-title { font-size: clamp(28px,4vw,52px); font-weight: 800; color: #fff; letter-spacing: -0.03em; margin-bottom: 8px; line-height: 1.05; }
.page-sub { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.6; }
.section-white { padding: 56px 16px; background: #fff; }
.section-gray { padding: 56px 16px; background: #F8F8F8; }
.section-dark-cta { padding: 64px 16px; background: #1B2B6B; }
.block-title { font-size: clamp(24px,3vw,38px); font-weight: 800; color: #1B2B6B; letter-spacing: -0.02em; margin-bottom: 36px; line-height: 1.1; }
.historia-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px; }
.timeline { display: flex; flex-direction: column; gap: 0; }
.timeline-item { display: grid; grid-template-columns: 52px 1fr; gap: 16px; padding-bottom: 28px; position: relative; }
.timeline-item:not(:last-child)::before { content: ''; position: absolute; left: 22px; top: 26px; bottom: 0; width: 1px; background: #EBEBEB; }
.timeline-ano { font-size: 12px; font-weight: 800; color: #E8821A; padding-top: 2px; }
.timeline-title { font-size: 14px; font-weight: 700; color: #1B2B6B; margin-bottom: 4px; }
.timeline-desc { font-size: 13px; color: #888; line-height: 1.6; }
.about-text { font-size: 15px; color: #555; line-height: 1.8; margin-bottom: 16px; }
.about-text strong { color: #1B2B6B; }
.stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-top: 32px; padding-top: 32px; border-top: 1px solid #EBEBEB; }
.stat-box { text-align: center; padding: 18px 10px; background: #F8F8F8; border-radius: 12px; }
.stat-value { font-size: 24px; font-weight: 900; color: #1B2B6B; letter-spacing: -0.03em; }
.stat-box:first-child .stat-value { color: #E8821A; }
.stat-label { font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 0.07em; margin-top: 4px; }
.valores-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.valor-card { background: #fff; border: 1px solid #EBEBEB; border-radius: 16px; padding: 28px; transition: all 0.25s; }
.valor-card:hover { border-color: #E8821A; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
.valor-icon { width: 44px; height: 44px; background: #FFF4E8; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.valor-title { font-size: 16px; font-weight: 700; color: #1B2B6B; margin-bottom: 8px; }
.valor-desc { font-size: 13px; color: #888; line-height: 1.6; }
.cta-title { font-size: clamp(24px,3.5vw,40px); font-weight: 800; color: #fff; letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 36px; }
.cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.btn-orange { display: inline-flex; align-items: center; background: #E8821A; color: #fff; font-size: 15px; font-weight: 600; padding: 14px 28px; border-radius: 10px; text-decoration: none; transition: all 0.2s; }
.btn-orange:hover { background: #CF7015; transform: translateY(-2px); }
.btn-outline-white { display: inline-flex; align-items: center; border: 1px solid rgba(255,255,255,0.3); color: rgba(255,255,255,0.8); font-size: 15px; font-weight: 500; padding: 14px 28px; border-radius: 10px; text-decoration: none; transition: all 0.2s; }
.btn-outline-white:hover { border-color: #fff; color: #fff; }
@media (max-width: 960px) { .historia-grid { grid-template-columns: 1fr; gap: 40px; } .valores-grid { grid-template-columns: 1fr 1fr; } .stats-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .valores-grid { grid-template-columns: 1fr; } }
</style>
