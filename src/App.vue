<template>
  <div style="max-width:600px;margin:40px auto;font-family:Arial">
    <h2>Checkout Pagar.me V5</h2>

    <h3>Dados do comprador</h3>
    <input v-model="form.name" placeholder="Nome completo" /><br/><br/>
    <input v-model="form.email" placeholder="Email" /><br/><br/>
    <input v-model="form.cpf" placeholder="CPF (apenas números)" /><br/><br/>
    <input v-model="form.phone" placeholder="Telefone (ex: 11999999999)" /><br/><br/>
    <input v-model="valorReais" placeholder="Valor (R$)" /><br/><br/>

    <hr/><br/>

    <h3>Dados do cartão</h3>
    <input v-model="card.number" placeholder="Número do cartão" /><br/><br/>
    <input v-model="card.holder_name" placeholder="Nome no cartão" /><br/><br/>
    <input v-model="card.exp_month" placeholder="Mês (MM)" /><br/><br/>
    <input v-model="card.exp_year" placeholder="Ano (AAAA)" /><br/><br/>
    <input v-model="card.cvv" placeholder="CVV" /><br/><br/>

    <button @click="pagar" :disabled="loading">
      {{ loading ? 'Processando...' : 'Pagar' }}
    </button>

    <div v-if="response">
      <h3>Resposta:</h3>
      <pre>{{ JSON.stringify(response, null, 2) }}</pre>
    </div>

    <div v-if="error" style="color:red">
      <h3>Erro:</h3>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valorReais: "59.90",
      loading: false,
      form: {
        name: "Cliente Teste",
        email: "teste@email.com", 
        cpf: "12345678909",
        phone: "11999999999"
      },
      card: {
        number: "4111111111111111",
        holder_name: "Teste Silva",
        exp_month: "12",
        exp_year: "2025",
        cvv: "123"
      },
      response: null,
      error: null
    };
  },

  methods: {
    reaisParaCentavos(valor) {
      let valorLimpo = valor.toString().replace(/\./g, '').replace(',', '.');
      return Math.round(parseFloat(valorLimpo) * 100);
    },

    async pagar() {
      this.loading = true;
      this.error = null;
      this.response = null;

      if (!this.validarCampos()) {
        this.loading = false;
        return;
      }

      try {
        // 1. Tokenizar cartão via API direta da Pagar.me V5
        console.log("🔐 Tokenizando cartão via API V5...");
        const cardToken = await this.tokenizarCartao();
        
        if (!cardToken) {
          throw new Error("Falha ao gerar token do cartão");
        }

        console.log("✅ Token gerado:", cardToken);

        // 2. Enviar APENAS o token para o backend
        const payload = {
          name: this.form.name,
          email: this.form.email,
          cpf: this.form.cpf.replace(/\D/g, ''),
          phone: this.form.phone.replace(/\D/g, ''),
          amount: this.reaisParaCentavos(this.valorReais),
          card_token: cardToken
        };

        console.log("📤 Enviando para backend:", payload);

        const res = await fetch("https://riskcard-bk.onrender.com/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(JSON.stringify(data));
        }

        console.log("✅ Pagamento realizado:", data);
        this.response = data;
        alert("Pagamento realizado com sucesso!");

      } catch (err) {
        console.error("❌ Erro:", err);
        this.error = err.message;
        alert("Erro: " + err.message);
      } finally {
        this.loading = false;
      }
    },

    async tokenizarCartao() {
      const response = await fetch("https://riskcard-bk.onrender.com/tokenize-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: this.card.number.replace(/\D/g, ''),
          holder_name: this.card.holder_name,
          exp_month: this.card.exp_month,
          exp_year: this.card.exp_year,
          cvv: this.card.cvv
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data.card_token;
    },

    validarCampos() {
      if (!this.form.name) { this.error = "Nome é obrigatório"; return false; }
      if (!this.form.email) { this.error = "Email é obrigatório"; return false; }
      if (!this.form.cpf) { this.error = "CPF é obrigatório"; return false; }
      if (!this.form.phone) { this.error = "Telefone é obrigatório"; return false; }
      if (!this.card.number) { this.error = "Número do cartão é obrigatório"; return false; }
      if (!this.card.holder_name) { this.error = "Nome no cartão é obrigatório"; return false; }
      if (!this.card.exp_month || !this.card.exp_year) { this.error = "Data de validade é obrigatória"; return false; }
      if (!this.card.cvv) { this.error = "CVV é obrigatório"; return false; }
      return true;
    }
  }
};
</script>