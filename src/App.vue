<template>
  <v-app>
    <v-container>
      <v-card class="pa-6" max-width="600" mx-auto>

        <v-card-title>Teste Checkout Transparente</v-card-title>

        <form
          data-pagarmecheckout-form
          @submit.prevent="onSubmit"
        >
          <v-text-field v-model="form.name" name="name" label="Nome" />

          <v-text-field v-model="form.email" name="email" label="Email" />
          <v-text-field v-model="form.cpf" name="cpf" label="CPF (só números)" />
          <v-text-field v-model="form.phone" name="phone" label="Telefone (DDD+número)" />

          <v-text-field v-model="valorReais" label="Valor (R$)" />

          <v-divider class="my-4" />

          <!-- Campos do cartão com os atributos para tokenizecard.js -->
          <v-text-field
            v-model="card.number"
            name="number"
            data-pagarmecheckout-element="number"
            label="Número do Cartão"
          />

          <v-text-field
            v-model="card.name"
            name="holder_name"
            data-pagarmecheckout-element="holder_name"
            label="Nome no Cartão"
          />

          <v-text-field
            v-model="card.exp_month"
            name="exp_month"
            data-pagarmecheckout-element="exp_month"
            label="Mês (MM)"
          />

          <v-text-field
            v-model="card.exp_year"
            name="exp_year"
            data-pagarmecheckout-element="exp_year"
            label="Ano (AAAA)"
          />

          <v-text-field
            v-model="card.cvv"
            name="cvv"
            data-pagarmecheckout-element="cvv"
            label="CVV"
          />

          <v-btn type="submit" color="primary">Pagar</v-btn>
        </form>

        <pre>{{ response }}</pre>
      </v-card>
    </v-container>
  </v-app>
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
  methods: {
    reaisParaCentavos(valor) {
      return Math.round(parseFloat(valor.replace(",", ".")) * 100);
    },

    onSubmit() {
      // O tokenizecard.js irá interceptar esse submit
      // e chamar automaticamente PagarmeCheckout.init()
      window.PagarmeCheckout.init(
        async (data) => {
          try {
            // token gerado
            const cardToken = data.pagarmetoken;

            // monta o payload completo
            const payload = {
              ...this.form,
              amount: this.reaisParaCentavos(this.valorReais),
              card_token: cardToken
            };

            const res = await fetch("https://riskcard-bk.onrender.com/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });

            this.response = await res.json();
          } catch (err) {
            console.error(err);
            this.response = err;
          }
        },
        (error) => {
          console.error("Erro tokenize:", error);
          this.response = error;
        }
      );
    }
  }
};
</script>