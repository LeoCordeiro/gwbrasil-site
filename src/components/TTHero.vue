<template>
  <div class="hero-wrap">
    <div class="hero-side-bar"></div>
    <v-container style="max-width:1280px" class="py-0">
      <div class="hero-inner">

        <!-- ESQUERDA -->
        <div class="hero-left">
          <div class="hero-eyebrow">
            <span class="eyebrow-line"></span>
            Agenciamento de Fretes B2B
          </div>

          <h1 class="hero-title">
            Frete certo.<br>
            Transportadora certa.<br>
            <span class="hero-accent">Você no controle.</span>
          </h1>

          <p class="hero-desc">
            Descreva sua carga. Receba uma proposta em até 24h.
            A Turbo Track cuida de tudo — cotação, seleção da transportadora e acompanhamento da entrega.
          </p>

          <div class="hero-metrics">
            <div class="metric" v-for="m in metricas" :key="m.label">
              <div class="metric-value">{{ m.value }}</div>
              <div class="metric-label">{{ m.label }}</div>
            </div>
          </div>

          <div class="hero-contact">
            <a :href="whatsappHero" target="_blank" class="contact-item">
              <v-icon size="16" color="#E8821A">mdi-whatsapp</v-icon>
              (11) 97337-2843
            </a>
            <span class="contact-divider">•</span>
            <a href="mailto:atendimento@turbotrack.com.br" class="contact-item">
              <v-icon size="16" color="#E8821A">mdi-email-outline</v-icon>
              atendimento@turbotrack.com.br
            </a>
          </div>
        </div>

        <!-- DIREITA: MINI FORMULÁRIO -->
        <div class="hero-right">
          <div class="cotacao-card" v-if="!cotacaoEnviada">
            <div class="cotacao-header">
              <v-icon color="#E8821A" size="18">mdi-truck-fast-outline</v-icon>
              <span>Cotação rápida de frete</span>
            </div>
            <div class="cotacao-body">

              <div class="form-row">
                <v-text-field v-model="empresa" label="Nome ou razão social" variant="outlined" density="compact" color="#E8821A" bg-color="white" prepend-inner-icon="mdi-domain" />
                <v-text-field v-model="whatsapp" label="WhatsApp para retorno" variant="outlined" density="compact" color="#E8821A" bg-color="white" prepend-inner-icon="mdi-whatsapp" placeholder="(00) 00000-0000" @input="mascaraTelefone" maxlength="15" />
              </div>

              <div class="form-row">
                <v-text-field v-model="origem" label="Cidade de origem" variant="outlined" density="compact" color="#E8821A" bg-color="white" prepend-inner-icon="mdi-map-marker-outline" />
                <v-text-field v-model="destino" label="Cidade de destino" variant="outlined" density="compact" color="#E8821A" bg-color="white" prepend-inner-icon="mdi-map-marker-check-outline" />
              </div>

              <div class="form-row">
                <v-select v-model="tipoCarga" :items="tiposCarga" label="Tipo de carga" variant="outlined" density="compact" color="#E8821A" bg-color="white" prepend-inner-icon="mdi-package-variant" />
                <v-select v-model="urgencia" :items="urgencias" label="Urgência do envio" variant="outlined" density="compact" color="#E8821A" bg-color="white" prepend-inner-icon="mdi-clock-outline" />
              </div>

              <div class="form-row">
                <v-text-field v-model="peso" label="Peso aproximado (kg)" variant="outlined" density="compact" color="#E8821A" bg-color="white" prepend-inner-icon="mdi-weight-kilogram" type="number" />
                <v-menu v-model="menuData" :close-on-content-click="false">
                  <template #activator="{ props }">
                    <v-text-field v-bind="props" :model-value="dataFormatada" label="Data prevista de coleta" variant="outlined" density="compact" color="#E8821A" bg-color="white" prepend-inner-icon="mdi-calendar" readonly />
                  </template>
                  <v-date-picker v-model="dataColeta" color="#E8821A" :min="hoje" @update:model-value="menuData = false" />
                </v-menu>
              </div>

              <v-textarea v-model="descricao" label="Observações adicionais sobre a carga" variant="outlined" density="compact" color="#E8821A" bg-color="white" rows="2" prepend-inner-icon="mdi-text" />

              <a :href="whatsappLink" target="_blank" class="btn-cotacao" @click="confirmar">
                <v-icon size="16">mdi-whatsapp</v-icon>
                Solicitar proposta agora
              </a>
              <p class="cotacao-note">Proposta em até 24h • Sem compromisso</p>
            </div>
          </div>

          <!-- SUCESSO -->
          <div class="cotacao-card success-state" v-else>
            <div class="success-content">
              <v-icon size="44" color="#E8821A">mdi-check-circle</v-icon>
              <h3 class="success-title">Solicitação enviada!</h3>
              <p class="success-text">Sua cotação foi encaminhada. Nossa equipe retornará em até 24h pelo WhatsApp.</p>
              <button class="btn-nova" @click="novaCotacao">Nova cotação</button>
            </div>
          </div>
        </div>

      </div>
    </v-container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const metricas = [
  { value: '+4', label: 'anos no mercado' },
  { value: '24h', label: 'proposta garantida' },
  { value: 'B2B', label: 'foco corporativo' },
]

const empresa = ref(''); const whatsapp = ref(''); const origem = ref(''); const destino = ref('')
const tipoCarga = ref(''); const urgencia = ref(''); const peso = ref(''); const descricao = ref('')
const dataColeta = ref(null); const menuData = ref(false)
const cotacaoEnviada = ref(false)
const hoje = new Date().toISOString().substr(0,10)

const dataFormatada = computed(() => {
  if (!dataColeta.value) return ''
  return new Date(dataColeta.value).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric' })
})

