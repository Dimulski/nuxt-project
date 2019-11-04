import axios from 'axios'

const state = () => ({
  tasks: [],
  itemsPerRow: 3,
  rows: 3
})

const getters = {
  getRows: (state) => {
    return Math.ceil(state.tasks.length / state.itemsPerRow)
  }
}

const actions = {
  async nuxtServerInit ({ commit }) {
    const response = await axios.get('http://localhost:8080/api/tasks')
    commit('setTasks', response.data.filter(task => task.id > 0 && task.id < 10))
  }
}

const mutations = {
  setTasks (state, tasks) {
    state.tasks = tasks
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
