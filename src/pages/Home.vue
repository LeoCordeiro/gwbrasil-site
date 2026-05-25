<template>
  <div>
    <HeroSection />

    <!-- BARRA DE CREDIBILIDADE -->
    <div class="trust-bar">
      <v-container style="max-width:1280px">
        <div class="trust-items">
          <div class="trust-item" v-for="t in trust" :key="t.label">
            <v-icon size="18" color="#E8821A">{{ t.icon }}</v-icon>
            <span>{{ t.label }}</span>
          </div>
        </div>
      </v-container>
    </div>

    <!-- SERVIÇOS -->
    <section class="section-services">
      <v-container style="max-width:1280px">
        <div class="services-layout">

          <div class="services-header">
            <div class="section-eyebrow">O que fazemos</div>
            <h2 class="section-heading">Agenciamento B2B<br>de ponta a ponta</h2>
            <p class="section-body">Não somos transportadora. Somos o elo estratégico entre sua empresa e a transportadora certa para cada carga.</p>
            <router-link to="/solicitar" class="btn-solid">Cotar frete →</router-link>
          </div>

          <div class="services-cards">
            <div class="service-item" v-for="s in servicos" :key="s.title">
              <div class="service-num">{{ s.num }}</div>
              <div class="service-content">
                <div class="service-icon"><v-icon size="20" color="#E8821A">{{ s.icon }}</v-icon></div>
                <div class="service-title">{{ s.title }}</div>
                <div class="service-desc">{{ s.desc }}</div>
              </div>
            </div>
          </div>

        </div>
      </v-container>
    </section>

    <!-- PROCESSO EM LINHA DO TEMPO -->
    <section class="section-process">
      <v-container style="max-width:1280px">
        <div class="process-header">
          <div class="section-eyebrow" style="color:rgba(255,255,255,0.4)">Como funciona</div>
          <h2 class="section-heading" style="color:#fff">4 passos. Frete resolvido.</h2>
        </div>
        <div class="process-steps">
          <div class="process-step" v-for="(step, i) in steps" :key="i">
            <div class="process-step-num">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="process-step-icon"><v-icon size="22" color="#E8821A">{{ step.icon }}</v-icon></div>
            <div class="process-step-title">{{ step.title }}</div>
            <div class="process-step-desc">{{ step.desc }}</div>
            <div class="process-connector" v-if="i < steps.length - 1">
              <svg width="40" height="2"><line x1="0" y1="1" x2="40" y2="1" stroke="#E8821A" stroke-width="1.5" stroke-dasharray="5 3"/></svg>
            </div>
          </div>
        </div>
      </v-container>
    </section>

    <!-- DIFERENCIAIS -->
    <section class="section-diff">
      <v-container style="max-width:1280px">
        <div class="diff-layout">

          <div class="diff-visual">
            <div class="diff-big-num">+4</div>
            <div class="diff-big-label">anos no mercado</div>
            <div class="diff-stats">
              <div class="diff-stat" v-for="n in numeros" :key="n.label">
                <div class="diff-stat-value">{{ n.value }}</div>
                <div class="diff-stat-label">{{ n.label }}</div>
              </div>
            </div>
          </div>

          <div class="diff-content">
            <div class="section-eyebrow">Por que a Turbo Track</div>
            <h2 class="section-heading">Você foca no negócio.<br>Nós cuidamos do frete.</h2>
            <p class="section-body">Indústrias, distribuidores e atacadistas precisam de fretes frequentes mas não têm equipe dedicada para negociar com dezenas de transportadoras. A Turbo Track resolve isso.</p>
            <div class="diff-items">
              <div class="diff-item" v-for="d in diferenciais" :key="d.title">
                <div class="diff-check"><v-icon size="14" color="#E8821A">mdi-check</v-icon></div>
                <div>
                  <div class="diff-item-title">{{ d.title }}</div>
                  <div class="diff-item-desc">{{ d.desc }}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </v-container>
    </section>

    <!-- CTA TRANSPORTADORAS -->
    <section class="section-partner">
      <v-container style="max-width:1280px">
        <div class="partner-banner">
          <div class="partner-badge">Para transportadoras</div>
          <h2 class="partner-title">Sua frota parada custa dinheiro.<br>Receba cargas da nossa rede.</h2>
          <p class="partner-desc">Cadastre-se como transportadora parceira e receba demandas de frete de empresas B2B sérias em todo o Brasil.</p>
          <div class="partner-actions">
            <router-link to="/parceiro" class="btn-white">Quero ser parceiro</router-link>
            <router-link to="/solicitar" class="btn-ghost-white">Sou embarcador → Cotar frete</router-link>
          </div>
        </div>
      </v-container>
    </section>

  </div>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue'

