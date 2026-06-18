export function formatBRL(value) {
  const number = Number(value) || 0;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(number);
}

export function formatDateBR(dateString) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(dateString));
}

export function formatDateLongBR(dateString) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(dateString));
}

export function formatTimeBR(dateString) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date(dateString));
}

const STATUS_LABELS = {
  paid: 'Pago',
  pending: 'Pendente',
  processing: 'Processando',
  refunded: 'Estornado',
  canceled: 'Cancelado',
  failed: 'Falhou',
  chargedback: 'Chargeback'
};

export function formatStatus(status) {
  return STATUS_LABELS[status] || status;
}

const PAYMENT_METHOD_LABELS = {
  pix: 'PIX',
  boleto: 'Boleto',
  credit_card: 'Cartão de crédito',
  debit_card: 'Cartão de débito'
};

export function formatPaymentMethod(method) {
  return PAYMENT_METHOD_LABELS[method] || '—';
}

const PAYMENT_METHOD_ICONS = {
  pix: '⚡',
  boleto: '🧾',
  credit_card: '💳',
  debit_card: '💳'
};

export function paymentMethodIcon(method) {
  return PAYMENT_METHOD_ICONS[method] || '🏦';
}

const OPERATION_TYPE_LABELS = {
  venda: 'Venda',
  estorno: 'Estorno',
  chargeback: 'Chargeback',
  transferencia: 'Transferência',
  antecipacao: 'Antecipação',
  taxa: 'Taxa'
};

export function formatOperationType(type) {
  return OPERATION_TYPE_LABELS[type] || type;
}
