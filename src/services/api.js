// Centraliza as chamadas de API da carteira.
// Em v1 os dados retornados são mockados, mas a assinatura das funções já
// reflete os endpoints reais para facilitar a futura substituição.

import { logError } from '../utils/logger';
import RANDOM_CUSTOMERS from '../../resorce/items.json';

const MOCK_LATENCY = 400;

function mockResponse(data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), MOCK_LATENCY));
}

// Dados do recebedor e do saldo, no formato do extrato/saldo do Pagar.me
// (GET /recipients/{id} e GET /recipients/{id}/balance).
const MOCK_ACCOUNT = {
  recipient_name: 'CARTEIRA DO LEONARDO',
  document: '123.456.789-00',
  account_number: '58219-3',
  agency: '0001',
  bank_code: '077',
  account_type: 'Conta corrente',
  waiting_funds_balance: 968.90,
  pending_requests: [
    { id: 'req_001', type: 'transferencia', date: '2025-06-12T09:00:00Z', amount: 50.00 },
    { id: 'req_002', type: 'transferencia', date: '2025-06-12T09:00:00Z', amount: 25.00 },
    { id: 'req_003', type: 'antecipacao', date: '2025-06-13T09:00:00Z', amount: 200.00 }
  ]
};

// GET /recipients/{userId} (dados do recebedor, saldo a receber e solicitações pendentes)
export function getAccount(userId) {
  return mockResponse({
    ...MOCK_ACCOUNT,
    pending_requests: [...MOCK_ACCOUNT.pending_requests]
  });
}

const RECIPIENT_ORDERS_URL = 'https://pggenerbk.onrender.com/recipient-orders';

const BANK_ACCOUNT_TYPE_LABELS = {
  checking: 'Conta corrente',
  savings: 'Conta poupança',
  payment: 'Conta de pagamento'
};

// GET /recipient-orders?recipient_id={userId} (endpoint real do recebedor:
// dados bancários + saldo disponível, em centavos, para a tela de Carteira)
export async function getRecipientOrders(userId) {
  let res;

  try {
    res = await fetch(`${RECIPIENT_ORDERS_URL}?recipient_id=${userId}`);
  } catch (e) {
    logError('getRecipientOrders', e, { userId });
    throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    logError('getRecipientOrders', new Error(data.message || `Erro HTTP ${res.status}`), { userId, status: res.status, response: data });
    throw new Error('Não foi possível carregar os dados da carteira. Tente novamente em alguns instantes.');
  }

  const recipient = data.recipient || {};
  const bankAccount = recipient.default_bank_account || {};
  const balance = data.balance || {};

  return {
    account: {
      recipient_name: recipient.name || '',
      document: recipient.document || '',
      account_number: bankAccount.account_number
        ? `${bankAccount.account_number}-${bankAccount.account_check_digit || ''}`
        : '',
      agency: bankAccount.branch_number || '',
      bank_code: bankAccount.bank || '',
      account_type: BANK_ACCOUNT_TYPE_LABELS[bankAccount.type] || bankAccount.type || '',
      pending_requests: []
    },
    balance: (balance.available_amount || 0) / 100,
    receivable: (balance.waiting_funds_amount || 0) / 100
  };
}

const ORDERS_URL = 'https://pggenerbk.onrender.com/api/v2/orders';
export const ORDERS_PAGE_SIZE = 10;

// GET /api/v2/orders?page={page}&size=10&recipient_id={userId} (movimentações do
// recebedor, paginadas de 10 em 10, no formato de pedidos/orders do Pagar.me)
export async function getOrders(page = 1, userId) {
  let res;

  try {
    res = await fetch(`${ORDERS_URL}?page=${page}&size=${ORDERS_PAGE_SIZE}&recipient_id=${userId}`);
  } catch (e) {
    logError('getOrders', e, { userId, page });
    throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    logError('getOrders', new Error(data.message || `Erro HTTP ${res.status}`), { userId, page, status: res.status, response: data });
    throw new Error('Não foi possível carregar as movimentações. Tente novamente em alguns instantes.');
  }

  const orders = (data.data || []).map((order) => ({
    id: order.id,
    code: order.code,
    customerName: (order.customer && order.customer.name) || '',
    amount: (order.amount || 0) / 100,
    status: order.status,
    created_at: order.created_at
  }));

  return {
    orders,
    total: (data.paging && data.paging.total) || 0
  };
}

// DELETE /recipients/{userId}/pending-requests/{id}
export function cancelPendingRequest(id, userId) {
  MOCK_ACCOUNT.pending_requests = MOCK_ACCOUNT.pending_requests.filter((r) => r.id !== id);
  return mockResponse({ success: true });
}