function mascaraTelefone() {
  let v = whatsapp.value.replace(/\D/g,'').slice(0,11)
  if (v.length <= 10) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3')
  else v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3')
  whatsapp.value = v
}

function confirmar() { setTimeout(() => { cotacaoEnviada.value = true }, 500) }
function novaCotacao() {
  empresa.value=''; whatsapp.value=''; origem.value=''; destino.value=''
  tipoCarga.value=''; urgencia.value=''; peso.value=''; descricao.value=''
  dataColeta.value=null; cotacaoEnviada.value = false
}

const tiposCarga = [
  'Carga geral fracionada','Carga fechada (lotação)','Carga refrigerada',
  'Industrial / Maquinário','Produtos alimentícios','Higiene / Limpeza',
  'Documentos / Volumes pequenos','Outro',
]

const urgencias = [
  '⚡ Urgente — entrega em 24h',
  '🚀 Rápido — entrega em 48-72h',
  '📅 Normal — até 5 dias úteis',
  '🗓️ Programado — data específica',
]

const numero = '5511973372843'
const whatsappHero = `https://wa.me/${numero}?text=Olá%2C%20gostaria%20de%20informações%20sobre%20agenciamento%20de%20fretes!`

const whatsappLink = computed(() => {
  const texto = `Olá, sou ${empresa.value} e gostaria de cotar um frete.\n\nOrigem: ${origem.value}\nDestino: ${destino.value}\nTipo de carga: ${tipoCarga.value}\nUrgência: ${urgencia.value}\nPeso: ${peso.value} kg\nData prevista de coleta: ${dataFormatada.value}\nObservações: ${descricao.value}\nContato: ${whatsapp.value}`
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
})
</script>

<style scoped>
.hero-wrap {
  background: #0C1A3E; min-height: 85vh;
  display: flex; align-items: center;
  position: relative; overflow: hidden;
  margin-top: 0;
}
.hero-side-bar { display: none; }
.hero-inner {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 48px; align-items: center; padding: 48px 0;
  position: relative; z-index: 1;
}

.hero-eyebrow {
  display: flex; align-items: center; gap: 12px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
  text-transform: uppercase; color: #E8821A; margin-bottom: 24px;
}
.eyebrow-line { width: 32px; height: 2px; background: #E8821A; flex-shrink: 0; }

.hero-title {
  font-size: clamp(32px, 3.5vw, 54px); font-weight: 900;
  color: #fff; line-height: 1.08; letter-spacing: -0.02em; margin-bottom: 20px;
  font-family: 'Barlow Condensed', 'Rajdhani', 'Inter', sans-serif;
  text-transform: uppercase;
}
.hero-accent { color: #E8821A; display: block; }
.hero-desc {
  font-size: 15px; color: rgba(255,255,255,0.55);
  line-height: 1.75; max-width: 480px; margin-bottom: 32px;
  font-family: 'Inter', sans-serif; font-weight: 400;
}

.hero-metrics { display: flex; gap: 36px; padding: 24px 0; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px; }
.metric-value { font-size: 28px; font-weight: 900; color: #fff; letter-spacing: -0.02em; font-family: 'Barlow Condensed', sans-serif; }
.metric-label { font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 3px; font-family: 'Inter', sans-serif; }

.hero-contact { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.contact-item { display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.6); font-size: 13px; text-decoration: none; transition: color 0.2s; font-family: 'Inter', sans-serif; }
.contact-item:hover { color: #E8821A; }
.contact-divider { color: rgba(255,255,255,0.2); }

/* CARD COTAÇÃO */
.hero-right { position: relative; display: flex; justify-content: center; }
.cotacao-card { background: #fff; border-radius: 12px; box-shadow: 0 24px 64px rgba(0,0,0,0.5); overflow: hidden; width: 100%; border-top: 3px solid #E8821A; }
.cotacao-header { display: flex; align-items: center; gap: 10px; background: #F8F8F8; border-bottom: 1px solid #EBEBEB; padding: 12px 18px; font-size: 12px; font-weight: 700; color: #0C1A3E; letter-spacing: 0.04em; text-transform: uppercase; }
.cotacao-body { padding: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 0; }
.btn-cotacao { display: flex; align-items: center; justify-content: center; gap: 8px; background: #E8821A; color: #fff; font-size: 14px; font-weight: 800; padding: 14px; border-radius: 6px; text-decoration: none; transition: all 0.2s; margin-top: 12px; letter-spacing: 0.04em; text-transform: uppercase; font-family: 'Barlow', 'Inter', sans-serif; }
.btn-cotacao:hover { background: #CF7015; transform: translateY(-1px); }
.cotacao-note { text-align: center; font-size: 11px; color: #AAA; margin-top: 10px; font-family: 'Inter', sans-serif; }

.success-state { display: flex; align-items: center; justify-content: center; min-height: 320px; }
.success-content { text-align: center; padding: 32px; }
.success-title { font-size: 22px; font-weight: 900; color: #0C1A3E; margin: 16px 0 10px; font-family: 'Barlow Condensed', sans-serif; text-transform: uppercase; letter-spacing: 0.02em; }
.success-text { font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 20px; font-family: 'Inter', sans-serif; }
.btn-nova { background: transparent; border: 2px solid #0C1A3E; color: #0C1A3E; font-size: 13px; font-weight: 700; padding: 10px 24px; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-family: 'Barlow', sans-serif; text-transform: uppercase; letter-spacing: 0.04em; }
.btn-nova:hover { background: #0C1A3E; color: #fff; }

@media (max-width: 960px) {
  .hero-wrap::after { display: none; }
  .hero-inner { grid-template-columns: 1fr; gap: 40px; padding: 40px 16px; }
  .hero-right { width: 100%; }
}
</style>
