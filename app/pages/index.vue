<script setup lang="ts">
const { fetchMaps } = useTarkovData()
const { data: maps } = await useAsyncData('maps', () => fetchMaps())
const router = useRouter()
const isLoading = ref(false)
const targetMapName = ref('')

const selectMap = async (map: any) => {
  isLoading.value = true
  targetMapName.value = map.name
  
  // Simulate a brief "connecting" delay for effect, or just wait for navigation
  // In Nuxt, navigateTo is a promise. However, fetch on the next page might block suspense.
  // We want to show this loader UNTIL the next page is ready.
  // Since the next page uses await useAsyncData, it will block navigation by default until data is ready.
  // This is perfect for our loader: it will stay visible while the data fetches.
  
  await navigateTo(`/map/${map.id}`)
  // We don't turn off loading here because the component will be unmounted upon successful navigation.
}

const getMapImage = (map: any) => {
  return `https://cdn.mapgenie.io/images/games/tarkov/maps/${map.normalizedName}.jpg`
}

useHead({
  title: 'Operations Center | Tarkov Quest Tracker',
  meta: [
    { name: 'description', content: 'Select your operation zone to plan your Escape from Tarkov quests.' }
  ]
})
</script>

<template>
  <div class="page-home animate-entry">
    <!-- Loading Modal -->
    <Teleport to="body">
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-modal glass-panel">
          <div class="loader-spinner"></div>
          <h3>INITIALIZING RAID</h3>
          <p>Retrieving intelligence for {{ targetMapName }}...</p>
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
        </div>
      </div>
    </Teleport>

    <section class="hero text-center mb-5">
      <h2 class="text-4xl font-bold mb-2">SELECT OPERATION ZONE</h2>
      <p class="text-muted">Generate optimized quest itineraries for your deployment.</p>
    </section>

    <div class="maps-grid">
      <div 
        v-for="map in maps" 
        :key="map.id"
        class="map-card glass-panel"
        @click="selectMap(map)"
        :style="{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url(${getMapImage(map)})` }"
      >
        <div class="map-content">
          <h3>{{ map.name }}</h3>
          <div class="status-indicator">ACTIVE</div>
        </div>
        <div class="hover-overlay"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.hero h2 {
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: var(--space-xs);
  color: var(--text-main);
  text-transform: uppercase;
}

.text-muted {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.maps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
}

.map-card {
  position: relative;
  height: 200px; /* fixed height for consistency */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Text at bottom */
  padding: var(--space-md);
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;
  background-color: #1a1a1a; /* Fallback */
  background-size: cover;
  background-position: center;
  background-clip: padding-box; /* Prevent bleeding under border */
  cursor: pointer;
  /* Fix for Safari border-radius clipping */
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  mask-image: radial-gradient(white, black);
}

.map-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-gold);
}

.map-content {
  position: relative;
  z-index: 2;
}

.map-card h3 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-main);
  text-transform: uppercase;
  font-weight: 700;
}

.status-indicator {
  font-size: 0.75rem;
  color: var(--accent-green);
  font-weight: 600;
  letter-spacing: 1px;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
}

.status-indicator::before {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  background-color: var(--accent-green);
  border-radius: 50%;
  margin-right: 6px;
  box-shadow: 0 0 5px var(--accent-green);
}

.hover-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at center, rgba(212, 175, 55, 0.1), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.map-card:hover .hover-overlay {
  opacity: 1;
}

/* Loading Overlay Styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.loading-modal {
  padding: 3rem;
  text-align: center;
  border: 1px solid var(--primary-gold);
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.1);
  min-width: 300px;
}

.loading-modal h3 {
  color: var(--primary-gold);
  font-size: 1.5rem;
  margin: 1rem 0 0.5rem 0;
  letter-spacing: 2px;
}

.loading-modal p {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.loader-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(212, 175, 55, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-gold);
  margin: 0 auto;
  animation: spin 1s linear infinite;
}

.progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 50%;
  background: var(--primary-gold);
  animation: progress 2s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes progress {
  0% { left: -50%; }
  100% { left: 100%; }
}
</style>
