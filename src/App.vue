<template>
  <div style="max-width:600px;margin:40px auto;font-family:Arial">
    <h2>Checkout Transparente</h2>

    <h3>Dados do comprador</h3>

    <input v-model="form.name" placeholder="Nome" /><br /><br />
    <input v-model="form.email" placeholder="Email" /><br /><br />
    <input v-model="form.cpf" placeholder="CPF" /><br /><br />
    <input v-model="form.phone" placeholder="Telefone (DDD+número)" /><br /><br />
    <input v-model="valorReais" placeholder="Valor (R$)" /><br /><br />

    <hr /><br />

    <h3>Dados do cartão</h3>

    <input v-model="card.number" placeholder="Número do cartão" /><br /><br />
    <input v-model="card.name" placeholder="Nome no cartão" /><br /><br />
    <input v-model="card.exp_month" placeholder="Mês (MM)" /><br /><br />
    <input v-model="card.exp_year" placeholder="Ano (AA)" /><br /><br />
    <input v-model="card.cvv" placeholder="CVV" /><br /><br />

    <button @click="pagar">Pagar</button>

    <pre>{{ response }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valorReais: "59,90",
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
      response: null
    };
  },

  mounted() {
    // callback global que o script da Pagar.me chama
    window.PagarmeCheckout = window.PagarmeCheckout || {};
    window.PagarmeCheckout.onSuccess = (data) => {
      this.handleToken(data);
    };
  },

  methods: {
    reaisParaCentavos(valor) {
      return Math.round(parseFloat(valor.replace(",", ".")) * 100);
    },

    copiarParaFormRaiz() {
      document.querySelector('[name=card_number]').value = this.card.number;
      document.querySelector('[name=card_holder_name]').value = this.card.name;
      document.querySelector('[name=card_expiration_date]').value =
        this.card.exp_month + this.card.exp_year;
      document.querySelector('[name=card_cvv]').value = this.card.cvv;
    },

    pagar() {
      this.copiarParaFormRaiz();

      // dispara o submit do form que está no index.html
      document
        .getElementById("pagarme-form")
        .dispatchEvent(new Event("submit"));
    },

    async handleToken(data) {
      const token =
        data.pagarmetoken ||
        data.card?.token ||
        data.token ||
        data.id;

      const payload = {
        ...this.form,
        amount: this.reaisParaCentavos(this.valorReais),
        card_token: token
      };

      const res = await fetch("https://riskcard-bk.onrender.com/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      this.response = await res.json();
    }
  }
};
</script>