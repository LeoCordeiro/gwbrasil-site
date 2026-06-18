<template>
  <div>
    <TTHero />

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

    <!-- POR QUE A GW BRASIL SUL -->
    <section class="section-diff">
      <v-container style="max-width:1280px">
        <div class="diff-layout">

          <div class="diff-visual">
            <div class="diff-big-num">B2B</div>
            <div class="diff-big-label">intermediacao de insumos alimenticios</div>
            <div class="diff-stats">
              <div class="diff-stat" v-for="n in numeros" :key="n.label">
                <div class="diff-stat-value">{{ n.value }}</div>
                <div class="diff-stat-label">{{ n.label }}</div>
              </div>
            </div>
          </div>

          <div class="diff-content">
            <div class="section-eyebrow">Por que a GW Brasil Sul</div>
            <h2 class="section-heading">Nossa forca esta no volume<br>que movimentamos.</h2>
            <p class="section-body">Anos de relacionamento com os maiores atacadistas e fornecedores de insumos alimenticios do Brasil nos permitem negociar condicoes exclusivas — repassadas integralmente ao cliente. Voce nao contrata apenas um intermediador. Voce acessa uma rede que levou anos para ser construida.</p>
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

    <!-- PRODUTOS INTERMEDIADOS -->
    <section class="section-services">
      <v-container style="max-width:1280px">
        <div class="services-layout">

          <div class="services-header">
            <div class="section-eyebrow">Produtos</div>
            <h2 class="section-heading">O que intermediamos<br>para a sua industria.</h2>
            <p class="section-body">Trabalhamos com os principais insumos alimenticios do mercado, sempre nas melhores condicoes comerciais.</p>
            <a href="#" @click.prevent="scrollToCotacao" class="btn-solid">Solicitar cotacao &#x2192;</a>
          </div>

          <div class="services-cards">
            <div class="service-item" v-for="s in produtos" :key="s.title">
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

    <!-- SEGMENTOS ATENDIDOS -->
    <section class="section-rede">
      <v-container style="max-width:1280px">
        <div class="rede-layout">

          <div class="rede-left">
            <div class="section-eyebrow">Segmentos</div>
            <h2 class="section-heading">Quem atendemos.</h2>
            <p class="section-body">Atendemos industrias, distribuidores e operacoes de food service que precisam de insumos alimenticios com regularidade, qualidade e condicoes comerciais competitivas.</p>
            <a href="#" @click.prevent="scrollToCotacao" class="btn-solid" style="display:inline-flex; margin-top:16px">
              Solicitar cotacao &#x2192;
            </a>
          </div>

          <div class="rede-right">
            <div class="rede-card" v-for="r in segmentos" :key="r.title">
              <div class="rede-icon">
                <v-icon size="22" color="#E8821A">{{ r.icon }}</v-icon>
              </div>
              <div class="rede-content">
                <div class="rede-title">{{ r.title }}</div>
                <div class="rede-desc">{{ r.desc }}</div>
              </div>
            </div>
          </div>

        </div>
      </v-container>
    </section>

    <!-- FORMULARIO DE COTACAO -->
    <section id="cotacao" class="section-cotacao">
      <v-container style="max-width:960px">
        <div class="cotacao-section-header">
          <div class="section-eyebrow" style="color:rgba(255,255,255,0.4)">Cotacao</div>
          <h2 class="section-heading" style="color:#fff">Solicite sua cotacao agora.</h2>
          <p class="cotacao-subtitle">Preencha os dados abaixo e receba uma proposta com fornecedor selecionado, especificacao do produto e condicoes comerciais em ate 24 horas uteis.</p>
        </div>

        <div class="cotacao-form-card" v-if="!cotacaoEnviada">
          <div class="form-grid">
            <v-select v-model="produto" :items="produtosOptions" label="Produto desejado" variant="outlined" density="comfortable" color="#E8821A" />
            <v-select v-model="quantidadeForm" :items="quantidadeOptions" label="Quantidade estimada" variant="outlined" density="comfortable" color="#E8821A" />
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

          <a :href="whatsappLink" target="_blank" class="btn-cotacao-submit" @click="confirmarCotacao">
            SOLICITAR COTACAO
          </a>
        </div>

        <div class="cotacao-success" v-else>
          <v-icon size="48" color="#E8821A">mdi-check-circle</v-icon>
          <h3 class="cotacao-success-title">Cotacao recebida!</h3>
          <p class="cotacao-success-text">Nossa equipe entrara em contato em ate 24 horas uteis com a melhor proposta para o seu insumo.</p>
          <button class="btn-nova-cotacao" @click="novaCotacao">Nova cotacao</button>
        </div>

      </v-container>
    </section>

    <!-- COMO FUNCIONA -->
    <section class="section-process">
      <v-container style="max-width:1280px">
        <div class="process-header">
          <div class="section-eyebrow" style="color:rgba(255,255,255,0.4)">Como funciona</div>
          <h2 class="section-heading" style="color:#fff">Do briefing ao fornecimento — sem complicacao.</h2>
        </div>
        <div class="process-steps process-steps-5">
          <div class="process-step" v-for="(step, i) in steps" :key="i">
            <div class="process-step-num">{{ String(i + 1).padStart(2, '0') }}</div>
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

    <!-- CTA FINAL -->
    <section class="section-cta-final">
      <v-container style="max-width:900px; text-align:center">
        <h2 class="cta-final-title">Sua industria merece insumos melhores, com condicoes que voce nao encontraria sozinho.</h2>
        <p class="cta-final-sub">Fale com a GW Brasil Sul e descubra como acessar fornecedores qualificados com condicoes comerciais exclusivas — sem precisar negociar diretamente com dezenas de atacadistas.</p>
        <a href="#" @click.prevent="scrollToCotacao" class="btn-cta-final">SOLICITAR COTACAO AGORA</a>
        <div class="cta-selos">
          <span>Proposta em ate 24 horas</span>
          <span class="selo-divider">&#xB7;</span>
          <span>Fornecedores homologados</span>
          <span class="selo-divider">&#xB7;</span>
          <span>Documentacao completa</span>
          <span class="selo-divider">&#xB7;</span>
          <span>Cobertura nacional</span>
        </div>
      </v-container>
    </section>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import TTHero from '@/components/TTHero.vue'

