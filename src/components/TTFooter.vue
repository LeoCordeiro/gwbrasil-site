<template>
  <footer class="footer-wrap">
    <div class="footer-top-bar"></div>
    <v-container style="max-width:1280px">

      <div class="footer-main">
        <div class="footer-brand">
          <div class="mb-3">
            <img :src="require('@/assets/tt-logo-header.png')" style="height:80px; width:auto; display:block; margin-bottom:12px" />
          </div>
          <p class="footer-desc">Plataforma B2B de agenciamento de fretes sob demanda. Analisamos sua carga, selecionamos a transportadora ideal e coordenamos toda a operação.</p>
          <div class="footer-address">
            <v-icon size="14" color="#E8821A" class="mr-1">mdi-map-marker-outline</v-icon>
            Av. Paulista, 726 – 13º Andar, Bela Vista – São Paulo, SP
          </div>
        </div>

        <div class="footer-links">
          <div class="footer-col">
            <div class="footer-col-title">Site</div>
            <router-link to="/" class="footer-link">Início</router-link>
            <router-link to="/sobre" class="footer-link">Sobre nós</router-link>
            <router-link to="/como-funciona" class="footer-link">Como funciona</router-link>
            <router-link to="/parceiro" class="footer-link">Seja parceiro</router-link>
            <router-link to="/solicitar" class="footer-link">Cotar frete</router-link>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Empresa</div>
            <span class="footer-info">TURBO TRACK TRANSPORTES LTDA</span>
            <span class="footer-info">CNPJ: 44.686.286/0001-86</span>
            <span class="footer-info">Fundada em 28/12/2021</span>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Contato</div>
            <a href="https://wa.me/5511973372843" target="_blank" class="footer-link footer-contact">
              <v-icon size="13" color="#E8821A" class="mr-1">mdi-whatsapp</v-icon>
              (11) 97337-2843
            </a>
            <a href="mailto:atendimento@turbotrack.com.br" class="footer-link footer-contact">
              <v-icon size="13" color="#E8821A" class="mr-1">mdi-email-outline</v-icon>
              atendimento@turbotrack.com.br
            </a>
            <span class="footer-info mt-2">SAC • Seg–Sex, 8h–18h</span>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Legal</div>
            <router-link to="/termos" class="footer-link">Termos de Uso</router-link>
            <router-link to="/privacidade" class="footer-link">Privacidade</router-link>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} Turbo Track Transportes Ltda. Todos os direitos reservados.</span>
        <span class="footer-cnae">CNAE 5250-8/03 | Agenciamento de cargas</span>
      </div>

    </v-container>
  </footer>
</template>

<style scoped>
.footer-wrap { background: #070F22; padding: 0 0 0; }
.footer-top-bar { height: 3px; background: linear-gradient(90deg, #E8821A, #FF9A2E, #E8821A); }
.footer-main { display: grid; grid-template-columns: 1.2fr 2fr; gap: 80px; padding: 56px 0 40px; }
.logo-mark { width: 40px; height: 40px; background: #E8821A; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 900; color: #fff; flex-shrink: 0; }
.footer-desc { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.7; margin-bottom: 16px; max-width: 300px; }
.footer-address { font-size: 12px; color: rgba(255,255,255,0.35); display: flex; align-items: center; }
.footer-links { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
.footer-col { display: flex; flex-direction: column; gap: 10px; }
.footer-col-title { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 4px; }
.footer-link { font-size: 13px; color: rgba(255,255,255,0.55); text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: #E8821A; }
.footer-contact { display: flex; align-items: center; }
.footer-info { font-size: 12px; color: rgba(255,255,255,0.35); }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: rgba(255,255,255,0.2); flex-wrap: wrap; gap: 8px; }
.footer-cnae { font-size: 11px; color: rgba(255,255,255,0.15); }
@media (max-width: 900px) { .footer-main { grid-template-columns: 1fr; gap: 40px; } .footer-links { grid-template-columns: 1fr 1fr; } }
</style>
