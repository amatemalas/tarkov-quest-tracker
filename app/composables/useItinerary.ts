export const useItinerary = () => {
  const itinerary = useState<any[]>('itinerary-list', () => [])
  const currentMap = useState<any>('itinerary-map', () => null)

  const setMap = (map: any) => {
    // If changing map, we might want to warn or clear? For now, we just switch.
    if (currentMap.value?.id !== map.id) {
      if (itinerary.value.length > 0) {
        // Optional: logic to clear if map changes, strictly speaking one raid is one map.
        // Let's clear to keep it simple and consistent: One plan = One map.
        itinerary.value = []
      }
      currentMap.value = map
    }
  }

  const addToItinerary = (quest: any) => {
    if (!itinerary.value.find(q => q.id === quest.id)) {
      itinerary.value.push(quest)
    }
  }

  const removeFromItinerary = (questId: string) => {
    itinerary.value = itinerary.value.filter(q => q.id !== questId)
  }

  const clearItinerary = () => {
    itinerary.value = []
    currentMap.value = null
  }

  // Helper to reorder if needed (drag and drop later?)
  
  return {
    itinerary,
    currentMap,
    setMap,
    addToItinerary,
    removeFromItinerary,
    clearItinerary
  }
}
