<template>
  <div>
    <div class="page-header">
      <v-container style="max-width:1200px">
        <div class="page-label">Processo</div>
        <h1 class="page-title">Como funciona</h1>
        <p class="page-sub">Do briefing ao fornecimento — sem complicacao. Tudo coordenado pela GW Brasil Sul.</p>
      </v-container>
    </div>

    <section style="padding:48px 16px; background:#fff">
      <v-container style="max-width:1200px">
        <div class="steps-grid">
          <div class="step-card" v-for="(step, i) in steps" :key="i">
            <div class="step-connector" v-if="i < steps.length - 1"></div>
            <div class="step-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="step-icon-wrap"><v-icon size="20" color="#E8821A">{{ step.icon }}</v-icon></div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
          </div>
        </div>
      </v-container>
    </section>

    <section style="padding:40px 16px 56px; background:#F8F8F8">
      <v-container style="max-width:900px">
        <div class="about-card">
          <div class="section-label">Por que a GW Brasil Sul?</div>
          <h2 class="about-title">Voce foca no negocio,<br>nos cuidamos do fornecimento</h2>
          <p class="about-text">A GW Brasil Sul nao e um fornecedor — somos um intermediador especializado. Isso significa que temos liberdade para selecionar sempre o melhor fornecedor para cada tipo de insumo, especificacao e prazo.</p>
          <p class="about-text" style="color:#888">Industrias, distribuidores e operacoes de food service que trabalham conosco economizam tempo, reduzem custos e tem mais previsibilidade no fornecimento de insumos alimenticios.</p>
          <router-link to="/solicitar" class="btn-cta">
            Solicitar cotacao
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </router-link>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup>
const steps = [
  { icon: 'mdi-clipboard-text-outline', title: 'Voce descreve o insumo', desc: 'Produto, quantidade, especificacao tecnica, frequencia de compra e prazo. Pelo formulario do site, WhatsApp ou e-mail.' },
  { icon: 'mdi-magnify', title: 'Negociamos com os fornecedores', desc: 'Acionamos nossa rede de atacadistas homologados, negociamos as melhores condicoes de preco, prazo e especificacao tecnica para a sua demanda.' },
  { icon: 'mdi-file-check-outline', title: 'Proposta em ate 24 horas', desc: 'Voce recebe uma proposta detalhada com fornecedor selecionado, ficha tecnica do produto, valor e condicoes de entrega.' },
  { icon: 'mdi-handshake-outline', title: 'Aprovacao e coordenacao', desc: 'Com a proposta aprovada, coordenamos toda a documentacao, emissao de nota fiscal, laudos tecnicos e logistica de entrega ate o seu recebimento.' },
  { icon: 'mdi-truck-check-outline', title: 'Entrega confirmada e suporte', desc: 'Acompanhamos a entrega e ficamos disponiveis para as proximas demandas — construindo um relacionamento de fornecimento continuo e confiavel.' },
]
</script>

<style scoped>
.page-header { background: #1B2B6B; padding: 36px 16px 28px; }
.page-label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #E8821A; margin-bottom: 8px; }
.page-title { font-size: clamp(24px,3.5vw,48px); font-weight: 800; color: #fff; letter-spacing: -0.03em; margin-bottom: 6px; }
.page-sub { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.5; }
.steps-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 0; position: relative; }
.step-card { position: relative; padding: 28px 20px; border: 1px solid #EBEBEB; border-right: none; background: #fff; transition: all 0.25s; }
.step-card:first-child { border-radius: 16px 0 0 16px; }
.step-card:last-child { border-radius: 0 16px 16px 0; border-right: 1px solid #EBEBEB; }
.step-card:hover { background: #FAFAFA; }
.step-connector { position: absolute; top: 48px; right: -12px; width: 24px; height: 24px; background: #E8821A; border-radius: 50%; z-index: 2; display: flex; align-items: center; justify-content: center; }
.step-connector::after { content: '\2192'; color: #fff; font-size: 12px; font-weight: 700; }
.step-num { font-size: 36px; font-weight: 900; color: #EBEBEB; letter-spacing: -0.04em; line-height: 1; margin-bottom: 14px; }
.step-icon-wrap { width: 40px; height: 40px; background: #FFF4E8; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
.step-title { font-size: 14px; font-weight: 700; color: #1B2B6B; margin-bottom: 8px; }
.step-desc { font-size: 12px; color: #888; line-height: 1.65; }
.about-card { background: #fff; border-radius: 20px; padding: 40px; border: 1px solid #EBEBEB; }
.section-label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #E8821A; margin-bottom: 12px; }
.about-title { font-size: clamp(22px,2.5vw,32px); font-weight: 800; color: #1B2B6B; letter-spacing: -0.02em; margin-bottom: 16px; line-height: 1.15; }
.about-text { font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 12px; }
.btn-cta { display: inline-flex; align-items: center; gap: 8px; background: #E8821A; color: #fff; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 10px; text-decoration: none; margin-top: 24px; transition: all 0.2s; }
.btn-cta:hover { background: #CF7015; transform: translateY(-2px); }
@media (max-width: 1024px) { .steps-grid { grid-template-columns: repeat(3,1fr); } .step-connector { display: none; } }
@media (max-width: 768px) { .steps-grid { grid-template-columns: 1fr 1fr; } .step-card { border-right: none; border-radius: 0 !important; border-bottom: none; } .step-card:nth-child(2n) { border-right: 1px solid #EBEBEB; } .step-card:last-child { border-bottom: 1px solid #EBEBEB; border-right: 1px solid #EBEBEB; } .step-card:nth-last-child(2):nth-child(odd) { border-bottom: 1px solid #EBEBEB; } .step-card:first-child { border-radius: 16px 0 0 0 !important; } }
@media (max-width: 480px) { .steps-grid { grid-template-columns: 1fr; } .step-card { border-right: 1px solid #EBEBEB !important; border-bottom: none !important; border-radius: 0 !important; } .step-card:first-child { border-radius: 16px 16px 0 0 !important; } .step-card:last-child { border-radius: 0 0 16px 16px !important; border-bottom: 1px solid #EBEBEB !important; } }
</style>