const trust = [
  { icon: 'mdi-shield-check-outline', label: 'Fornecedores homologados' },
  { icon: 'mdi-map-marker-outline', label: 'Camboriu, SC' },
  { icon: 'mdi-clock-fast', label: 'Proposta em ate 24h' },
  { icon: 'mdi-package-variant-closed', label: 'Insumos alimenticios B2B' },
  { icon: 'mdi-map-marker-radius', label: 'Cobertura nacional' },
]

const numeros = [
  { value: '24h', label: 'Para proposta' },
  { value: '100%', label: 'Coordenado' },
  { value: 'Sul', label: 'Foco regional' },
]

const diferenciais = [
  { title: 'Condicoes que voce nao consegue sozinho', desc: 'Nosso volume de negocios com fornecedores atacadistas garante precos, prazos e condicoes comerciais que industrias e distribuidores individuais nao conseguiriam negociar diretamente.' },
  { title: 'Fornecedores validados e homologados', desc: 'Trabalhamos apenas com fornecedores que ja comprovaram qualidade, regularidade fiscal, laudos tecnicos e pontualidade em entregas reais para a industria alimenticia.' },
  { title: 'Gestao completa da negociacao', desc: 'Voce descreve a necessidade — quantidade, especificacao tecnica e prazo. A GW Brasil Sul negocia, seleciona o fornecedor ideal e coordena todo o processo ate a entrega.' },
  { title: 'Proposta em ate 24 horas', desc: 'Receba uma proposta detalhada com fornecedor selecionado, especificacao do produto, valor e prazo de entrega em ate 24 horas uteis.' },
  { title: 'Cobertura nacional', desc: 'Fornecedores em todo o Brasil — com foco no Sul e Sudeste, onde se concentra a maior industria alimenticia do pais.' },
  { title: 'Documentacao e compliance', desc: 'Coordenamos toda a documentacao exigida pela industria alimenticia — laudos, fichas tecnicas, certificacoes e notas fiscais em conformidade com a legislacao vigente.' },
]

