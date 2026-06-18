<template>
  <footer class="footer-wrap">
    <div class="footer-top-bar"></div>
    <v-container style="max-width:1280px">

      <div class="footer-main">
        <div class="footer-brand">
          <div class="mb-3">
            <img :src="require('@/assets/logoheader.png')" style="height:60px; width:auto; display:block; margin-bottom:12px" />
          </div>
          <p class="footer-desc">Intermediacao de atacado de oleos, gorduras e insumos alimenticios B2B. Negociamos as melhores condicoes com fornecedores homologados e repassamos integralmente ao cliente.</p>
          <div class="footer-address">
            <v-icon size="14" color="#E8821A" class="mr-1">mdi-map-marker-outline</v-icon>
            Camboriu, SC
          </div>
        </div>

        <div class="footer-links">
          <div class="footer-col">
            <div class="footer-col-title">Site</div>
            <router-link to="/" class="footer-link">Inicio</router-link>
            <router-link to="/sobre" class="footer-link">Sobre nos</router-link>
            <router-link to="/como-funciona" class="footer-link">Como funciona</router-link>
            <router-link to="/solicitar" class="footer-link">Solicitar cotacao</router-link>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Empresa</div>
            <span class="footer-info">GW BRASIL SUL LTDA</span>
            <span class="footer-info">CNPJ: 45.721.796/0001-00</span>
            <span class="footer-info">Camboriu, SC</span>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Contato</div>
            <a href="mailto:atendimentogwbrsul@gwbrsul.com.br" class="footer-link footer-contact">
              <v-icon size="13" color="#E8821A" class="mr-1">mdi-email-outline</v-icon>
              atendimentogwbrsul@gwbrsul.com.br
            </a>
            <span class="footer-info mt-2">Seg-Sex, 8h-18h</span>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Legal</div>
            <router-link to="/termos" class="footer-link">Termos de Uso</router-link>
            <router-link to="/privacidade" class="footer-link">Privacidade</router-link>
            <router-link to="/repasse" class="footer-link">Politica de Repasse</router-link>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>GW Brasil Sul · gwbrasilsul.com.br · Camboriu, SC · CNPJ 45.721.796/0001-00</span>
      </div>

    </v-container>
  </footer>
</template>

<style scoped>
.footer-wrap { background: #070F22; padding: 0 0 0; }
.footer-top-bar { height: 3px; background: linear-gradient(90deg, #E8821A, #FF9A2E, #E8821A); }
.footer-main { display: grid; grid-template-columns: 1.2fr 2fr; gap: 80px; padding: 56px 0 40px; }
.footer-desc { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.7; margin-bottom: 16px; max-width: 300px; }
.footer-address { font-size: 12px; color: rgba(255,255,255,0.35); display: flex; align-items: center; }
.footer-links { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
.footer-col { display: flex; flex-direction: column; gap: 10px; }
.footer-col-title { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 4px; }
.footer-link { font-size: 13px; color: rgba(255,255,255,0.55); text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: #E8821A; }
.footer-contact { display: flex; align-items: center; }
.footer-info { font-size: 12px; color: rgba(255,255,255,0.35); }
.footer-bottom { display: flex; justify-content: center; align-items: center; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: rgba(255,255,255,0.2); flex-wrap: wrap; gap: 8px; }
@media (max-width: 900px) { .footer-main { grid-template-columns: 1fr; gap: 40px; } .footer-links { grid-template-columns: 1fr 1fr; } }
</style>
