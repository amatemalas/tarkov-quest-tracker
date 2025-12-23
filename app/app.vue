<script setup lang="ts">
import favicon from '~/assets/images/favicon.ico'
import favicon16 from '~/assets/images/favicon-16x16.png'
import favicon32 from '~/assets/images/favicon-32x32.png'

useHead({
  link: [
    { rel: 'shortcut icon', type: 'image/x-icon', href: favicon },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: favicon16 },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: favicon32 }
  ]
})
</script>

<template>
  <div class="app-container">
    <header class="app-header glass-panel">
      <div class="header-content premium-container">
        <h1 class="logo">TARKOV <span class="highlight">TRACKER</span></h1>
        <nav>
          <!-- Future nav items -->
        </nav>
      </div>
    </header>

    <main class="main-content premium-container">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  position: relative;
}

.app-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./images/main/eftMain.jpg'), radial-gradient(circle at 50% 0%, #1a1e18 0%, #050505 60%);
  background-size: cover;
  background-position: center;
  filter: sepia(0.5) opacity(0.85);
  z-index: -1;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0 0 0 0;
  border-bottom: 1px solid var(--border-subtle);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  margin: 0;
  color: var(--text-main);
}

.highlight {
  color: var(--primary-gold);
}

.main-content {
  padding-top: var(--space-lg);
  padding-bottom: var(--space-xl);
}
</style>
