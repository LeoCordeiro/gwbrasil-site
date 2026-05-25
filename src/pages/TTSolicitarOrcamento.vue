<template>
  <div>
    <div class="page-header">
      <v-container style="max-width:1200px">
        <div class="page-label">Briefing de carga</div>
        <h1 class="page-title">Cotar frete</h1>
        <p class="page-sub">Descreva sua carga e receba uma proposta em até 24 horas</p>
      </v-container>
    </div>

    <section style="padding:40px 16px; background:#fff">
      <v-container style="max-width:860px">

        <div class="form-card" v-if="!enviado">
          <div class="form-intro">
            <h2 class="form-title">Dados da carga</h2>
            <p class="form-sub">Preencha o briefing e nossa equipe retorna em até 24h com a proposta</p>
          </div>

          <div class="form-grid">
            <v-text-field v-model="empresa" label="Nome ou razão social" variant="outlined" density="comfortable" color="#E8821A" prepend-inner-icon="mdi-domain" />
            <v-text-field v-model="whatsapp" label="WhatsApp para retorno" variant="outlined" density="comfortable" color="#E8821A" prepend-inner-icon="mdi-whatsapp" placeholder="(00) 00000-0000" @input="mascaraTelefone" maxlength="15" />
          </div>

          <div class="form-grid">
            <v-text-field v-model="origem" label="Cidade de origem" variant="outlined" density="comfortable" color="#E8821A" prepend-inner-icon="mdi-map-marker-outline" />
            <v-text-field v-model="destino" label="Cidade de destino" variant="outlined" density="comfortable" color="#E8821A" prepend-inner-icon="mdi-map-marker-check-outline" />
          </div>

          <div class="form-grid">
            <v-select v-model="tipoCarga" :items="tiposCarga" label="Tipo de carga" variant="outlined" density="comfortable" color="#E8821A" prepend-inner-icon="mdi-package-variant" />
            <v-select v-model="urgencia" :items="urgencias" label="Urgência do envio" variant="outlined" density="comfortable" color="#E8821A" prepend-inner-icon="mdi-clock-outline" />
          </div>

          <div class="form-grid">
            <v-text-field v-model="peso" label="Peso aproximado (kg)" variant="outlined" density="comfortable" color="#E8821A" prepend-inner-icon="mdi-weight-kilogram" type="number" />
            <v-menu v-model="menuData" :close-on-content-click="false">
              <template #activator="{ props }">
                <v-text-field v-bind="props" :model-value="dataFormatada" label="Data prevista de coleta" variant="outlined" density="comfortable" color="#E8821A" prepend-inner-icon="mdi-calendar" readonly />
              </template>
              <v-date-picker v-model="dataColeta" color="#E8821A" :min="hoje" @update:model-value="menuData = false" />
            </v-menu>
          </div>

          <v-textarea v-model="descricao" label="Observações adicionais sobre a carga" variant="outlined" rows="3" color="#E8821A" prepend-inner-icon="mdi-text" />

          <a :href="whatsappFinal" target="_blank" class="btn-submit" @click="confirmarEnvio">
            <v-icon size="18">mdi-whatsapp</v-icon>
            Solicitar proposta de frete
          </a>
          <p class="form-note">Proposta em até 24h • Sem compromisso • Atendimento especializado</p>
        </div>

        <div class="success-card" v-else>
          <div class="success-icon"><v-icon size="48" color="#E8821A">mdi-check-circle</v-icon></div>
          <h2 class="success-title">Briefing enviado!</h2>
          <p class="success-text">Recebemos os dados da sua carga. Nossa equipe vai analisar e retornar pelo WhatsApp com a proposta de agenciamento.</p>
          <div class="success-info">
            <v-icon size="16" color="#E8821A" class="mr-2">mdi-clock-outline</v-icon>
            Prazo de retorno: <strong>até 24 horas</strong>
          </div>
          <button class="btn-novo" @click="novaCota">Cotar nova carga</button>
        </div>

      </v-container>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const empresa = ref(''); const whatsapp = ref(''); const origem = ref(''); const destino = ref('')
const tipoCarga = ref(''); const urgencia = ref(''); const peso = ref(''); const descricao = ref('')
const dataColeta = ref(null); const menuData = ref(false); const enviado = ref(false)
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

