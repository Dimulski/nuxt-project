import axios from 'axios'

const state = () => ({
  photos: [],
  itemsPerRow: 3,
  rows: 3
})

const getters = {
  getRows: (state) => {
    return Math.ceil(state.photos.length / state.itemsPerRow)
  },
  getItemsForRow: state => (row) => {
    const items = []
    const startingIndex = (state.itemsPerRow * (row - 1))
    for (let i = startingIndex, y = 0; i < startingIndex + state.itemsPerRow; i++, y++) {
      if (state.photos[i]) {
        items[y] = state.photos[i]
      }
    }

    return items
  }
}

const actions = {
  async nuxtServerInit ({ commit }) {
    commit('setPhotos', [])
    await asyncForEach(get35Random([...Array(50).keys()]), async (photoId) => {
      const response = await axios.get(`http://localhost:8080/api/photos/${photoId}`)
      commit('addPhoto', response.data)
    })
  }
}

const mutations = {
  addPhoto (state, photo) {
    state.photos.push(photo)
  },
  setPhotos (state, photos) {
    state.photos = photos
  }
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const get35Random = (elements) => {
  const selected = []
  while (selected.length <= 35) {
    const randomElement = Math.ceil(Math.random() * elements.length)
    if (!selected.includes(randomElement)) {
      selected.push(randomElement)
    }
  }
  return selected
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
