<script setup lang="ts">
const route = useRoute()
const mapId = route.params.id as string

const { fetchQuestsByMap, fetchMaps } = useTarkovData()
const { data: quests, pending } = await useAsyncData(`quests-${mapId}`, () => fetchQuestsByMap(mapId))

// Retrieve map info for the state
const { data: maps } = await useAsyncData('maps-detail', () => fetchMaps())
const currentMapInfo = computed(() => maps.value?.find((m: any) => m.id === mapId))

const { itinerary, addToItinerary, removeFromItinerary, setMap } = useItinerary()

// Initialize map in state
watchEffect(() => {
  if (currentMapInfo.value) {
    setMap(currentMapInfo.value)
  }
})

// Simple computed for available quests (not in itinerary)
const availableQuests = computed(() => {
  if (!quests.value) return []
  return quests.value.filter((q: any) => !itinerary.value.find(i => i.id === q.id))
})

useHead({
  title: computed(() => currentMapInfo.value ? `Operation: ${currentMapInfo.value.name} | Tarkov Tracker` : 'Loading Operation...'),
  meta: [
    { name: 'description', content: 'Plan your route and select active quests for this location.' }
  ]
})
</script>

<template>
  <div class="page-map animate-entry">
    <header class="map-header mb-8">
      <NuxtLink to="/" class="back-link">&larr; BACK TO MAPS</NuxtLink>
      <div class="flex justify-between items-end mt-2">
        <h1 class="text-3xl font-bold">ACTIVE OPERATIONS: <span class="text-gold">{{ currentMapInfo?.name || '...' }}</span></h1>
        <NuxtLink v-if="itinerary.length > 0" to="/summary" class="deploy-btn">
          PROCEED TO BRIEFING &rarr;
        </NuxtLink>
      </div>
    </header>

    <div v-if="pending" class="loading-state">
      <div class="loader">Loading Intelligence...</div>
    </div>

    <div v-else class="content-grid">
      <!-- Available Quests -->
      <section class="quest-list-section">
        <h2 class="section-title">AVAILABLE QUESTS <span class="count">{{ availableQuests.length }}</span></h2>
        
        <div class="quest-list">
          <div 
            v-for="quest in availableQuests" 
            :key="quest.id" 
            class="quest-card glass-panel"
            @click="addToItinerary(quest)"
          >
            <div class="quest-header">
              <h3>{{ quest.name }}</h3>
              <span class="trader-badge" v-if="quest.trader">{{ quest.trader.name }}</span>
            </div>
            <p class="quest-wiki" v-if="quest.wikiLink">
              <a :href="quest.wikiLink" target="_blank" @click.stop>Wiki Data &nearr;</a>
            </p>
            <button class="add-btn">ADD TO ITINERARY</button>
          </div>
        </div>
      </section>

      <!-- Itinerary -->
      <section class="itinerary-section glass-panel sticky-panel">
        <h2 class="section-title highlight">MISSION ITINERARY <span class="count">{{ itinerary.length }}</span></h2>
        
        <div v-if="itinerary.length === 0" class="empty-state">
          <p>Select quests to build your path.</p>
        </div>

        <div class="itinerary-list" v-else>
          <div 
            v-for="(quest, index) in itinerary" 
            :key="quest.id" 
            class="itinerary-card"
          >
            <div class="idx">{{ index + 1 }}</div>
            <div class="info">
              <h4>{{ quest.name }}</h4>
            </div>
            <button class="remove-btn" @click="removeFromItinerary(quest.id)">&times;</button>
          </div>
          
           <NuxtLink to="/summary" class="deploy-btn-full mt-4">
            CONFIRM LOADOUT ({{ itinerary.length }})
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.back-link {
  color: var(--primary-gold);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.8;
}
.back-link:hover {
  opacity: 1;
}

.text-gold {
  color: var(--primary-gold);
  text-transform: uppercase;
}

.deploy-btn, .deploy-btn-full {
  background: var(--primary-gold);
  color: #000;
  font-weight: 800;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: all 0.2s;
  border: 1px solid var(--primary-gold);
}

.deploy-btn:hover, .deploy-btn-full:hover {
  background: var(--primary-gold-dim);
  border-color: var(--primary-gold-dim);
  transform: translateY(-2px);
}

.deploy-btn-full {
  display: block;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: var(--space-lg);
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: var(--space-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--border-subtle);
  padding-bottom: 0.5rem;
}

.section-title.highlight {
  border-bottom-color: var(--primary-gold);
  color: var(--primary-gold);
}

.count {
  font-size: 0.9rem;
  background: var(--bg-surface);
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--text-muted);
}

/* Quest Card */
.quest-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.quest-card {
  padding: var(--space-md);
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.quest-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-left-color: var(--primary-gold);
}

.quest-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.quest-card h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.trader-badge {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--accent-green);
  background: rgba(88, 110, 78, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
}

.quest-wiki a {
  color: var(--text-muted);
  font-size: 0.85rem;
  text-decoration: none;
}
.quest-wiki a:hover {
  color: var(--text-main);
  text-decoration: underline;
}

.add-btn {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  margin-top: 1rem;
  border-radius: 4px;
  width: 100%;
}

.quest-card:hover .add-btn {
  border-color: var(--primary-gold);
  color: var(--primary-gold);
}

/* Itinerary */
.sticky-panel {
  position: sticky;
  top: 100px;
  height: fit-content;
  max-height: 80vh; /* Allow scrolling if long */
  overflow-y: auto;
  padding: var(--space-md);
}

.empty-state {
  text-align: center;
  color: var(--text-muted);
  padding: 2rem 0;
  font-style: italic;
}

.itinerary-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.itinerary-card {
  display: flex;
  align-items: center;
  background: rgba(0,0,0,0.3);
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--border-subtle);
}

.idx {
  font-family: monospace;
  font-size: 1.2rem;
  color: var(--primary-gold);
  margin-right: 0.8rem;
  width: 24px;
  text-align: center;
}

.info h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.remove-btn {
  margin-left: auto;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1.2rem;
  padding: 0 0.5rem;
}
.remove-btn:hover {
  color: var(--accent-red);
}
</style>
