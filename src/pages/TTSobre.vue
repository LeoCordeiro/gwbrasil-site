<template>
  <div>
    <div class="page-header">
      <v-container style="max-width:1200px">
        <div class="page-label">Quem somos</div>
        <h1 class="page-title">Sobre a GW Brasil Sul</h1>
        <p class="page-sub">Intermediacao de atacado de oleos, gorduras e insumos alimenticios B2B</p>
      </v-container>
    </div>

    <section class="section-white">
      <v-container style="max-width:1200px">
        <div class="historia-grid">
          <div>
            <div class="page-label" style="color:#E8821A">Nossa atuacao</div>
            <h2 class="block-title">De Camboriu para<br>todo o Brasil</h2>
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
            <p class="about-text">A <strong>GW Brasil Sul</strong> atua na intermediacao de atacado de oleos, gorduras e insumos alimenticios para industrias e distribuidores do Sul do Brasil.</p>
            <p class="about-text">Industrias, distribuidores e atacadistas perdem tempo e dinheiro tentando negociar diretamente com dezenas de fornecedores. A GW Brasil Sul resolve isso: o cliente descreve a necessidade, nos negociamos, selecionamos o fornecedor ideal e coordenamos todo o processo ate a entrega.</p>
            <p class="about-text">Atuamos com foco no Sul e Sudeste, onde se concentra a maior industria alimenticia do pais, com cobertura de fornecedores em todo o Brasil.</p>
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
          <div class="page-label" style="color:#E8821A; text-align:center">Nossa essencia</div>
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
        <h2 class="cta-title">Pronto para melhorar<br>o fornecimento de insumos?</h2>
        <div class="cta-actions">
          <router-link to="/solicitar" class="btn-orange">Solicitar cotacao</router-link>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup>
const timeline = [
  { ano: 'Origem', title: 'Fundacao', desc: 'A GW Brasil Sul e fundada em Camboriu, SC, com foco na intermediacao de insumos alimenticios para o mercado B2B.' },
  { ano: 'Rede', title: 'Estruturacao da rede', desc: 'Construimos relacionamentos solidos com os maiores atacadistas e fornecedores de insumos alimenticios do Brasil.' },
  { ano: 'Expansao', title: 'Crescimento B2B', desc: 'Passamos a atender industrias, distribuidores e operacoes de food service com fornecimento recorrente e condicoes exclusivas.' },
  { ano: 'Digital', title: 'Plataforma de cotacao', desc: 'Lancamos o site com formulario de cotacao para facilitar o acesso a propostas com fornecedores qualificados.' },
]
const numeros = [
  { value: 'SC', label: 'Sede em Camboriu' },
  { value: 'B2B', label: 'Foco corporativo' },
  { value: '24h', label: 'Proposta garantida' },
  { value: '100%', label: 'Operacao coordenada' },
]
const valores = [
  { icon: 'mdi-shield-check-outline', title: 'Transparencia', desc: 'Proposta clara, com fornecedor identificado, especificacao tecnica e condicoes comerciais detalhadas.' },
  { icon: 'mdi-lightning-bolt-outline', title: 'Agilidade', desc: 'Resposta em ate 24h para qualquer demanda de insumos alimenticios.' },
  { icon: 'mdi-check-decagram', title: 'Confiabilidade', desc: 'Fornecedores rigorosamente validados para garantir qualidade, prazo e regularidade fiscal.' },
  { icon: 'mdi-handshake-outline', title: 'Parceria', desc: 'Tratamos cada operacao como se fosse a nossa propria demanda.' },
  { icon: 'mdi-map-marker-check-outline', title: 'Cobertura nacional', desc: 'Fornecedores em todo o Brasil, com foco no Sul e Sudeste.' },
  { icon: 'mdi-chart-line', title: 'Resultado', desc: 'Nosso sucesso e medido pela economia e eficiencia gerada para nossos clientes.' },
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
.timeline-item { display: grid; grid-template-columns: 72px 1fr; gap: 16px; padding-bottom: 28px; position: relative; }
.timeline-item:not(:last-child)::before { content: ''; position: absolute; left: 32px; top: 26px; bottom: 0; width: 1px; background: #EBEBEB; }
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
@media (max-width: 960px) { .historia-grid { grid-template-columns: 1fr; gap: 40px; } .valores-grid { grid-template-columns: 1fr 1fr; } .stats-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .valores-grid { grid-template-columns: 1fr; } }
</style>
