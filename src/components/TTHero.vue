<template>
  <div class="hero-wrap">
    <div class="hero-side-bar"></div>
    <v-container style="max-width:1280px" class="py-0">
      <div class="hero-inner">

        <div class="hero-left">
          <div class="hero-eyebrow">
            <span class="eyebrow-line"></span>
            Intermediacao de Insumos Alimenticios B2B
          </div>

          <h1 class="hero-title">
            Insumos alimenticios certos,<br>
            nas melhores condicoes<br>
            <span class="hero-accent">do mercado.</span>
          </h1>

          <p class="hero-desc">
            Intermediamos o fornecimento de oleos, gorduras e insumos alimenticios para industrias e distribuidores do Sul do Brasil — com condicoes de preco e prazo que voce nao conseguiria negociando diretamente.
          </p>

          <div class="hero-metrics">
            <div class="metric" v-for="m in metricas" :key="m.label">
              <div class="metric-value">{{ m.value }}</div>
              <div class="metric-label">{{ m.label }}</div>
            </div>
          </div>

          <div class="hero-contact">
            <a href="mailto:atendimentogwbrsul@gwbrsul.com.br" class="contact-item">
              <v-icon size="16" color="#E8821A">mdi-email-outline</v-icon>
              atendimentogwbrsul@gwbrsul.com.br
            </a>
            <span class="contact-divider">&#x2022;</span>
            <span class="contact-item" style="cursor:default">
              <v-icon size="16" color="#E8821A">mdi-map-marker-outline</v-icon>
              Camboriu, SC
            </span>
          </div>
        </div>

        <div class="hero-right">
          <div class="cotacao-card" v-if="!cotacaoEnviada">
            <div class="cotacao-header">
              <v-icon color="#E8821A" size="18">mdi-package-variant-closed</v-icon>
              <span>Cotacao rapida de insumos</span>
            </div>
            <div class="cotacao-body">

              <div class="form-row">
                <v-text-field v-model="empresa" label="Empresa" variant="outlined" density="compact" color="#E8821A" bg-color="white" prepend-inner-icon="mdi-domain" />
                <v-text-field v-model="whatsapp" label="WhatsApp para retorno" variant="outlined" density="compact" color="#E8821A" bg-color="white" prepend-inner-icon="mdi-whatsapp" placeholder="(00) 00000-0000" @input="mascaraTelefone" maxlength="15" />
              </div>

              <div class="form-row">
                <v-select v-model="produtoSel" :items="produtosLista" label="Produto desejado" variant="outlined" density="compact" color="#E8821A" bg-color="white" prepend-inner-icon="mdi-water-outline" />
                <v-select v-model="quantidade" :items="quantidades" label="Quantidade estimada" variant="outlined" density="compact" color="#E8821A" bg-color="white" prepend-inner-icon="mdi-scale-balance" />
              </div>

              <v-textarea v-model="observacoes" label="Especificacao tecnica ou observacoes" variant="outlined" density="compact" color="#E8821A" bg-color="white" rows="2" prepend-inner-icon="mdi-text" />

              <a :href="whatsappLink" target="_blank" class="btn-cotacao" @click="confirmar">
                SOLICITAR COTACAO
              </a>
              <p class="cotacao-note">Proposta em ate 24h · Sem compromisso</p>
            </div>
          </div>

          <div class="cotacao-card success-state" v-else>
            <div class="success-content">
              <v-icon size="44" color="#E8821A">mdi-check-circle</v-icon>
              <h3 class="success-title">Cotacao recebida!</h3>
              <p class="success-text">Nossa equipe entrara em contato em ate 24 horas uteis com a melhor proposta para o seu insumo.</p>
              <button class="btn-nova" @click="novaCotacao">Nova cotacao</button>
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
  { value: 'B2B', label: 'foco corporativo' },
  { value: '24h', label: 'proposta garantida' },
  { value: 'Sul', label: 'cobertura regional' },
]

const empresa = ref('')
const whatsapp = ref('')
const produtoSel = ref('')
const quantidade = ref('')
const observacoes = ref('')
const cotacaoEnviada = ref(false)

function mascaraTelefone() {
  let v = whatsapp.value.replace(/\D/g, '').slice(0, 11)
  if (v.length <= 10) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  else v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  whatsapp.value = v
}

function confirmar() { setTimeout(() => { cotacaoEnviada.value = true }, 500) }
function novaCotacao() {
  empresa.value = ''; whatsapp.value = ''; produtoSel.value = ''; quantidade.value = ''; observacoes.value = ''
  cotacaoEnviada.value = false
}

const produtosLista = [
  'Oleo de soja', 'Oleo de girassol', 'Oleo de canola', 'Gordura vegetal hidrogenada',
  'Gordura interesterificada', 'Shortening', 'Margarina industrial', 'Azeite de oliva',
  'Oleo de coco', 'Outro insumo alimenticio',
]
const quantidades = [
  'Ate 1 tonelada', '1 a 5 toneladas', '5 a 20 toneladas', '20 a 50 toneladas', 'Acima de 50 toneladas',
]

const numero = '5521987740643'
const whatsappLink = computed(() => {
  const texto = `Ola, sou da ${empresa.value} e gostaria de cotar insumos alimenticios.\n\nProduto: ${produtoSel.value}\nQuantidade: ${quantidade.value}\nObservacoes: ${observacoes.value}\nContato: ${whatsapp.value}`
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
