<template>
  <div class="page">
    <TopNav />

    <div class="container">

      <div class="header">
        <h1>Gerar Pagamento</h1>
        <p>Escolha a forma de cobrança</p>
      </div>

      <!-- Seleção da forma de cobrança -->
      <div class="method-grid" v-if="!selectedMethod">
        <button class="method-card" @click="selectedMethod = 'pix'">
          <span class="method-icon">⚡</span>
          <span class="method-label">PIX</span>
        </button>

        <button class="method-card" @click="selectedMethod = 'boleto'">
          <span class="method-icon">🧾</span>
          <span class="method-label">Boleto</span>
        </button>

        <button class="method-card" @click="selectedMethod = 'cartao'">
          <span class="method-icon">💳</span>
          <span class="method-label">Cartão de Crédito</span>
        </button>
      </div>

      <!-- PIX -->
      <div class="card" v-if="selectedMethod === 'pix'">
        <a href="#" class="back-link" @click.prevent="selectedMethod = null">&larr; Voltar</a>

        <h2>PIX</h2>

        <div class="field">
          <label>Descrição</label>
          <input v-model="pix.description" placeholder="Descrição do pagamento">
        </div>

        <div class="row">
          <div class="field">
            <label>Valor (R$)</label>
            <input type="number" step="0.01" min="0" v-model.number="pix.amount" placeholder="0,00">
          </div>

          <div class="field">
            <label>Expira em (minutos)</label>
            <input type="number" step="1" min="1" v-model.number="pix.expirationMinutes">
          </div>
        </div>

        <div class="error" v-if="pix.error">{{ pix.error }}</div>

        <button class="btn btn-primary" @click="gerarPix" :disabled="pix.loading">
          {{ pix.loading ? 'Gerando...' : 'Gerar PIX' }}
        </button>

        <div class="result-box" v-if="pix.result">
          <div class="field">
            <label>Código copia e cola</label>
            <div class="copy-row">
              <input readonly :value="pix.result.copy_paste">
              <button class="btn btn-secondary btn-auto" @click="copiarPix">
                {{ pix.copied ? 'Copiado!' : 'Copiar' }}
              </button>
            </div>
          </div>

          <div class="qrcode-wrap" v-if="pix.qrCode">
            <img :src="pix.qrCode" alt="QR Code do PIX">
          </div>
        </div>
      </div>

      <!-- Boleto -->
      <div class="card" v-if="selectedMethod === 'boleto'">
        <a href="#" class="back-link" @click.prevent="selectedMethod = null">&larr; Voltar</a>

        <h2>Boleto</h2>

        <div class="field">
          <label>Descrição</label>
          <input v-model="boleto.description" placeholder="Descrição do pagamento">
        </div>

        <div class="field">
          <label>Valor (R$)</label>
          <input type="number" step="0.01" min="0" v-model.number="boleto.amount" placeholder="0,00">
        </div>

        <div class="error" v-if="boleto.error">{{ boleto.error }}</div>

        <button class="btn btn-primary" @click="gerarBoleto" :disabled="boleto.loading">
          {{ boleto.loading ? 'Gerando...' : 'Gerar Boleto' }}
        </button>

        <div class="result-box" v-if="boleto.result">
          <div class="field">
            <label>Linha digitável</label>
            <div class="copy-row">
              <input readonly :value="boleto.result.line">
              <button class="btn btn-secondary btn-auto" @click="copiarBoleto">
                {{ boleto.copied ? 'Copiado!' : 'Copiar' }}
              </button>
            </div>
          </div>

          <div class="barcode-wrap" v-if="boleto.result.barcode_url">
            <img :src="boleto.result.barcode_url" alt="Código de barras do boleto">
          </div>

          <a
            class="boleto-link"
            :href="boleto.result.pdf_url"
            target="_blank"
            rel="noopener"
            download
          >Visualizar / baixar boleto (PDF)</a>
        </div>
      </div>

      <!-- Cartão de crédito -->
      <div class="card" v-if="selectedMethod === 'cartao'">
        <a href="#" class="back-link" @click.prevent="selectedMethod = null">&larr; Voltar</a>

        <h2>Cartão de Crédito</h2>

        <div class="field">
          <label>Descrição</label>
          <input v-model="cartao.description" placeholder="Descrição do pagamento">
        </div>

        <div class="field">
          <label>Valor (R$)</label>
          <input type="number" step="0.01" min="0" v-model.number="cartao.amount" placeholder="0,00">
        </div>

        <div class="row">
          <div class="field">
            <label>Nome do Titular do Cartão</label>
            <input v-model="cartao.holderName" placeholder="Nome completo do titular">
          </div>

          <div class="field">
            <label>CPF</label>
            <input v-model="cartao.cpf" placeholder="000.000.000-00">
          </div>
        </div>

        <div class="field">
          <label>Número do cartão</label>
          <input
            v-model="cartao.card.number"
            maxlength="19"
            placeholder="0000 0000 0000 0000"
          >
        </div>

        <div class="field">
          <label>Nome impresso</label>
          <input v-model="cartao.card.holder_name">
        </div>

        <div class="row">
          <div class="field">
            <label>Mês</label>
            <input v-model="cartao.card.exp_month" placeholder="MM">
          </div>

          <div class="field">
            <label>Ano</label>
            <input v-model="cartao.card.exp_year" placeholder="AAAA">
          </div>

          <div class="field">
            <label>CVV</label>
            <input v-model="cartao.card.cvv" type="password" maxlength="4">
          </div>
        </div>

        <div class="error" v-if="cartao.error">{{ cartao.error }}</div>

        <button class="btn btn-primary" @click="pagarCartao" :disabled="cartao.loading">
          {{ cartao.loading ? 'Processando pagamento...' : 'Pagar' }}
        </button>

        <div class="result-box" v-if="cartao.response">
          <template v-if="cartao.response.status === 'paid'">
            <strong>Pagamento aprovado!</strong>
          </template>
          <template v-else>
            <strong>Pagamento não autorizado.</strong>
            <p v-if="cartao.response.acquirer_message">{{ cartao.response.acquirer_message }}</p>
          </template>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