const trust = [
  { icon: 'mdi-shield-check-outline', label: '+4 anos ativos no mercado' },
  { icon: 'mdi-map-marker-outline', label: 'Sede na Av. Paulista – SP' },
  { icon: 'mdi-truck-check-outline', label: 'Rede de transportadoras selecionadas' },
  { icon: 'mdi-clock-fast', label: 'Proposta em até 24h' },
  { icon: 'mdi-headset', label: 'Suporte em cada operação' },
]

const servicos = [
  { num:'01', icon:'mdi-clipboard-text-outline', title:'Briefing de carga', desc:'Você descreve origem, destino, tipo e peso. Nada de ligações intermináveis.' },
  { num:'02', icon:'mdi-magnify', title:'Seleção da transportadora', desc:'Analisamos nossa rede e escolhemos a transportadora mais adequada para cada carga.' },
  { num:'03', icon:'mdi-currency-brl', title:'Negociação e proposta', desc:'Negociamos o melhor preço e prazo. Você recebe uma proposta clara.' },
  { num:'04', icon:'mdi-map-marker-path', title:'Acompanhamento total', desc:'Coordenamos a operação do início ao fim. Você foca no seu negócio.' },
  { num:'05', icon:'mdi-truck-delivery-outline', title:'Cargas interestaduais', desc:'Atendemos rotas intermunicipais e interestaduais em todo o Brasil.' },
  { num:'06', icon:'mdi-lightning-bolt-outline', title:'Entrega expressa', desc:'Para cargas urgentes, acionamos nossa rede de entrega rápida.' },
]

const steps = [
  { icon:'mdi-clipboard-edit-outline', title:'Briefing', desc:'Preencha o formulário com os dados da carga.' },
  { icon:'mdi-truck-search-outline', title:'Análise', desc:'Identificamos a melhor transportadora da rede.' },
  { icon:'mdi-file-check-outline', title:'Proposta', desc:'Você recebe valor e prazo em até 24h.' },
  { icon:'mdi-truck-check-outline', title:'Execução', desc:'Contratamos e acompanhamos até a entrega.' },
]

const numeros = [
  { value:'B2B', label:'Foco exclusivo' },
  { value:'24h', label:'Para proposta' },
  { value:'100%', label:'Coordenado' },
]

const diferenciais = [
  { title:'Sem burocracia', desc:'Formulário simples, proposta rápida, operação eficiente.' },
  { title:'Rede qualificada', desc:'Transportadoras selecionadas e validadas pela nossa equipe.' },
  { title:'Transparência total', desc:'Proposta clara, sem taxas ocultas ou surpresas no processo.' },
  { title:'Suporte dedicado', desc:'Nossa equipe acompanha cada operação do início ao fim.' },
]
</script>

