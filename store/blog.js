import axios from 'axios'

const state = {
  posts: [],
  post: {},
  itemsPerRow: 3,
  rows: 3
}

const getters = {
  getRows: (state) => {
    console.log(Math.ceil(state.posts.length / state.itemsPerRow))
    return Math.ceil(state.posts.length / state.itemsPerRow)
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
  fetchPostById ({ commit }, postId) {
    axios
      .get(`http://localhost:8080/api/posts/${postId}`)
      .then((response) => {
        commit('setPost', response.data)
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
