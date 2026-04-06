<template>
  <v-app>
    <v-container>
      <v-card class="pa-6" max-width="600" mx-auto>
        <v-card-title>Teste Checkout Transparente</v-card-title>

        <v-text-field v-model="form.name" label="Nome" />
        <v-text-field v-model="form.email" label="Email" />
        <v-text-field v-model="form.cpf" label="CPF" />
        <v-text-field v-model="form.phone" label="Telefone" />
        <v-text-field v-model="form.amount" label="Valor (centavos)" />

        <v-divider class="my-4" />

        <v-text-field v-model="card.number" label="Número do Cartão" />
        <v-text-field v-model="card.name" label="Nome no Cartão" />
        <v-text-field v-model="card.exp_month" label="Mês" />
        <v-text-field v-model="card.exp_year" label="Ano" />
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
      form: {
        name: "",
        email: "",
        cpf: "",
        phone: "",
        amount: 1000,
        street: "Rua Teste",
        number: "123",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        zipcode: "01001000"
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
    async pagar() {
      const encryptionKey = "SUA_ENCRYPTION_KEY_AQUI";

      const client = await window.pagarme.client.connect({ encryption_key: encryptionKey });

      const cardHash = await client.security.encrypt({
        card_number: this.card.number,
        card_holder_name: this.card.name,
        card_expiration_date: `${this.card.exp_month}${this.card.exp_year}`,
        card_cvv: this.card.cvv
      });

      const payload = {
        ...this.form,
        card_hash: cardHash
      };

      const res = await fetch("http://localhost:3000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      this.response = await res.json();
    }
  }
};
</script>