function confirmarEnvio() { setTimeout(() => { enviado.value = true }, 500) }
function novaCota() {
  empresa.value=''; whatsapp.value=''; origem.value=''; destino.value=''
  tipoCarga.value=''; urgencia.value=''; peso.value=''; descricao.value=''
  dataColeta.value=null; enviado.value=false
}

const tiposCarga = [
  { title: '📦 Carga geral fracionada', value: 'Carga geral fracionada' },
  { title: '🚛 Carga fechada (lotação)', value: 'Carga fechada (lotação)' },
  { title: '🧊 Carga refrigerada', value: 'Carga refrigerada' },
  { title: '⚙️ Carga industrial/maquinário', value: 'Carga industrial/maquinário' },
  { title: '🍎 Produtos alimentícios', value: 'Produtos alimentícios' },
  { title: '🧴 Produtos de higiene/limpeza', value: 'Produtos de higiene/limpeza' },
  { title: '📋 Documentos e pequenos volumes', value: 'Documentos e pequenos volumes' },
  { title: '🏗️ Carga especial/indivisível', value: 'Carga especial/indivisível' },
  { title: '📋 Outro tipo', value: 'Outro' },
]
const urgencias = [
  { title: '⚡ Urgente — entrega em 24h', value: 'Urgente (24h)' },
  { title: '🚀 Rápido — entrega em 48-72h', value: 'Rápido (48-72h)' },
  { title: '📅 Normal — até 5 dias úteis', value: 'Normal (5 dias úteis)' },
  { title: '🗓️ Programado — data específica', value: 'Programado' },
]

const numero = '5511999999999'
const whatsappFinal = computed(() => {
  const texto = `Olá, sou ${empresa.value} e gostaria de cotar um frete.\n\nOrigem: ${origem.value}\nDestino: ${destino.value}\nTipo de carga: ${tipoCarga.value}\nPeso: ${peso.value} kg\nUrgência: ${urgencia.value}\nData prevista de coleta: ${dataFormatada.value}\nObservações: ${descricao.value}\nContato: ${whatsapp.value}`
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
})
</script>

<style scoped>
.page-header { background: #1B2B6B; padding: 36px 16px 28px; }
.page-label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #E8821A; margin-bottom: 8px; }
.page-title { font-size: clamp(24px,3.5vw,42px); font-weight: 800; color: #fff; letter-spacing: -0.03em; margin-bottom: 6px; }
.page-sub { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.5; }
.form-card { background: #F8F8F8; border-radius: 24px; padding: 40px; }
.form-intro { margin-bottom: 28px; }
.form-title { font-size: 22px; font-weight: 700; color: #1B2B6B; margin-bottom: 6px; }
.form-sub { font-size: 14px; color: #999; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 4px; }
.btn-submit { display: flex; align-items: center; justify-content: center; gap: 10px; background: #E8821A; color: #fff; font-size: 15px; font-weight: 600; padding: 16px; border-radius: 12px; text-decoration: none; transition: all 0.2s; margin-top: 16px; }
.btn-submit:hover { background: #CF7015; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,130,26,0.3); }
.form-note { text-align: center; font-size: 12px; color: #AAA; margin-top: 14px; }
.success-card { background: #F8F8F8; border-radius: 24px; padding: 56px 40px; text-align: center; }
.success-icon { margin-bottom: 20px; }
.success-title { font-size: 26px; font-weight: 800; color: #1B2B6B; margin-bottom: 14px; letter-spacing: -0.02em; }
.success-text { font-size: 15px; color: #666; line-height: 1.7; max-width: 460px; margin: 0 auto 20px; }
.success-info { display: inline-flex; align-items: center; background: #FFF4E8; border-radius: 100px; padding: 10px 20px; font-size: 13px; color: #555; margin-bottom: 28px; }
.success-info strong { color: #E8821A; margin-left: 4px; }
.btn-novo { background: transparent; border: 2px solid #1B2B6B; color: #1B2B6B; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
.btn-novo:hover { background: #1B2B6B; color: #fff; }
@media (max-width: 600px) { .form-card { padding: 24px 16px; } .form-grid { grid-template-columns: 1fr; } }
</style>
