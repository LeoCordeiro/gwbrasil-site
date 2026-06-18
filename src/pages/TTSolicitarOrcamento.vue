<template>
  <div>
    <div class="page-header">
      <v-container style="max-width:1200px">
        <div class="page-label">Cotacao</div>
        <h1 class="page-title">Solicite sua cotacao agora.</h1>
        <p class="page-sub">Preencha os dados abaixo e receba uma proposta com fornecedor selecionado, especificacao do produto e condicoes comerciais em ate 24 horas uteis.</p>
      </v-container>
    </div>

    <section style="padding:40px 16px; background:#fff">
      <v-container style="max-width:860px">

        <div class="form-card" v-if="!enviado">
          <div class="form-intro">
            <h2 class="form-title">Dados da cotacao</h2>
            <p class="form-sub">Preencha o formulario e nossa equipe retorna em ate 24h com a proposta</p>
          </div>

          <div class="form-grid">
            <v-select v-model="produto" :items="produtosOptions" label="Produto desejado" variant="outlined" density="comfortable" color="#E8821A" />
            <v-select v-model="quantidade" :items="quantidadeOptions" label="Quantidade estimada" variant="outlined" density="comfortable" color="#E8821A" />
          </div>

          <div class="form-grid">
            <v-select v-model="frequencia" :items="frequenciaOptions" label="Frequencia de compra" variant="outlined" density="comfortable" color="#E8821A" />
            <v-text-field v-model="especificacao" label="Especificacao tecnica" placeholder="Ex: acidez maxima, ponto de fusao, uso final" variant="outlined" density="comfortable" color="#E8821A" />
          </div>

          <div class="form-grid">
            <v-select v-model="estado" :items="estadosOptions" label="Estado de entrega" variant="outlined" density="comfortable" color="#E8821A" />
            <v-select v-model="prazo" :items="prazoOptions" label="Prazo desejado" variant="outlined" density="comfortable" color="#E8821A" />
          </div>

          <div class="form-grid">
            <v-text-field v-model="nomeCompleto" label="Nome completo" variant="outlined" density="comfortable" color="#E8821A" />
            <v-text-field v-model="empresaForm" label="Empresa" variant="outlined" density="comfortable" color="#E8821A" />
          </div>

          <div class="form-grid">
            <v-select v-model="segmentoEmpresa" :items="segmentoOptions" label="Segmento da empresa" variant="outlined" density="comfortable" color="#E8821A" />
            <v-text-field v-model="whatsappForm" label="WhatsApp" placeholder="(00) 00000-0000" variant="outlined" density="comfortable" color="#E8821A" @input="mascaraTelefone" maxlength="15" />
          </div>

          <v-text-field v-model="emailForm" label="E-mail corporativo" variant="outlined" density="comfortable" color="#E8821A" />

          <a :href="whatsappFinal" target="_blank" class="btn-submit" @click="confirmarEnvio">
            SOLICITAR COTACAO
          </a>
          <p class="form-note">Proposta em ate 24h · Fornecedores homologados · Documentacao completa</p>
        </div>

        <div class="success-card" v-else>
          <div class="success-icon"><v-icon size="48" color="#E8821A">mdi-check-circle</v-icon></div>
          <h2 class="success-title">Cotacao recebida!</h2>
          <p class="success-text">Nossa equipe entrara em contato em ate 24 horas uteis com a melhor proposta para o seu insumo.</p>
          <div class="success-info">
            <v-icon size="16" color="#E8821A" class="mr-2">mdi-clock-outline</v-icon>
            Prazo de retorno: <strong>ate 24 horas</strong>
          </div>
          <button class="btn-novo" @click="novaCota">Nova cotacao</button>
        </div>

      </v-container>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const produto = ref('')
const quantidade = ref('')
const frequencia = ref('')
const especificacao = ref('')
const estado = ref('')
const prazo = ref('')
const nomeCompleto = ref('')
const empresaForm = ref('')
const segmentoEmpresa = ref('')
const whatsappForm = ref('')
const emailForm = ref('')
const enviado = ref(false)

function mascaraTelefone() {
  let v = whatsappForm.value.replace(/\D/g, '').slice(0, 11)
  if (v.length <= 10) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  else v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  whatsappForm.value = v
}

function confirmarEnvio() { setTimeout(() => { enviado.value = true }, 500) }
function novaCota() {
  produto.value = ''; quantidade.value = ''; frequencia.value = ''; especificacao.value = ''
  estado.value = ''; prazo.value = ''; nomeCompleto.value = ''; empresaForm.value = ''
  segmentoEmpresa.value = ''; whatsappForm.value = ''; emailForm.value = ''
  enviado.value = false
}

const produtosOptions = [
  'Oleo de soja', 'Oleo de girassol', 'Oleo de canola', 'Gordura vegetal hidrogenada',
  'Gordura interesterificada', 'Shortening', 'Margarina industrial', 'Azeite de oliva',
  'Oleo de coco', 'Outro insumo alimenticio',
]
const quantidadeOptions = [
  'Ate 1 tonelada', '1 a 5 toneladas', '5 a 20 toneladas', '20 a 50 toneladas', 'Acima de 50 toneladas',
]
const frequenciaOptions = ['Compra pontual', 'Mensal', 'Quinzenal', 'Semanal']
const prazoOptions = ['Urgente ate 5 dias', 'Padrao 10 a 15 dias', 'Programado acima de 15 dias']
const segmentoOptions = ['Industria alimenticia', 'Frigorifico', 'Distribuidor', 'Atacadista', 'Food service', 'Panificacao', 'Outro']
const estadosOptions = [
  'Acre (AC)', 'Alagoas (AL)', 'Amapa (AP)', 'Amazonas (AM)', 'Bahia (BA)',
  'Ceara (CE)', 'Distrito Federal (DF)', 'Espirito Santo (ES)', 'Goias (GO)',
  'Maranhao (MA)', 'Mato Grosso (MT)', 'Mato Grosso do Sul (MS)', 'Minas Gerais (MG)',
  'Para (PA)', 'Paraiba (PB)', 'Parana (PR)', 'Pernambuco (PE)', 'Piaui (PI)',
  'Rio de Janeiro (RJ)', 'Rio Grande do Norte (RN)', 'Rio Grande do Sul (RS)',
  'Rondonia (RO)', 'Roraima (RR)', 'Santa Catarina (SC)', 'Sao Paulo (SP)',
  'Sergipe (SE)', 'Tocantins (TO)',
]

const numero = '5521987740643'
const whatsappFinal = computed(() => {
  const texto = `Ola, gostaria de solicitar uma cotacao de insumos alimenticios.\n\nProduto: ${produto.value}\nQuantidade: ${quantidade.value}\nFrequencia: ${frequencia.value}\nEspecificacao: ${especificacao.value}\nEstado de entrega: ${estado.value}\nPrazo: ${prazo.value}\nNome: ${nomeCompleto.value}\nEmpresa: ${empresaForm.value}\nSegmento: ${segmentoEmpresa.value}\nWhatsApp: ${whatsappForm.value}\nE-mail: ${emailForm.value}`
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
.btn-submit { display: flex; align-items: center; justify-content: center; gap: 10px; background: #E8821A; color: #fff; font-size: 15px; font-weight: 700; padding: 16px; border-radius: 12px; text-decoration: none; transition: all 0.2s; margin-top: 16px; letter-spacing: 0.04em; }
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