const produtos = [
  { num: '01', icon: 'mdi-water-outline', title: 'Oleos Vegetais', desc: 'Oleo de soja, girassol, canola, palma e milho — em diferentes especificacoes tecnicas para uso industrial.' },
  { num: '02', icon: 'mdi-package-variant-closed', title: 'Gorduras Vegetais', desc: 'Gordura vegetal hidrogenada, interesterificada e shortenings — para panificacao, confeitaria e industria de alimentos processados.' },
  { num: '03', icon: 'mdi-flask-outline', title: 'Azeites e Oleos Especiais', desc: 'Azeites de oliva, oleo de coco e oleos especiais para food service e producao de alimentos premium.' },
  { num: '04', icon: 'mdi-factory', title: 'Margarinas Industriais', desc: 'Margarinas e cremes vegetais em embalagens industriais para uso em panificacao e confeitaria em escala.' },
  { num: '05', icon: 'mdi-snowflake', title: 'Insumos para Frigorificos', desc: 'Oleos e gorduras para processamento de carnes, embutidos e produtos carneos industrializados.' },
  { num: '06', icon: 'mdi-silverware-fork-knife', title: 'Insumos para Food Service', desc: 'Fornecimento de oleos e gorduras para redes de restaurantes, hoteis e cozinhas industriais do litoral catarinense.' },
]

const segmentos = [
  { icon: 'mdi-factory', title: 'Industria Alimenticia', desc: 'Frigorificos, laticinios, panificadoras industriais e processadoras de alimentos que precisam de insumos em volume com regularidade e especificacao tecnica garantida.' },
  { icon: 'mdi-truck-delivery-outline', title: 'Distribuidores e Atacadistas', desc: 'Distribuidores regionais que revendem insumos alimenticios para o varejo e food service e precisam de fornecimento confiavel com condicoes competitivas.' },
  { icon: 'mdi-silverware-fork-knife', title: 'Food Service e Redes de Alimentacao', desc: 'Redes de restaurantes, hoteis, resorts e cozinhas industriais do litoral catarinense que precisam de fornecimento regular com qualidade garantida.' },
  { icon: 'mdi-bread-slice-outline', title: 'Panificacao e Confeitaria Industrial', desc: 'Padarias industriais, redes de confeitaria e produtores de massas que consomem gorduras e oleos em grande volume com especificacoes tecnicas especificas.' },
]

const steps = [
  { icon: 'mdi-clipboard-text-outline', title: 'Voce descreve o insumo', desc: 'Produto, quantidade, especificacao tecnica, frequencia de compra e prazo. Pelo formulario do site, WhatsApp ou e-mail.' },
  { icon: 'mdi-magnify', title: 'Negociamos com os fornecedores', desc: 'Acionamos nossa rede de atacadistas homologados, negociamos as melhores condicoes de preco, prazo e especificacao tecnica para a sua demanda.' },
  { icon: 'mdi-file-check-outline', title: 'Proposta em ate 24 horas', desc: 'Voce recebe uma proposta detalhada com fornecedor selecionado, ficha tecnica do produto, valor e condicoes de entrega.' },
  { icon: 'mdi-handshake-outline', title: 'Aprovacao e coordenacao', desc: 'Com a proposta aprovada, coordenamos toda a documentacao, emissao de nota fiscal, laudos tecnicos e logistica de entrega ate o seu recebimento.' },
  { icon: 'mdi-truck-check-outline', title: 'Entrega confirmada e suporte', desc: 'Acompanhamos a entrega e ficamos disponiveis para as proximas demandas — construindo um relacionamento de fornecimento continuo e confiavel.' },
]

