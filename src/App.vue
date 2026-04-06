<template>
  <div style="max-width:600px;margin:40px auto;font-family:Arial">
    <h2>Checkout Transparente - Pagar.me v5</h2>

    <h3>Dados do comprador</h3>
    <input v-model="form.name" placeholder="Nome completo" /><br/><br/>
    <input v-model="form.email" placeholder="Email" /><br/><br/>
    <input v-model="form.cpf" placeholder="CPF (apenas números)" /><br/><br/>
    <input v-model="form.phone" placeholder="Telefone (ex: 11999999999)" /><br/><br/>
    <input v-model="valorReais" placeholder="Valor (R$)" /><br/><br/>

    <hr/><br/>

    <h3>Dados do cartão</h3>
    <input v-model="card.number" placeholder="Número do cartão" /><br/><br/>
    <input v-model="card.name" placeholder="Nome no cartão" /><br/><br/>
    <input v-model="card.exp_month" placeholder="Mês (MM)" /><br/><br/>
    <input v-model="card.exp_year" placeholder="Ano (AAAA)" /><br/><br/>
    <input v-model="card.cvv" placeholder="CVV" /><br/><br/>

    <button @click="pagar" :disabled="loading">{{ loading ? 'Processando...' : 'Pagar' }}</button>

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
        name: "",
        email: "",
        cpf: "",
        phone: ""
      },
      card: {
        number: "",
        name: "",
        exp_month: "",
        exp_year: "",
        cvv: ""
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

      // Validação básica
      if (!this.validarCampos()) {
        this.loading = false;
        return;
      }

      try {
        // 1. Gerar token do cartão usando SDK v5
        const cardToken = await this.gerarTokenCartao();
        
        if (!cardToken) {
          throw new Error("Falha ao gerar token do cartão");
        }

        console.log("Token gerado:", cardToken);

        // 2. Preparar payload
        const payload = {
          name: this.form.name,
          email: this.form.email,
          cpf: this.form.cpf.replace(/\D/g, ''),
          phone: this.form.phone.replace(/\D/g, ''),
          amount: this.reaisParaCentavos(this.valorReais),
          card_token: cardToken
        };

        console.log("Enviando payload:", payload);

        // 3. Enviar para o backend
        const res = await fetch("http://localhost:3000/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(JSON.stringify(data));
        }

        this.response = data;
        alert("Pagamento realizado com sucesso!");

      } catch (err) {
        console.error("Erro:", err);
        this.error = err.message;
        alert("Erro ao processar pagamento: " + err.message);
      } finally {
        this.loading = false;
      }
    },

    gerarTokenCartao() {
      return new Promise((resolve, reject) => {
        // Verificar se o SDK está carregado - NOME CORRETO é "Pagarme" (com P maiúsculo)
        if (typeof window.Pagarme === 'undefined') {
          console.error("Objetos disponíveis:", Object.keys(window));
          reject(new Error("SDK Pagar.me não carregado. Objeto 'Pagarme' não encontrado."));
          return;
        }

        console.log("SDK encontrado:", window.Pagarme);

        // Configurar a API key pública
        window.Pagarme.setApiKey("pk_YlZAe1wCltJVdkay");

        // Dados do cartão no formato correto
        const cardData = {
          card_number: this.card.number.replace(/\D/g, ''),
          card_holder_name: this.card.name,
          card_expiration_date: `${this.card.exp_month}${this.card.exp_year}`,
          card_cvv: this.card.cvv
        };

        console.log("Tokenizando cartão:", cardData);

        // Gerar token - método correto do SDK
        window.Pagarme.createToken(cardData, (response, error) => {
          if (error) {
            console.error("Erro na tokenização:", error);
            reject(new Error(error.message || "Erro ao gerar token"));
          } else {
            console.log("Tokenização sucesso:", response);
            resolve(response.id || response.token || response);
          }
        });
      });
    },

    validarCampos() {
      if (!this.form.name) {
        this.error = "Nome é obrigatório";
        return false;
      }
      if (!this.form.email) {
        this.error = "Email é obrigatório";
        return false;
      }
      if (!this.form.cpf) {
        this.error = "CPF é obrigatório";
        return false;
      }
      if (!this.form.phone) {
        this.error = "Telefone é obrigatório";
        return false;
      }
      if (!this.card.number) {
        this.error = "Número do cartão é obrigatório";
        return false;
      }
      if (!this.card.name) {
        this.error = "Nome no cartão é obrigatório";
        return false;
      }
      if (!this.card.exp_month || !this.card.exp_year) {
        this.error = "Data de validade é obrigatória";
        return false;
      }
      if (!this.card.cvv) {
        this.error = "CVV é obrigatório";
        return false;
      }
      return true;
    }
  }
};
</script>