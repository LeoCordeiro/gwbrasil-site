<template>
  <div class="page">
    <TopNav />

    <div class="container container-wide">

      <div class="header">
        <h1>Carteira</h1>
        <p>Acompanhe o saldo, indicadores e movimentações da sua conta</p>
      </div>

      <div class="error" v-if="error">{{ error }}</div>

      <!-- Recebedor -->
      <div class="card account-card" v-if="account">
        <div class="account-row">
          <div class="account-field">
            <span class="account-label">Recebedor</span>
            <span class="account-value">{{ account.recipient_name }}</span>
          </div>
          <div class="account-field">
            <span class="account-label">Conta</span>
            <span class="account-value">{{ account.account_number }}</span>
          </div>
          <div class="account-field">
            <span class="account-label">Agência</span>
            <span class="account-value">{{ account.agency }}</span>
          </div>
          <div class="account-field">
            <span class="account-label">Banco</span>
            <span class="account-value">{{ account.bank_code }}</span>
          </div>
          <div class="account-field">
            <span class="account-label">Tipo de conta</span>
            <span class="account-value">{{ account.account_type }}</span>
          </div>
        </div>
      </div>

      <!-- Resumo financeiro -->
      <div class="summary-grid">
        <div class="card summary-card">
          <span class="summary-label">Saldo disponível</span>
          <span class="summary-value">{{ formatBRL(balance) }}</span>
          <button class="btn btn-secondary btn-auto" @click="showWithdrawModal = true">Transferir</button>
        </div>

        <div class="card summary-card">
          <span class="summary-label">A receber</span>
          <span class="summary-value">{{ formatBRL(receivable) }}</span>
        </div>

        <div class="card summary-card" v-if="account && account.pending_requests.length">
          <span class="summary-label">Solicitações pendentes</span>
          <ul class="pending-list">
            <li class="pending-item" v-for="req in account.pending_requests" :key="req.id">
              <div class="pending-info">
                <span class="pending-type">{{ formatOperationType(req.type) }}</span>
                <span class="pending-date">{{ formatDateBR(req.date) }}</span>
              </div>
              <span class="pending-amount">
                +{{ formatBRL(req.amount) }}
                <button class="pending-cancel" title="Cancelar solicitação" @click="cancelarSolicitacao(req.id)">×</button>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Indicadores: ocultos até definirmos a fonte de dados real
      <div class="insights-grid" v-if="resumo">
        <div class="card">
          <h2>Transações por status</h2>

          <div class="donut-wrap">
            <div class="donut" :style="donutStyle"></div>

            <ul class="donut-legend">
              <li v-for="s in resumo.status_summary" :key="s.status">
                <span class="legend-dot" :style="{ background: s.color }"></span>
                {{ s.label }}
                <strong>{{ s.count }}</strong>
              </li>
            </ul>
          </div>
        </div>

        <div class="card">
          <h2>Formas de pagamento</h2>

          <ul class="bar-list">
            <li v-for="m in resumo.payment_methods" :key="m.method">
              <span class="bar-list-label">{{ m.label }}</span>
              <span class="bar-list-track"><span class="bar-list-fill" :style="{ width: m.percent + '%' }"></span></span>
              <span class="bar-list-value">{{ m.percent }}%</span>
            </li>
          </ul>
        </div>
      </div>
      -->

      <!-- Filtros -->
      <div class="card filters-card">
        <h2>Filtros</h2>

        <div class="row">
          <div class="field">
            <label>Data inicial</label>
            <input type="date" v-model="filters.startDate">
          </div>

          <div class="field">
            <label>Data final</label>
            <input type="date" v-model="filters.endDate">
          </div>

          <div class="field">
            <label>Situação</label>
            <select v-model="filters.status">
              <option value="all">Todas</option>
              <option value="paid">Pago</option>
              <option value="pending">Pendente</option>
              <option value="processing">Processando</option>
              <option value="canceled">Cancelado</option>
              <option value="failed">Falhou</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label>Buscar por nome ou código do pedido</label>
          <input type="text" v-model="filters.search" placeholder="Ex: Ruth Maria, or_..., pedido_pix_001">
        </div>

        <div class="row filters-actions">
          <button class="btn btn-secondary" @click="limparFiltros">Limpar filtros</button>
        </div>
      </div>

      <!-- Lista de movimentações -->
      <div class="card">
        <div class="extrato-header-row">
          <h2>Movimentações</h2>
          <span class="extrato-count" v-if="!ordersLoading">
            {{ totalOrders }} {{ totalOrders === 1 ? 'resultado' : 'resultados' }}
          </span>
        </div>

        <div class="error" v-if="ordersError">{{ ordersError }}</div>

        <p v-if="ordersLoading">Carregando...</p>

        <template v-else>
          <div class="table-wrap">
            <table class="orders-table">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Nome</th>
                  <th>Valor</th>
                  <th>Situação</th>
                  <th>Criado em</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in filteredOrders" :key="order.id">
                  <td>
                    <span class="order-code">{{ order.code }}</span>
                    <span class="order-id">{{ order.id }}</span>
                  </td>
                  <td>{{ order.customerName }}</td>
                  <td>{{ formatBRL(order.amount) }}</td>
                  <td><span :class="['status-badge', order.status]">{{ formatStatus(order.status) }}</span></td>
                  <td>
                    <span class="order-date">{{ formatDateLongBR(order.created_at) }}</span>
                    <span class="order-time">{{ formatTimeBR(order.created_at) }}</span>
                  </td>
                </tr>

                <tr v-if="filteredOrders.length === 0">
                  <td colspan="5" class="empty-state">Nenhuma movimentação encontrada para os filtros selecionados</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="pagination">
            <button class="btn btn-secondary btn-auto" @click="goToPage(page - 1)" :disabled="page <= 1">Anterior</button>
            <span class="pagination-info">Página {{ page }} de {{ totalPages }}</span>
            <button class="btn btn-secondary btn-auto" @click="goToPage(page + 1)" :disabled="page >= totalPages">Próxima</button>
          </div>
        </template>
      </div>

    </div>

    <WithdrawModal
      v-if="showWithdrawModal"
      :balance="balance"
      @close="showWithdrawModal = false"
      @success="onWithdrawSuccess"
    />
  </div>