// Form state
const produto = ref('')
const quantidadeForm = ref('')
const frequencia = ref('')
const especificacao = ref('')
const estado = ref('')
const prazo = ref('')
const nomeCompleto = ref('')
const empresaForm = ref('')
const segmentoEmpresa = ref('')
const whatsappForm = ref('')
const emailForm = ref('')
const cotacaoEnviada = ref(false)

function mascaraTelefone() {
  let v = whatsappForm.value.replace(/\D/g, '').slice(0, 11)
  if (v.length <= 10) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  else v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  whatsappForm.value = v
}

function confirmarCotacao() { setTimeout(() => { cotacaoEnviada.value = true }, 500) }
function novaCotacao() {
  produto.value = ''; quantidadeForm.value = ''; frequencia.value = ''; especificacao.value = ''
  estado.value = ''; prazo.value = ''; nomeCompleto.value = ''; empresaForm.value = ''
  segmentoEmpresa.value = ''; whatsappForm.value = ''; emailForm.value = ''
  cotacaoEnviada.value = false
}

function scrollToCotacao() {
  document.getElementById('cotacao')?.scrollIntoView({ behavior: 'smooth' })
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
const whatsappLink = computed(() => {
  const texto = `Ola, gostaria de solicitar uma cotacao de insumos alimenticios.\n\nProduto: ${produto.value}\nQuantidade: ${quantidadeForm.value}\nFrequencia: ${frequencia.value}\nEspecificacao: ${especificacao.value}\nEstado de entrega: ${estado.value}\nPrazo: ${prazo.value}\nNome: ${nomeCompleto.value}\nEmpresa: ${empresaForm.value}\nSegmento: ${segmentoEmpresa.value}\nWhatsApp: ${whatsappForm.value}\nE-mail: ${emailForm.value}`
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
})
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

/* DIFERENCIAIS */
.section-diff { padding: 48px 16px; background: #F5F7FB; }
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

/* SERVICES / PRODUTOS */
.section-services { padding: 48px 16px; background: #fff; }
.services-layout { display: grid; grid-template-columns: 300px 1fr; gap: 48px; align-items: start; }
.services-header { position: sticky; top: 100px; }
.services-header .section-body { margin-bottom: 28px; }
.btn-solid { display: inline-flex; align-items: center; background: #0C1A3E; color: #fff; font-size: 14px; font-weight: 700; padding: 12px 24px; border-radius: 4px; text-decoration: none; transition: all 0.2s; letter-spacing: 0.02em; border: none; cursor: pointer; }
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

/* SEGMENTOS / REDE */
.section-rede { padding: 48px 16px; background: #F5F7FB; }
.rede-layout { display: grid; grid-template-columns: 1fr 1.4fr; gap: 48px; align-items: start; }
.rede-left .section-body { margin-bottom: 8px; }
.rede-right { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.rede-card { border: 1px solid #EBEBEB; border-radius: 12px; padding: 24px 20px; display: flex; align-items: flex-start; gap: 14px; transition: all 0.25s; background: #fff; }
.rede-card:hover { border-color: #E8821A; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
.rede-icon { width: 44px; height: 44px; background: #FFF4E8; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.rede-title { font-size: 14px; font-weight: 700; color: #0C1A3E; margin-bottom: 6px; }
.rede-desc { font-size: 12px; color: #888; line-height: 1.6; }

/* FORMULARIO DE COTACAO */
.section-cotacao { padding: 64px 16px; background: linear-gradient(135deg, #0C1A3E 0%, #1B2B6B 100%); position: relative; overflow: hidden; }
.section-cotacao::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #E8821A, #FF9A2E, #E8821A); }
.cotacao-section-header { text-align: center; margin-bottom: 40px; }
.cotacao-subtitle { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 640px; margin: 0 auto; }
.cotacao-form-card { background: #fff; border-radius: 20px; padding: 36px; box-shadow: 0 24px 64px rgba(0,0,0,0.3); }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 4px; }
.btn-cotacao-submit { display: flex; align-items: center; justify-content: center; background: #E8821A; color: #fff; font-size: 15px; font-weight: 800; padding: 16px; border-radius: 12px; text-decoration: none; transition: all 0.2s; margin-top: 16px; letter-spacing: 0.06em; }
.btn-cotacao-submit:hover { background: #CF7015; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,130,26,0.35); }
.cotacao-success { text-align: center; background: #fff; border-radius: 20px; padding: 56px 40px; box-shadow: 0 24px 64px rgba(0,0,0,0.3); }
.cotacao-success-title { font-size: 24px; font-weight: 900; color: #0C1A3E; margin: 16px 0 12px; }
.cotacao-success-text { font-size: 15px; color: #666; line-height: 1.7; max-width: 460px; margin: 0 auto 24px; }
.btn-nova-cotacao { background: transparent; border: 2px solid #0C1A3E; color: #0C1A3E; font-size: 14px; font-weight: 700; padding: 12px 28px; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
.btn-nova-cotacao:hover { background: #0C1A3E; color: #fff; }

/* PROCESS / COMO FUNCIONA */
.section-process { padding: 48px 16px; background: #0C1A3E; position: relative; overflow: hidden; }
.section-process::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #E8821A, #FF9A2E, #E8821A); }
.process-header { margin-bottom: 28px; }
.process-steps { display: grid; gap: 0; position: relative; }
.process-steps-5 { grid-template-columns: repeat(5, 1fr); }
.process-step { padding: 36px 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); margin-right: -1px; position: relative; transition: background 0.2s; }
.process-step:hover { background: rgba(255,255,255,0.06); }
.process-step:first-child { border-radius: 12px 0 0 12px; }
.process-step:last-child { border-radius: 0 12px 12px 0; margin-right: 0; }
.process-step-num { font-size: 52px; font-weight: 900; color: rgba(232,130,26,0.15); letter-spacing: -0.04em; line-height: 1; margin-bottom: 20px; }
.process-step-icon { width: 44px; height: 44px; background: rgba(232,130,26,0.12); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.process-step-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 10px; }
.process-step-desc { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.65; }
.process-connector { position: absolute; top: 44px; right: -20px; z-index: 2; }

/* CTA FINAL */
.section-cta-final { padding: 64px 16px; background: #0C1A3E; border-top: 3px solid #E8821A; }
.cta-final-title { font-size: clamp(24px,3vw,38px); font-weight: 900; color: #fff; letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 16px; }
.cta-final-sub { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 640px; margin: 0 auto 36px; }
.btn-cta-final { display: inline-flex; align-items: center; gap: 10px; background: #E8821A; color: #fff; font-size: 15px; font-weight: 700; padding: 16px 32px; border-radius: 6px; text-decoration: none; transition: all 0.2s; white-space: nowrap; border: none; cursor: pointer; letter-spacing: 0.04em; }
.btn-cta-final:hover { background: #CF7015; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,130,26,0.35); }
.cta-selos { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 28px; flex-wrap: wrap; }
.cta-selos span { font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 600; letter-spacing: 0.02em; }
.selo-divider { color: rgba(255,255,255,0.2); }

/* RESPONSIVE */
@media (max-width: 1024px) {
  .services-layout { grid-template-columns: 1fr; }
  .services-header { position: static; }
  .diff-layout { grid-template-columns: 1fr; }
  .rede-layout { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .section-services, .section-diff, .section-rede, .section-cotacao, .section-process, .section-cta-final { padding: 56px 16px; }
  .services-cards { grid-template-columns: 1fr; }
  .process-steps-5 { grid-template-columns: 1fr 1fr; }
  .trust-items { justify-content: flex-start; }
  .rede-right { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .cotacao-form-card { padding: 24px 16px; }
}
@media (max-width: 480px) {
  .process-steps-5 { grid-template-columns: 1fr; }
}
</style>
