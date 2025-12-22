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
  background-image: radial-gradient(circle at 50% 0%, #1a1e18 0%, #050505 60%);
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
