<script setup lang="ts">
const { itinerary, currentMap } = useItinerary()

// Redirect if empty
if (itinerary.value.length === 0) {
  navigateTo('/')
}

const printMode = ref(false)
const togglePrint = () => {
    printMode.value = !printMode.value
    if (printMode.value) {
        setTimeout(() => window.print(), 100)
    }
}

useHead({
  title: 'Mission Briefing | Tarkov Quest Tracker',
  meta: [
    { name: 'description', content: 'Review your mission objectives and generate your itinerary.' }
  ]
})
</script>

<template>
  <div class="page-summary animate-entry">
    <header class="summary-header">
        <div class="header-top">
            <NuxtLink :to="`/map/${currentMap?.id}`" class="back-link no-print">&larr; EDIT LOADOUT</NuxtLink>
            <button class="print-btn no-print" @click="togglePrint">PRINT SUMMARY</button>
        </div>
        <div class="briefing-title">
            <h1 class="text-4xl font-black">MISSION BRIEFING</h1>
            <div class="meta">
                <div class="meta-item">
                    <span class="label">LOCATION:</span>
                    <span class="value">{{ currentMap?.name || 'UNKNOWN' }}</span>
                </div>
                <div class="meta-item">
                    <span class="label">OPERATIVES:</span>
                    <span class="value">USEC / BEAR</span>
                </div>
                <div class="meta-item">
                    <span class="label">OBJECTIVES:</span>
                    <span class="value">{{ itinerary.length }} ASSIGNED</span>
                </div>
            </div>
        </div>
    </header>

    <div class="dossier-container">
        <div class="dossier-paper">
            <div v-for="(quest, index) in itinerary" :key="quest.id" class="quest-detail">
                <div class="quest-header">
                    <div class="quest-num">{{ index + 1 < 10 ? '0' + (index + 1) : index + 1 }}</div>
                    <div class="quest-title-block">
                        <h2 class="quest-name">{{ quest.name }}</h2>
                        <span class="quest-trader">CONTRACTOR: {{ quest.trader.name }}</span>
                    </div>
                    <div class="quest-checkbox"></div>
                </div>

                <div class="objectives-list" v-if="quest.objectives && quest.objectives.length > 0">
                    <h4 class="obj-label">PRIMARY OBJECTIVES:</h4>
                    <ul>
                        <li v-for="obj in quest.objectives" :key="obj.id" class="objective-item">
                            <span class="obj-bullet">&bull;</span>
                            <span class="obj-text">{{ obj.description }}</span>
                        </li>
                    </ul>
                </div>
                <div class="no-objectives" v-else>
                    <p>Check Wiki for detailed coordinates.</p>
                </div>

                <div class="quest-footer no-print" v-if="quest.wikiLink">
                    <a :href="quest.wikiLink" target="_blank">ACCESS TARGET DATA (WIKI)</a>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.page-summary {
    max-width: 900px;
    margin: 0 auto;
    padding-bottom: 4rem;
}

.header-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
}

.back-link {
    color: var(--text-muted);
    text-decoration: none;
    font-weight: 600;
}
.back-link:hover {
    color: var(--primary-gold);
}

.print-btn {
    background: transparent;
    border: 1px solid var(--border-subtle);
    color: var(--text-main);
    padding: 0.5rem 1rem;
    border-radius: 4px;
}
.print-btn:hover {
    border-color: var(--text-main);
}

.briefing-title {
    border-bottom: 4px solid var(--text-main);
    padding-bottom: 1rem;
    margin-bottom: 2rem;
}

.briefing-title h1 {
    margin: 0 0 1rem 0;
    letter-spacing: -2px;
    text-transform: uppercase;
}

.meta {
    display: flex;
    gap: 3rem;
}

.meta-item {
    display: flex;
    flex-direction: column;
}

.meta-item .label {
    font-size: 0.75rem;
    color: var(--text-muted);
    letter-spacing: 1px;
    margin-bottom: 0.2rem;
}

.meta-item .value {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--primary-gold);
    text-transform: uppercase;
}

/* Dossier Look */
.dossier-paper {
    background: #e6e4dfff; /* Paper colorish off-white/grey but dark mode friendly? Stick to dark mode for app */
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    padding: 3rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    position: relative;
}
/* Paper clip effect or stamps could go here */

.quest-detail {
    margin-bottom: 3rem;
    border-bottom: 1px dashed var(--border-subtle);
    padding-bottom: 2rem;
}

.quest-detail:last-child {
    border-bottom: none;
}

.quest-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}

.quest-num {
    font-size: 3rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.1);
    line-height: 1;
}

.quest-title-block {
    flex-grow: 1;
}

.quest-name {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--text-main);
    text-transform: uppercase;
    letter-spacing: -0.5px;
}

.quest-trader {
    display: block;
    color: var(--primary-gold);
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 1px;
    margin-top: 0.2rem;
}

.quest-checkbox {
    width: 30px;
    height: 30px;
    border: 2px solid var(--text-muted);
    border-radius: 4px;
}

.obj-label {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 0.8rem;
    text-transform: uppercase;
}

.objective-item {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: var(--text-main);
    line-height: 1.4;
}

.obj-bullet {
    color: var(--primary-gold);
}

.quest-footer {
    margin-top: 1.5rem;
}
.quest-footer a {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-decoration: underline;
}

@media print {
    .no-print { display: none; }
    body { background: white; color: black; }
    .page-summary { max-width: 100%; padding: 0; }
    .dossier-paper { background: white; border: none; box-shadow: none; padding: 0; }
    .quest-name, .obj-text { color: black; }
    .quest-trader, .meta-item .value { color: #333; }
    .quest-num { color: #ddd; }
}
</style>
