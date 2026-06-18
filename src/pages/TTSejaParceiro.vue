<template>
  <div>
    <div class="page-header">
      <v-container style="max-width:1200px">
        <div class="page-label">Para fornecedores</div>
        <h1 class="page-title">Seja um fornecedor<br>parceiro</h1>
        <p class="page-sub">Faca parte da rede de fornecedores da GW Brasil Sul e receba demandas recorrentes de industrias e distribuidores</p>
      </v-container>
    </div>

    <section style="padding:40px 16px; background:#fff">
      <v-container style="max-width:1200px">
        <div class="partner-grid">

          <div>
            <div class="section-label">Vantagens</div>
            <h2 class="section-title">Por que ser fornecedor<br>parceiro da GW Brasil Sul?</h2>
            <div class="benefits-list">
              <div class="benefit-item" v-for="item in beneficios" :key="item">
                <div class="benefit-check"><v-icon size="14" color="#E8821A">mdi-check</v-icon></div>
                <span>{{ item }}</span>
              </div>
            </div>
          </div>

          <div class="form-card" v-if="!enviado">
            <div class="form-header">
              <h3 class="form-title">Cadastro de fornecedor</h3>
              <p class="form-sub">Preencha e entraremos em contato</p>
            </div>
            <div class="form-fields">
              <v-text-field v-model="nome" label="Nome ou razao social" variant="outlined" density="comfortable" color="#E8821A" prepend-inner-icon="mdi-domain" />
              <v-text-field v-model="whatsapp" label="WhatsApp para contato" variant="outlined" density="comfortable" color="#E8821A" prepend-inner-icon="mdi-whatsapp" placeholder="(00) 00000-0000" @input="mascaraTelefone" maxlength="15" />
              <v-select v-model="tipoProduto" :items="tiposProduto" label="Tipo de produto" variant="outlined" density="comfortable" color="#E8821A" />
              <v-select v-model="atuacao" :items="atuacoes" label="Area de atuacao" variant="outlined" density="comfortable" color="#E8821A" />
              <v-textarea v-model="descricao" label="Fale mais sobre sua empresa e produtos" variant="outlined" rows="3" color="#E8821A" />
            </div>
            <a :href="whatsappLink" target="_blank" class="btn-submit" @click="confirmarEnvio">
              Quero ser fornecedor parceiro
            </a>
            <p class="form-note">Cadastro rapido · Sem burocracia · Resposta agil</p>
          </div>

          <div class="success-card" v-else>
            <div class="success-icon"><v-icon size="48" color="#E8821A">mdi-check-circle</v-icon></div>
            <h3 class="success-title">Cadastro enviado!</h3>
            <p class="success-text">Recebemos seu cadastro. Nossa equipe vai analisar e entrar em contato pelo WhatsApp para dar continuidade a parceria.</p>
            <div class="success-info">
              <v-icon size="16" color="#E8821A" class="mr-2">mdi-clock-outline</v-icon>
              Retorno em: <strong>ate 24 horas</strong>
            </div>
            <button class="btn-novo" @click="novoCadastro">Fazer novo cadastro</button>
          </div>

        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const nome = ref(''); const whatsapp = ref(''); const tipoProduto = ref(''); const atuacao = ref(''); const descricao = ref('')
const enviado = ref(false)

function mascaraTelefone() {
  let v = whatsapp.value.replace(/\D/g, '').slice(0, 11)
  if (v.length <= 10) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  else v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  whatsapp.value = v
}
function confirmarEnvio() { setTimeout(() => { enviado.value = true }, 500) }
function novoCadastro() { nome.value = ''; whatsapp.value = ''; tipoProduto.value = ''; atuacao.value = ''; descricao.value = ''; enviado.value = false }

const beneficios = [
  'Acesso a demandas reais de industrias e distribuidores',
  'Pedidos recorrentes com clientes qualificados',
  'Volume garantido em operacoes B2B',
  'Sem mensalidade — modelo por resultado',
  'Pagamento agil e processo transparente',
  'Suporte da equipe GW Brasil Sul em cada operacao',
]
const tiposProduto = [
  'Oleos vegetais',
  'Gorduras vegetais',
  'Azeites e oleos especiais',
  'Margarinas industriais',
  'Insumos para frigorificos',
  'Outros insumos alimenticios',
]
const atuacoes = [
  'Sul do Brasil',
  'Sudeste do Brasil',
  'Sul e Sudeste',
  'Todo o Brasil',
]
const whatsappLink = 'https://wa.me/5521987740643?text=Ola%2C%20tenho%20interesse%20em%20ser%20fornecedor%20parceiro%20da%20GW%20Brasil%20Sul!'
</script>

<style scoped>
.page-header { background: #1B2B6B; padding: 36px 16px 28px; }
.page-label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #E8821A; margin-bottom: 8px; }
.page-title { font-size: clamp(24px,3.5vw,48px); font-weight: 800; color: #fff; letter-spacing: -0.03em; margin-bottom: 6px; line-height: 1.05; }
.page-sub { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.5; }
.section-label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #E8821A; margin-bottom: 16px; }
.section-title { font-size: clamp(22px,3vw,34px); font-weight: 800; color: #1B2B6B; letter-spacing: -0.02em; margin-bottom: 32px; line-height: 1.1; }
.partner-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
.benefits-list { display: flex; flex-direction: column; gap: 14px; }
.benefit-item { display: flex; align-items: center; gap: 12px; font-size: 15px; color: #333; }
.benefit-check { width: 28px; height: 28px; background: #FFF4E8; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.form-card { background: #F8F8F8; border-radius: 20px; padding: 36px; }
.form-header { margin-bottom: 24px; }
.form-title { font-size: 20px; font-weight: 700; color: #1B2B6B; margin-bottom: 4px; }
.form-sub { font-size: 13px; color: #999; }
.form-fields { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; }
.btn-submit { display: flex; align-items: center; justify-content: center; gap: 10px; background: #1B2B6B; color: #fff; font-size: 15px; font-weight: 600; padding: 14px; border-radius: 10px; text-decoration: none; transition: all 0.2s; }
.btn-submit:hover { background: #E8821A; }
.form-note { text-align: center; font-size: 12px; color: #AAA; margin-top: 14px; }
.success-card { background: #F8F8F8; border-radius: 20px; padding: 48px 32px; text-align: center; }
.success-icon { margin-bottom: 16px; }
.success-title { font-size: 22px; font-weight: 800; color: #1B2B6B; margin-bottom: 12px; }
.success-text { font-size: 14px; color: #666; line-height: 1.7; max-width: 380px; margin: 0 auto 18px; }
.success-info { display: inline-flex; align-items: center; background: #FFF4E8; border-radius: 100px; padding: 8px 18px; font-size: 13px; color: #555; margin-bottom: 24px; }
.success-info strong { color: #E8821A; margin-left: 4px; }
.btn-novo { background: transparent; border: 2px solid #1B2B6B; color: #1B2B6B; font-size: 14px; font-weight: 600; padding: 10px 24px; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
.btn-novo:hover { background: #1B2B6B; color: #fff; }
@media (max-width: 900px) { .partner-grid { grid-template-columns: 1fr; gap: 40px; } }
</style>
