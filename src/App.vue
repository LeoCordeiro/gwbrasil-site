<template>
  <div style="max-width:600px;margin:40px auto;font-family:Arial">
    <h2>Teste Checkout Transparente</h2>

    <form data-pagarmecheckout-form>

      <h3>Dados do comprador</h3>

      <input v-model="form.name" name="name" placeholder="Nome" /><br /><br />
      <input v-model="form.email" name="email" placeholder="Email" /><br /><br />
      <input v-model="form.cpf" name="cpf" placeholder="CPF (só números)" /><br /><br />
      <input v-model="form.phone" name="phone" placeholder="Telefone (DDD+número)" /><br /><br />
      <input v-model="valorReais" placeholder="Valor (R$)" /><br /><br />

      <hr /><br />

      <h3>Dados do cartão</h3>

      <!-- NÃO USAR v-model AQUI -->

      <input
        type="text"
        name="card_number"
        data-pagarmecheckout-element="card_number"
        maxlength="19"
        autocomplete="off"
        placeholder="Número do Cartão"
      /><br /><br />

      <input
        type="text"
        name="card_holder_name"
        data-pagarmecheckout-element="card_holder_name"
        maxlength="64"
        autocomplete="off"
        placeholder="Nome no Cartão"
      /><br /><br />

      <input
        type="text"
        name="card_expiration_date"
        data-pagarmecheckout-element="card_expiration_date"
        maxlength="5"
        autocomplete="off"
        placeholder="MM/AA"
      /><br /><br />

      <input
        type="text"
        name="card_cvv"
        data-pagarmecheckout-element="card_cvv"
        maxlength="4"
        autocomplete="off"
        placeholder="CVV"
      /><br /><br />

      <button type="submit">Pagar</button>
    </form>

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
      response: null
    };
  },
  mounted() {
    window.PagarmeCheckout.init(
      (data) => {
        this.handleToken(data);
      },
      (error) => {
        console.error(error);
        this.response = error;
      }
    );
  },
  methods: {
    reaisParaCentavos(valor) {
      return Math.round(parseFloat(valor.replace(",", ".")) * 100);
    },

    onSubmit() {
    },
    async handleToken(data) {
      const payload = {
        ...this.form,
        amount: this.reaisParaCentavos(this.valorReais),
        card_token: data.pagarmetoken
      };

      const res = await fetch("https://riskcard-bk.onrender.com/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      this.response = await res.json();
    },
  }
};
</script>