// Indicadores da tela de Resumo, no padrão do dashboard do Pagar.me.
// Em produção esses dados seriam calculados agregando GET /transactions
// (ou /charges) no período selecionado:
//  - total_transactions / total_volume / average_ticket -> contagem e soma do campo amount
//  - status_summary    -> agrupado pelo campo status (paid = Aprovadas;
//                          pending/processing = Aguardando pagamento;
//                          refunded/canceled/failed/chargedback = Estornadas)
//  - payment_methods   -> agrupado pelo campo payment_method
//  - card_brands       -> agrupado pelo campo card.brand (transações de cartão)
//  - decline_reasons   -> agrupado pelo motivo de recusa (acquirer/antifraud/outros)
//  - installments      -> agrupado pelo campo card.installments (1 a 12)
//  - volume_by_weekday -> soma de amount agrupada pelo dia da semana de created_at
const MOCK_RESUMO = {
  '7d': {
    label: '06/06/2025 a 12/06/2025',
    total_transactions: 16,
    average_ticket: 240.16,
    total_volume: 3842.50,
    status_summary: [
      { status: 'paid', label: 'Aprovadas', count: 11, color: '#2563eb' },
      { status: 'pending', label: 'Aguardando pagamento', count: 3, color: '#f59e0b' },
      { status: 'refunded', label: 'Estornadas', count: 2, color: '#a855f7' }
    ],
    payment_methods: [
      { method: 'credit_card', label: 'Cartão de crédito', percent: 45 },
      { method: 'pix', label: 'PIX', percent: 35 },
      { method: 'boleto', label: 'Boleto', percent: 15 },
      { method: 'debit_card', label: 'Cartão de débito', percent: 5 }
    ],
    card_brands: [
      { brand: 'visa', label: 'Visa', percent: 50 },
      { brand: 'mastercard', label: 'Mastercard', percent: 35 },
      { brand: 'elo', label: 'Elo', percent: 10 },
      { brand: 'outros', label: 'Outros', percent: 5 }
    ],
    decline_reasons: [
      { reason: 'acquirer', label: 'Banco emissor', percent: 60 },
      { reason: 'antifraud', label: 'Antifraude', percent: 30 },
      { reason: 'outros', label: 'Outros', percent: 10 }
    ],
    installments: [42, 28, 24, 30, 16, 20, 38, 18, 20, 16, 24, 14],
    volume_by_weekday: [
      { day: 'DOM', value: 18 },
      { day: 'SEG', value: 52 },
      { day: 'TER', value: 30 },
      { day: 'QUA', value: 35 },
      { day: 'QUI', value: 26 },
      { day: 'SEX', value: 50 },
      { day: 'SAB', value: 42 }
    ]
  },
  '30d': {
    label: '13/05/2025 a 12/06/2025',
    total_transactions: 64,
    average_ticket: 240.16,
    total_volume: 15370.00,
    status_summary: [
      { status: 'paid', label: 'Aprovadas', count: 44, color: '#2563eb' },
      { status: 'pending', label: 'Aguardando pagamento', count: 12, color: '#f59e0b' },
      { status: 'refunded', label: 'Estornadas', count: 8, color: '#a855f7' }
    ],
    payment_methods: [
      { method: 'credit_card', label: 'Cartão de crédito', percent: 45 },
      { method: 'pix', label: 'PIX', percent: 35 },
      { method: 'boleto', label: 'Boleto', percent: 15 },
      { method: 'debit_card', label: 'Cartão de débito', percent: 5 }
    ],
    card_brands: [
      { brand: 'visa', label: 'Visa', percent: 50 },
      { brand: 'mastercard', label: 'Mastercard', percent: 35 },
      { brand: 'elo', label: 'Elo', percent: 10 },
      { brand: 'outros', label: 'Outros', percent: 5 }
    ],
    decline_reasons: [
      { reason: 'acquirer', label: 'Banco emissor', percent: 60 },
      { reason: 'antifraud', label: 'Antifraude', percent: 30 },
      { reason: 'outros', label: 'Outros', percent: 10 }
    ],
    installments: [168, 112, 96, 120, 64, 80, 152, 72, 80, 64, 96, 56],
    volume_by_weekday: [
      { day: 'DOM', value: 72 },
      { day: 'SEG', value: 208 },
      { day: 'TER', value: 120 },
      { day: 'QUA', value: 140 },
      { day: 'QUI', value: 104 },
      { day: 'SEX', value: 200 },
      { day: 'SAB', value: 168 }
    ]
  },
  month: {
    label: '01/06/2025 a 12/06/2025',
    total_transactions: 24,
    average_ticket: 240.16,
    total_volume: 5763.75,
    status_summary: [
      { status: 'paid', label: 'Aprovadas', count: 17, color: '#2563eb' },
      { status: 'pending', label: 'Aguardando pagamento', count: 2, color: '#f59e0b' },
      { status: 'refunded', label: 'Estornadas', count: 5, color: '#a855f7' }
    ],
    payment_methods: [
      { method: 'credit_card', label: 'Cartão de crédito', percent: 50 },
      { method: 'pix', label: 'PIX', percent: 28 },
      { method: 'boleto', label: 'Boleto', percent: 15 },
      { method: 'debit_card', label: 'Cartão de débito', percent: 7 }
    ],
    card_brands: [
      { brand: 'visa', label: 'Visa', percent: 55 },
      { brand: 'mastercard', label: 'Mastercard', percent: 30 },
      { brand: 'elo', label: 'Elo', percent: 10 },
      { brand: 'outros', label: 'Outros', percent: 5 }
    ],
    decline_reasons: [
      { reason: 'acquirer', label: 'Banco emissor', percent: 55 },
      { reason: 'antifraud', label: 'Antifraude', percent: 35 },
      { reason: 'outros', label: 'Outros', percent: 10 }
    ],
    installments: [50, 35, 30, 38, 22, 26, 48, 24, 26, 20, 30, 18],
    volume_by_weekday: [
      { day: 'DOM', value: 27 },
      { day: 'SEG', value: 78 },
      { day: 'TER', value: 45 },
      { day: 'QUA', value: 53 },
      { day: 'QUI', value: 39 },
      { day: 'SEX', value: 75 },
      { day: 'SAB', value: 63 }
    ]
  }
};