import TopNav from '../components/TopNav.vue';
import { generatePix, generateBoleto, generateCreditCard } from '../services/api';
import { logError } from '../utils/logger';

const DEFAULT_PIX_DESCRIPTION = 'Ordem de Liberação';
const DEFAULT_PIX_EXPIRATION_MINUTES = 60;
const DEFAULT_BOLETO_DESCRIPTION = 'Ordem de Pagamento';
const DEFAULT_CARTAO_DESCRIPTION = 'Ordem de Pagamento';

export default {
  name: 'PaymentView',

  components: {
    TopNav
  },

  data() {
    return {
      selectedMethod: null,
      pix: {
        description: DEFAULT_PIX_DESCRIPTION,
        amount: null,
        expirationMinutes: DEFAULT_PIX_EXPIRATION_MINUTES,
        loading: false,
        error: null,
        result: null,
        qrCode: null,
        copied: false
      },
      boleto: {
        description: DEFAULT_BOLETO_DESCRIPTION,
        amount: null,
        loading: false,
        error: null,
        result: null,
        copied: false
      },
      cartao: {
        description: DEFAULT_CARTAO_DESCRIPTION,
        amount: null,
        holderName: 'Cliente Teste',
        cpf: '12345678909',
        loading: false,
        card: {
          number: '4111111111111111',
          holder_name: 'Teste Silva',
          exp_month: '12',
          exp_year: '2030',
          cvv: '123'
        },
        response: null,
        error: null
      }
    };
  },

  computed: {
    userId() {
      return this.$store.getters.userId;
    }
  },

  methods: {
    async gerarPix() {
      this.pix.error = null;
      this.pix.result = null;
      this.pix.qrCode = null;
      this.pix.copied = false;

      if (!this.pix.description) {
        this.pix.error = 'Informe a descrição do PIX';
        return;
      }

      if (!this.pix.amount || this.pix.amount <= 0) {
        this.pix.error = 'Informe um valor válido';
        return;
      }

      if (!this.pix.expirationMinutes || this.pix.expirationMinutes <= 0) {
        this.pix.error = 'Informe um tempo de expiração válido';
        return;
      }

      this.pix.loading = true;

      try {
        const result = await generatePix({
          description: this.pix.description,
          amount: this.pix.amount,
          expiration_ms: this.pix.expirationMinutes * 60 * 1000,
          userId: this.userId
        });

        this.pix.result = result;
        this.pix.qrCode = await QRCode.toDataURL(result.pix_code);
      } catch (e) {
        logError('PaymentView.gerarPix', e, { userId: this.userId, amount: this.pix.amount });
        this.pix.error = e.message || 'Não foi possível gerar o PIX. Tente novamente.';
      } finally {
        this.pix.loading = false;
      }
    },

    async copiarPix() {
      await navigator.clipboard.writeText(this.pix.result.copy_paste);
      this.pix.copied = true;
      setTimeout(() => { this.pix.copied = false; }, 2000);
    },

    async gerarBoleto() {
      this.boleto.error = null;
      this.boleto.result = null;

      if (!this.boleto.description) {
        this.boleto.error = 'Informe a descrição do boleto';
        return;
      }

      if (!this.boleto.amount || this.boleto.amount <= 0) {
        this.boleto.error = 'Informe um valor válido';
        return;
      }

      this.boleto.loading = true;

      try {
        this.boleto.result = await generateBoleto({
          description: this.boleto.description,
          amount: this.boleto.amount,
          userId: this.userId
        });
      } catch (e) {
        logError('PaymentView.gerarBoleto', e, { userId: this.userId, amount: this.boleto.amount });
        this.boleto.error = e.message || 'Não foi possível gerar o boleto. Tente novamente.';
      } finally {
        this.boleto.loading = false;
      }
    },

    validarCartao() {
      if (!this.cartao.description) { this.cartao.error = 'Informe a descrição do pagamento'; return false; }
      if (!this.cartao.amount || this.cartao.amount <= 0) { this.cartao.error = 'Informe um valor válido'; return false; }
      if (!this.cartao.holderName) { this.cartao.error = 'Nome do titular obrigatório'; return false; }
      if (!this.cartao.cpf) { this.cartao.error = 'CPF obrigatório'; return false; }
      if (!this.cartao.card.number) { this.cartao.error = 'Número do cartão obrigatório'; return false; }
      if (!this.cartao.card.holder_name) { this.cartao.error = 'Nome do cartão obrigatório'; return false; }
      if (!this.cartao.card.exp_month) { this.cartao.error = 'Mês obrigatório'; return false; }
      if (!this.cartao.card.exp_year) { this.cartao.error = 'Ano obrigatório'; return false; }
      if (!this.cartao.card.cvv) { this.cartao.error = 'CVV obrigatório'; return false; }

      return true;
    },

    async pagarCartao() {
      this.cartao.error = null;
      this.cartao.response = null;

      if (!this.validarCartao()) return;

      this.cartao.loading = true;

      try {
        this.cartao.response = await generateCreditCard({
          description: this.cartao.description,
          amount: this.cartao.amount,
          card: this.cartao.card,
          holderName: this.cartao.holderName,
          cpf: this.cartao.cpf,
          userId: this.userId
        });
      } catch (e) {
        logError('PaymentView.pagarCartao', e, { userId: this.userId, amount: this.cartao.amount });
        this.cartao.error = e.message || 'Não foi possível processar o pagamento. Tente novamente.';
      } finally {
        this.cartao.loading = false;
      }
    }
  }
}
</script>
