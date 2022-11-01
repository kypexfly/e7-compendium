import axios from 'axios'
import { ref } from 'vue'

const getHeroesBase = () => {
  const heroes = ref([])
  // const error = ref(null)

  const load = async () => {
    heroes.value = axios.get('/base.json').then(({ data }) => {
      return data
    })
  }

  return {
    heroes,
    load
  }
}

export default getHeroesBase