// GET /recipients/{userId}/resumo?period=7d|30d|month
export function getResumo(period = '7d', userId) {
  return mockResponse(MOCK_RESUMO[period] || MOCK_RESUMO['7d']);
}

const TRANSFER_URL = 'https://pggenerbk.onrender.com/api/v2/transfer';

// POST /api/v2/transfer/{recipient_id} (saque real: amount em centavos, ex: R$ 50,00 -> 5000)
export async function withdraw(amount, userId) {
  let res;

  try {
    res = await fetch(`${TRANSFER_URL}/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
  } catch (e) {
    logError('withdraw', e, { userId, amount });
    throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMessage = (data.error && data.error.message) || data.message || 'Não foi possível concluir o saque. Tente novamente em alguns instantes.';
    logError('withdraw', new Error(errorMessage), { userId, amount, status: res.status, response: data });
    throw new Error(errorMessage);
  }

  return data;
}

const CREATE_ORDER_URL = 'https://pggenerbk.onrender.com/api/create-order';
const ORDER_CODE = 'pedido_pix_001';

// Recebedor da plataforma usado no split de toda cobrança (fica com 0%, sem
// repasse), enquanto o restante (100%) vai para o recebedor logado (userId).
const SPLIT_PLATFORM_RECIPIENT_ID = 're_cmq6mj76jlxm40l9tgl7abzh4';

function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

// Sorteia um cliente fictício de resorce/items.json para usar como pagador
// na geração do PIX, Boleto e Cartão de Crédito.
function randomCustomer() {
  const person = RANDOM_CUSTOMERS[Math.floor(Math.random() * RANDOM_CUSTOMERS.length)];
  const phoneDigits = onlyDigits(person.telefone);

  return {
    name: person.nome,
    email: person.email,
    type: 'individual',
    document: onlyDigits(person.cpf),
    phones: {
      home_phone: {
        country_code: '55',
        area_code: phoneDigits.slice(0, 2),
        number: phoneDigits.slice(2)
      }
    },
    address: person.address
  };
}

// Split padrão de toda cobrança: recebedor da plataforma com 0% e o
// recebedor logado com 100% (e responsável pelas taxas).
function buildSplit(userId) {
  return [
    { recipient_id: SPLIT_PLATFORM_RECIPIENT_ID, amount: 0, type: 'percentage' },
    {
      recipient_id: userId,
      amount: 100,
      type: 'percentage',
      options: { charge_remainder_fee: true, charge_processing_fee: true, liable: true }
    }
  ];
}

// POST /api/create-order — chamada compartilhada por PIX e Boleto.
async function createOrder(payload, context, logDetails, genericErrorMessage) {
  let res;

  try {
    res = await fetch(CREATE_ORDER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    logError(context, e, logDetails);
    throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.success) {
    const apiMessage = (data.error && data.error.message) || data.message;
    logError(context, new Error(apiMessage || `Erro HTTP ${res.status}`), { ...logDetails, status: res.status, response: data });
    throw new Error(apiMessage || genericErrorMessage);
  }

  return data;
}

// POST /api/create-order (cobrança PIX real, com split de 100% para o
// recebedor logado e cliente sorteado de resorce/items.json)
export async function generatePix({ description, amount, expiration_ms, userId }) {
  const payload = {
    code: ORDER_CODE,
    items: [
      {
        amount: Math.round(Number(amount) * 100),
        description,
        quantity: 1,
        code: 'Item_Liberacao'
      }
    ],
    customer: randomCustomer(),
    payments: [
      {
        payment_method: 'pix',
        pix: {
          expires_in: Math.round(expiration_ms / 1000)
        },
        split: buildSplit(userId)
      }
    ]
  };

  const data = await createOrder(payload, 'generatePix', { userId, amount }, 'Não foi possível gerar o PIX. Tente novamente em alguns instantes.');

  const pix = data.pix || {};

  return {
    pix_code: pix.qr_code,
    copy_paste: pix.qr_code,
    qr_code_url: pix.qr_code_url,
    expires_at: pix.expires_at
  };
}

const BOLETO_NOSSO_NUMERO = '1';
const BOLETO_TYPE = 'DM';

// POST /api/create-order (cobrança Boleto real, com split de 100% para o
// recebedor logado e cliente sorteado de resorce/items.json; document_number
// e bank usam os dados bancários do próprio recebedor)
export async function generateBoleto({ description, amount, userId }) {
  const { account } = await getRecipientOrders(userId);

  const payload = {
    code: ORDER_CODE,
    items: [
      {
        amount: Math.round(Number(amount) * 100),
        description,
        quantity: 1,
        code: 'Item_Liberacao'
      }
    ],
    customer: randomCustomer(),
    payments: [
      {
        payment_method: 'boleto',
        boleto: {
          nosso_numero: BOLETO_NOSSO_NUMERO,
          document_number: onlyDigits(account.document),
          bank: account.bank_code,
          instructions: description,
          type: BOLETO_TYPE
        },
        split: buildSplit(userId)
      }
    ]
  };

  const data = await createOrder(payload, 'generateBoleto', { userId, amount }, 'Não foi possível gerar o boleto. Tente novamente em alguns instantes.');

  const charges = (data.order && data.order.charges) || [];
  const lastTransaction = (charges[0] && charges[0].last_transaction) || {};

  return {
    pdf_url: lastTransaction.pdf,
    line: lastTransaction.line,
    barcode_url: lastTransaction.barcode,
    due_at: lastTransaction.due_at
  };
}

const CARD_INSTALLMENTS = 1;

// Tamanho máximo aceito pelo gateway para o statement_descriptor (soft
// descriptor exibido na fatura do cartão).
const CARD_STATEMENT_DESCRIPTOR_MAX_LENGTH = 13;

// POST /api/create-order (cobrança de Cartão de Crédito real, com split de
// 100% para o recebedor logado; nome e CPF do titular vêm do formulário,
// enquanto e-mail, telefone e endereço são sorteados de resorce/items.json.
// O endereço sorteado é usado tanto em customer.address quanto em
// payments[0].credit_card.card.billing_address)
export async function generateCreditCard({ description, amount, card, holderName, cpf, userId }) {
  const customer = {
    ...randomCustomer(),
    name: holderName,
    document: onlyDigits(cpf)
  };

  const payload = {
    code: ORDER_CODE,
    items: [
      {
        amount: Math.round(Number(amount) * 100),
        description,
        quantity: 1,
        code: 'Item_Liberacao'
      }
    ],
    customer,
    payments: [
      {
        payment_method: 'credit_card',
        credit_card: {
          card: {
            number: onlyDigits(card.number),
            holder_name: card.holder_name,
            exp_month: parseInt(card.exp_month, 10),
            exp_year: parseInt(card.exp_year, 10),
            cvv: card.cvv,
            billing_address: customer.address
          },
          installments: CARD_INSTALLMENTS,
          capture: true,
          statement_descriptor: String(description || '').slice(0, CARD_STATEMENT_DESCRIPTOR_MAX_LENGTH)
        },
        split: buildSplit(userId)
      }
    ]
  };

  const data = await createOrder(payload, 'generateCreditCard', { userId, amount }, 'Não foi possível processar o pagamento com o cartão. Tente novamente em alguns instantes.');

  const charges = (data.order && data.order.charges) || [];
  const charge = charges[0] || {};
  const lastTransaction = charge.last_transaction || {};
  const transactionCard = lastTransaction.card || {};

  return {
    status: charge.status,
    acquirer_message: lastTransaction.acquirer_message,
    card_brand: transactionCard.brand,
    last_four_digits: transactionCard.last_four_digits
  };
}
