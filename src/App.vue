<template>
  <v-app>
    <v-container>
      <v-card class="pa-6" max-width="600" mx-auto>
        <v-card-title>Teste Checkout Transparente</v-card-title>

        <v-text-field v-model="form.name" label="Nome" />
        <v-text-field v-model="form.email" label="Email" />
        <v-text-field v-model="form.cpf" label="CPF (só números)" />
        <v-text-field v-model="form.phone" label="Telefone (DDD+número)" />
        <v-text-field v-model="valorReais" label="Valor (R$)" />

        <v-divider class="my-4" />

        <v-text-field v-model="card.number" label="Número do Cartão" />
        <v-text-field v-model="card.name" label="Nome no Cartão" />
        <v-text-field v-model="card.exp_month" label="Mês (MM)" />
        <v-text-field v-model="card.exp_year" label="Ano (AAAA)" />
        <v-text-field v-model="card.cvv" label="CVV" />

        <v-btn color="primary" @click="pagar">Pagar</v-btn>

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

    async pagar() {
      try {
        const client = await window.pagarme.client.connect({
          public_key: "pk_YlZAe1wCltJVdkay"
        });

        // ✅ GERA O CARD_ID (API NOVA)
        const card = await client.cards.create({
          number: this.card.number,
          holder_name: this.card.name,
          exp_month: this.card.exp_month,
          exp_year: this.card.exp_year, // 2032
          cvv: this.card.cvv,
        });

        const payload = {
          ...this.form,
          amount: this.reaisParaCentavos(this.valorReais),
          card_id: card.id
        };

        console.log("Payload enviado:", payload);

        const res = await fetch("https://riskcard-bk.onrender.com/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        this.response = await res.json();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>