</template>

<script>
import TopNav from '../components/TopNav.vue';
import WithdrawModal from '../components/WithdrawModal.vue';
import { getRecipientOrders, getOrders, getResumo, cancelPendingRequest, ORDERS_PAGE_SIZE } from '../services/api';
import { logError } from '../utils/logger';
import {
  formatBRL,
  formatDateBR,
  formatDateLongBR,
  formatTimeBR,
  formatStatus,
  formatOperationType
} from '../utils/format';

export default {
  name: 'HomeView',

  components: {
    TopNav,
    WithdrawModal
  },

  data() {
    return {
      account: null,
      balance: 0,
      receivable: 0,
      resumo: null,
      orders: [],
      totalOrders: 0,
      page: 1,
      ordersLoading: true,
      ordersError: null,
      showWithdrawModal: false,
      error: null,
      filters: {
        startDate: '',
        endDate: '',
        status: 'all',
        search: ''
      }
    };
  },

  computed: {
    userId() {
      return this.$store.getters.userId;
    },

    totalPages() {
      return Math.max(1, Math.ceil(this.totalOrders / ORDERS_PAGE_SIZE));
    },

    filteredOrders() {
      let results = [...this.orders];

      if (this.filters.status !== 'all') {
        results = results.filter((o) => o.status === this.filters.status);
      }

      if (this.filters.startDate) {
        const start = new Date(`${this.filters.startDate}T00:00:00`);
        results = results.filter((o) => new Date(o.created_at) >= start);
      }

      if (this.filters.endDate) {
        const end = new Date(`${this.filters.endDate}T23:59:59`);
        results = results.filter((o) => new Date(o.created_at) <= end);
      }

      if (this.filters.search) {
        const term = this.filters.search.trim().toLowerCase();
        results = results.filter((o) =>
          o.customerName.toLowerCase().includes(term) ||
          o.code.toLowerCase().includes(term) ||
          o.id.toLowerCase().includes(term)
        );
      }

      return results;
    },

    donutStyle() {
      const summary = this.resumo.status_summary;
      const total = summary.reduce((sum, s) => sum + s.count, 0);
      let acc = 0;

      const stops = summary.map((s) => {
        const start = (acc / total) * 360;
        acc += s.count;
        const end = (acc / total) * 360;
        return `${s.color} ${start}deg ${end}deg`;
      });

      return { background: `conic-gradient(${stops.join(', ')})` };
    }
  },

  async created() {
    try {
      const [recipientData, resumo] = await Promise.all([
        getRecipientOrders(this.userId),
        getResumo('7d', this.userId)
      ]);
      this.account = recipientData.account;
      this.balance = recipientData.balance;
      this.receivable = recipientData.receivable;
      this.resumo = resumo;
    } catch (e) {
      logError('HomeView.created', e, { userId: this.userId });
      this.error = e.message;
    }

    await this.loadOrders();
  },

  methods: {
    formatBRL,
    formatDateBR,
    formatDateLongBR,
    formatTimeBR,
    formatStatus,
    formatOperationType,

    async loadOrders() {
      this.ordersLoading = true;
      this.ordersError = null;

      try {
        const result = await getOrders(this.page, this.userId);
        this.orders = result.orders;
        this.totalOrders = result.total;
      } catch (e) {
        logError('HomeView.loadOrders', e, { userId: this.userId, page: this.page });
        this.ordersError = e.message;
      } finally {
        this.ordersLoading = false;
      }
    },

    goToPage(page) {
      if (page < 1 || page > this.totalPages || page === this.page) return;
      this.page = page;
      this.loadOrders();
    },

    limparFiltros() {
      this.filters = {
        startDate: '',
        endDate: '',
        status: 'all',
        search: ''
      };
    },

    async cancelarSolicitacao(id) {
      await cancelPendingRequest(id, this.userId);
      this.account.pending_requests = this.account.pending_requests.filter((r) => r.id !== id);
    },

    onWithdrawSuccess(amount) {
      this.balance = Math.max(this.balance - amount, 0);
    }
  }
}
</script>
