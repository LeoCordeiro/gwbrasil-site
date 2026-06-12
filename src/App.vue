<template>
  <div class="page">
    <div class="checkout">

      <div class="header">
        <h1>Finalizar Pagamento</h1>
        <p>Pagamento seguro via cartão de crédito</p>
      </div>

      <!-- Comprador -->
      <div class="card">
        <h2>Dados do comprador</h2>

        <div class="field">
          <label>Nome completo</label>
          <input v-model="form.name">
        </div>

        <div class="field">
          <label>E-mail</label>
          <input v-model="form.email">
        </div>

        <div class="row">
          <div class="field">
            <label>CPF</label>
            <input v-model="form.cpf">
          </div>

          <div class="field">
            <label>Telefone</label>
            <input v-model="form.phone">
          </div>
        </div>

        <div class="field">
          <label>Valor (R$)</label>
          <input v-model="valorReais">
        </div>
      </div>

      <!-- Cartão -->
      <div class="card">

        <h2>Pagamento</h2>

        <div class="field">
          <label>Número do cartão</label>
          <input
            v-model="card.number"
            maxlength="19"
            placeholder="0000 0000 0000 0000"
          >
        </div>

        <div class="field">
          <label>Nome impresso</label>
          <input v-model="card.holder_name">
        </div>

        <div class="row">

          <div class="field">
            <label>Mês</label>
            <input
              v-model="card.exp_month"
              placeholder="MM"
            >
          </div>

          <div class="field">
            <label>Ano</label>
            <input
              v-model="card.exp_year"
              placeholder="AAAA"
            >
          </div>

          <div class="field">
            <label>CVV</label>
            <input
              v-model="card.cvv"
              type="password"
              maxlength="4"
            >
          </div>

        </div>

      </div>

      <button
        class="pay-button"
        @click="pagar"
        :disabled="loading"
      >
        {{ loading ? "Processando pagamento..." : `Pagar R$ ${valorReais}` }}
      </button>

      <div
        class="success"
        v-if="response"
      >
        <strong>Pagamento realizado!</strong>

        <pre>{{ JSON.stringify(response,null,2) }}</pre>

      </div>

      <div
        class="error"
        v-if="error"
      >
        {{ error }}
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valorReais: "50",
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

    reaisParaCentavos(valor){
      let valorLimpo = valor.toString().replace(/\./g,'').replace(',','.');
      return Math.round(parseFloat(valorLimpo)*100);
    },

    validarCampos(){

      if(!this.form.name) return this.error="Nome obrigatório";

      if(!this.form.email) return this.error="Email obrigatório";

      if(!this.form.cpf) return this.error="CPF obrigatório";

      if(!this.form.phone) return this.error="Telefone obrigatório";

      if(!this.card.number) return this.error="Número do cartão obrigatório";

      if(!this.card.holder_name) return this.error="Nome do cartão obrigatório";

      if(!this.card.exp_month) return this.error="Mês obrigatório";

      if(!this.card.exp_year) return this.error="Ano obrigatório";

      if(!this.card.cvv) return this.error="CVV obrigatório";

      return true;

    },

    async pagar(){

      this.loading=true;
      this.error=null;
      this.response=null;

      if(!this.validarCampos()){
        this.loading=false;
        return;
      }

      try{

        const payload={
          name:this.form.name,
          email:this.form.email,
          cpf:this.form.cpf.replace(/\D/g,''),
          phone:this.form.phone.replace(/\D/g,''),
          amount:this.reaisParaCentavos(this.valorReais),

          card:{
            number:this.card.number.replace(/\D/g,''),
            holder_name:this.card.holder_name,
            exp_month:this.card.exp_month,
            exp_year:this.card.exp_year,
            cvv:this.card.cvv
          }

        };

        const res=await fetch("https://pggenerbk.onrender.com/checkout",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(payload)
        });

        const data=await res.json();

        if(!res.ok){
          throw new Error(JSON.stringify(data));
        }

        this.response=data;

      }catch(e){

        this.error=e.message;

      }finally{

        this.loading=false;

      }

    }

  }
}
</script>

<style scoped>

*{
    box-sizing:border-box;
}

.page{

    background:#f5f7fb;
    min-height:100vh;
    display:flex;
    justify-content:center;
    padding:40px 15px;

}

.checkout{

    width:100%;
    max-width:760px;

}

.header{

    text-align:center;
    margin-bottom:25px;

}

.header h1{

    margin:0;
    font-size:32px;
    color:#1f2937;

}

.header p{

    color:#6b7280;

}

.card{

    background:white;
    border-radius:14px;
    padding:25px;
    margin-bottom:20px;
    box-shadow:0 10px 30px rgba(0,0,0,.08);

}

.card h2{

    margin-top:0;
    margin-bottom:20px;
    color:#374151;

}

.field{

    display:flex;
    flex-direction:column;
    margin-bottom:18px;
    flex:1;

}

.field label{

    margin-bottom:7px;
    color:#555;
    font-size:14px;

}

.field input{

    height:48px;
    border:1px solid #ddd;
    border-radius:8px;
    padding:0 15px;
    transition:.2s;
    font-size:15px;

}

.field input:focus{

    outline:none;
    border-color:#2563eb;
    box-shadow:0 0 0 3px rgba(37,99,235,.15);

}

.row{

    display:flex;
    gap:15px;

}

.pay-button{

    width:100%;
    height:55px;
    border:none;
    border-radius:10px;
    background:#2563eb;
    color:white;
    font-size:17px;
    font-weight:bold;
    cursor:pointer;
    transition:.2s;

}

.pay-button:hover{

    background:#1d4ed8;

}

.pay-button:disabled{

    opacity:.7;
    cursor:not-allowed;

}

.success{

    background:#ecfdf5;
    border:1px solid #22c55e;
    padding:20px;
    border-radius:10px;
    margin-top:20px;

}

.error{

    margin-top:20px;
    background:#fef2f2;
    color:#dc2626;
    border:1px solid #ef4444;
    padding:20px;
    border-radius:10px;

}

pre{

    white-space:pre-wrap;
    margin-top:10px;

}

@media(max-width:700px){

.row{

    flex-direction:column;

}

}

</style>