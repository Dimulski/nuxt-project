import axios from 'axios'

const state = () => ({
  posts: [],
  post: {},
  itemsPerRow: 3,
  rows: 3
})

const getters = {
  getRows: (state) => {
    return Math.ceil(state.posts.length / state.itemsPerRow)
  },
  getItemsForRow: state => (row) => {
    const items = []
    const startingIndex = (state.itemsPerRow * (row - 1))
    for (let i = startingIndex, y = 0; i < startingIndex + state.itemsPerRow; i++, y++) {
      if (state.posts[i]) {
        items[y] = state.posts[i]
      }
    }
    return items
  },
  getCombinedTitleLength: (state) => {
    return state.posts.reduce((totalLength, currentPost) => totalLength + currentPost.title.length, 0)
  }
}

const actions = {
  async nuxtServerInit ({ commit }) {
    const response = await axios.get('http://localhost:8080/api/posts')
    commit('setPosts', response.data.filter(post => post.id > 10 && post.id < 22))
  },
  loadAllPosts ({ commit }) {
    axios
      .get('http://localhost:8080/api/posts')
      .then((response) => {
        commit('setPosts', response.data)
      })
  },
  loadPost ({ commit }, post) {
    commit('setPost', post)
  }
}

const mutations = {
  setPosts (state, posts) {
    state.posts = posts
  },
  setPost (state, post) {
    state.post = post
  },
  setRows (state, rows) {
    state.rows = rows
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
