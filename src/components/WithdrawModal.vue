<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-box">
      <button class="modal-close" @click="$emit('close')" aria-label="Fechar">×</button>

      <div class="header">
        <h1>Saque</h1>
        <p>Transfira o saldo da sua carteira</p>
      </div>

      <div class="card balance-card">
        <div class="balance-info">
          <span class="balance-label">Saldo disponível</span>
          <span class="balance-value">{{ formatBRL(balance) }}</span>
        </div>
      </div>

      <div class="card">
        <h2>Solicitar saque</h2>

        <div class="field">
          <label>Valor que deseja receber (R$)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            v-model.number="amount"
            placeholder="0,00"
          >
        </div>

        <div class="summary" v-if="amount">
          <div class="summary-row">
            <span>Taxa de transferência</span>
            <span>{{ formatBRL(FEE) }}</span>
          </div>
          <div class="summary-row total">
            <span>Você irá receber</span>
            <span>{{ formatBRL(receiveAmount) }}</span>
          </div>
        </div>

        <div class="error" v-if="!canWithdraw">Saldo insuficiente para realizar saque (mínimo de {{ formatBRL(MIN_BALANCE) }})</div>
        <div class="error" v-if="error">{{ error }}</div>
        <div class="success" v-if="success">Saque solicitado com sucesso!</div>

        <button class="btn btn-primary" @click="confirmar" :disabled="loading || !canWithdraw">
          {{ loading ? 'Processando...' : 'Confirmar Saque' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { withdraw } from '../services/api';
import { formatBRL } from '../utils/format';
import { logError } from '../utils/logger';

const FEE = 3.60;
const MIN_BALANCE = 3.70;

export default {
  name: 'WithdrawModal',

  props: {
    balance: {
      type: Number,
      default: 0
    }
  },

  emits: ['close', 'success'],

  data() {
    return {
      FEE,
      MIN_BALANCE,
      amount: null,
      loading: false,
      error: null,
      success: false
    };
  },

  computed: {
    userId() {
      return this.$store.getters.userId;
    },

    receiveAmount() {
      const value = Number(this.amount) - FEE;
      return value > 0 ? value : 0;
    },

    canWithdraw() {
      return this.balance > MIN_BALANCE;
    }
  },

  methods: {
    formatBRL,

    validar() {
      const amount = Number(this.amount);

      if (!this.amount) {
        this.error = 'Informe o valor do saque';
        return false;
      }

      if (amount < FEE) {
        this.error = `O valor mínimo de saque é ${formatBRL(FEE)}`;
        return false;
      }

      if (amount > this.balance) {
        this.error = 'Saldo insuficiente para esse saque';
        return false;
      }

      return true;
    },

    async confirmar() {
      this.error = null;
      this.success = false;

      if (!this.validar()) return;

      this.loading = true;

      try {
        const amountInCents = Math.round(Number(this.amount) * 100);
        await withdraw(amountInCents, this.userId);
        this.success = true;
        this.$emit('success', Number(this.amount));
        this.amount = null;
      } catch (e) {
        logError('WithdrawModal.confirmar', e, { userId: this.userId, amount: this.amount });
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
