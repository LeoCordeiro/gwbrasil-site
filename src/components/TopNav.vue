<template>
  <div>
    <div class="support-bar">
      <a href="https://wa.me/5521987740643" target="_blank" rel="noopener" class="support-link">
        <span class="support-icon">📱</span> WhatsApp: (21) 98774-0643
      </a>
      <a href="mailto:atendimentogwbrsul@gwbrsul.com.br" class="support-link">
        <span class="support-icon">✉</span> atendimentogwbrsul@gwbrsul.com.br
      </a>
    </div>
    <nav class="top-nav">
      <div class="top-nav-inner">
        <router-link to="/home">
          <span class="nav-icon">🏠</span>
          <span class="nav-label">Carteira</span>
        </router-link>

        <router-link to="/pagamento">
          <span class="nav-icon">💳</span>
          <span class="nav-label">Pagamento</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TopNav'
}
</script>