<style scoped>
/* TRUST BAR */
.trust-bar { background: #1B2B6B; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 14px 0; }
.trust-items { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
.trust-item { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.7); letter-spacing: 0.02em; white-space: nowrap; }

/* EYEBROW / HEADINGS */
.section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #E8821A; margin-bottom: 14px; }
.section-heading { font-size: clamp(28px,3vw,44px); font-weight: 900; color: #0C1A3E; letter-spacing: -0.03em; line-height: 1.08; margin-bottom: 16px; }
.section-body { font-size: 15px; color: #666; line-height: 1.75; }

/* SERVICES */
.section-services { padding: 88px 16px; background: #fff; }
.services-layout { display: grid; grid-template-columns: 300px 1fr; gap: 80px; align-items: start; }
.services-header { position: sticky; top: 100px; }
.services-header .section-body { margin-bottom: 28px; }

.btn-solid { display: inline-flex; align-items: center; background: #0C1A3E; color: #fff; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 4px; text-decoration: none; transition: all 0.2s; letter-spacing: 0.02em; }
.btn-solid:hover { background: #E8821A; }

.services-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid #EBEBEB; border-radius: 12px; overflow: hidden; }
.service-item { padding: 32px 28px; border-right: 1px solid #EBEBEB; border-bottom: 1px solid #EBEBEB; position: relative; transition: all 0.2s; }
.service-item:nth-child(2n) { border-right: none; }
.service-item:nth-last-child(-n+2) { border-bottom: none; }
.service-item:hover { background: #FAFAFA; }
.service-item:hover .service-num { color: rgba(232,130,26,0.15); }
.service-num { font-size: 52px; font-weight: 900; color: #F5F5F5; letter-spacing: -0.05em; line-height: 1; position: absolute; top: 16px; right: 20px; }
.service-icon { width: 40px; height: 40px; background: #FFF4E8; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
.service-title { font-size: 15px; font-weight: 700; color: #0C1A3E; margin-bottom: 8px; }
.service-desc { font-size: 13px; color: #888; line-height: 1.6; }

/* PROCESS */
.section-process { padding: 88px 16px; background: #0C1A3E; position: relative; overflow: hidden; }
.section-process::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #E8821A, #FF9A2E, #E8821A); }
.process-header { margin-bottom: 56px; }
.process-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
.process-step { padding: 36px 28px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); margin-right: -1px; position: relative; transition: background 0.2s; }
.process-step:hover { background: rgba(255,255,255,0.06); }
.process-step:first-child { border-radius: 12px 0 0 12px; }
.process-step:last-child { border-radius: 0 12px 12px 0; margin-right: 0; }
.process-step-num { font-size: 52px; font-weight: 900; color: rgba(232,130,26,0.15); letter-spacing: -0.04em; line-height: 1; margin-bottom: 20px; }
.process-step-icon { width: 44px; height: 44px; background: rgba(232,130,26,0.12); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.process-step-title { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 10px; }
.process-step-desc { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.65; }
.process-connector { position: absolute; top: 44px; right: -20px; z-index: 2; }

/* DIFERENCIAIS */
.section-diff { padding: 88px 16px; background: #F5F7FB; }
.diff-layout { display: grid; grid-template-columns: 1fr 1.3fr; gap: 80px; align-items: center; }
.diff-visual { background: #0C1A3E; border-radius: 16px; padding: 48px 40px; }
.diff-big-num { font-size: 80px; font-weight: 900; color: #E8821A; letter-spacing: -0.05em; line-height: 1; }
.diff-big-label { font-size: 18px; font-weight: 600; color: rgba(255,255,255,0.7); line-height: 1.4; margin-bottom: 40px; }
.diff-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); }
.diff-stat-value { font-size: 28px; font-weight: 900; color: #fff; letter-spacing: -0.03em; }
.diff-stat-label { font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }

.diff-content .section-body { margin-bottom: 36px; }
.diff-items { display: flex; flex-direction: column; gap: 20px; }
.diff-item { display: flex; align-items: flex-start; gap: 14px; }
.diff-check { width: 28px; height: 28px; background: #FFF4E8; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
.diff-item-title { font-size: 15px; font-weight: 700; color: #0C1A3E; margin-bottom: 3px; }
.diff-item-desc { font-size: 13px; color: #888; line-height: 1.5; }

/* PARTNER */
.section-partner { padding: 88px 16px; background: #fff; }
.partner-banner {
  background: linear-gradient(135deg, #0C1A3E 0%, #1B2B6B 100%);
  border-radius: 16px; padding: 64px 72px;
  position: relative; overflow: hidden;
}
.partner-banner::before {
  content: ''; position: absolute; right: -60px; top: -60px;
  width: 320px; height: 320px; border-radius: 50%;
  border: 1px solid rgba(232,130,26,0.15);
}
.partner-banner::after {
  content: ''; position: absolute; right: 40px; bottom: -80px;
  width: 200px; height: 200px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.06);
}
.partner-badge { display: inline-flex; background: rgba(232,130,26,0.2); color: #E8821A; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 6px 14px; border-radius: 100px; margin-bottom: 20px; }
.partner-title { font-size: clamp(24px,3vw,38px); font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 16px; }
.partner-desc { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.7; max-width: 560px; margin-bottom: 36px; }
.partner-actions { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
.btn-white { display: inline-flex; align-items: center; background: #fff; color: #0C1A3E; font-size: 14px; font-weight: 700; padding: 14px 28px; border-radius: 4px; text-decoration: none; transition: all 0.2s; }
.btn-white:hover { background: #E8821A; color: #fff; }
.btn-ghost-white { display: inline-flex; align-items: center; color: rgba(255,255,255,0.65); font-size: 14px; font-weight: 500; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.25); padding-bottom: 2px; transition: all 0.2s; }
.btn-ghost-white:hover { color: #fff; border-color: rgba(255,255,255,0.6); }

@media (max-width: 1024px) {
  .services-layout { grid-template-columns: 1fr; }
  .services-header { position: static; }
  .diff-layout { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .section-services,.section-process,.section-diff,.section-partner { padding: 56px 16px; }
  .services-cards { grid-template-columns: 1fr; }
  .process-steps { grid-template-columns: 1fr 1fr; }
  .partner-banner { padding: 40px 28px; }
  .trust-items { justify-content: flex-start; }
}
@media (max-width: 480px) {
  .process-steps { grid-template-columns: 1fr; }
}
</style>
