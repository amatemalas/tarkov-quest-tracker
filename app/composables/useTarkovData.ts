export const useTarkovData = () => {
  const GRAPHQL_ENDPOINT = 'https://api.tarkov.dev/graphql'

  const fetchMaps = async () => {
    const query = `
    {
      maps {
        id
        name
        normalizedName
      }
    }`

    try {
      const response = await $fetch<any>(GRAPHQL_ENDPOINT, {
        method: 'POST',
        body: { query }
      })
      return response.data.maps || []
    } catch (error) {
      console.error('Error fetching maps:', error)
      return []
    }
  }

  const fetchQuestsByMap = async (mapId: string) => {
    const query = `
    {
      tasks(lang: en) {
        id
        name
        wikiLink
        map {
          id
          name
          normalizedName
        }
        objectives {
           id
           type
           description
        }
        trader {
          name
          imageLink
        }
      }
    }`

    try {
      const response = await $fetch<any>(GRAPHQL_ENDPOINT, {
        method: 'POST',
        body: { query }
      })

      const tasks = response.data.tasks || []
      
      if (!mapId) return tasks
      
      return tasks.filter((task: any) => {
        // If task is specific to this map
        return task.map && (task.map.id === mapId || task.map.normalizedName === mapId)
      })
    } catch (error) {
      console.error('Error fetching quests:', error)
      return []
    }
  }

  return {
    fetchMaps,
    fetchQuestsByMap
  }
}
