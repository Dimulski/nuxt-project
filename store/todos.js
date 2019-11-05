import axios from 'axios'

const state = () => ({
  todos: [],
  perPage: 10,
  currentPage: 1,
  rows: 0,
  fields: [{ key: 'id', sortable: true }, 'title', 'is_completed', 'edit', 'delete'],
  sortBy: 'id',
  editField: null,
  editFieldEditMode: false,
  todoBeingEdited: {}
})

const getters = {
  currentPage (state) {
    return state.currentPage
  }
}

const actions = {
  async nuxtServerInit ({ commit }) {
    const response = await axios.get('http://localhost:8080/api/todos')
    commit('setTodos', response.data)
    commit('setRows', response.data.length)
  },
  setCurrentPage ({ commit }, currentPage) {
    commit('setCurrentPage', currentPage)
  },
  setCompleted ({ commit }, completed) {
    commit('setCompleted', completed)
  },
  setEditField ({ commit }, editField) {
    commit('setEditField', editField)
  },
  async addTodo ({ commit }, title) {
    const response = await axios.post('http://localhost:8080/api/todos',
      { title, 'completed': false }
    )
    commit('addTodo', response.data)
  },
  setEditFieldEditMode ({ commit }, mode) {
    commit('setEditFieldEditMode', mode)
  },
  setTodoBeingEdited ({ commit }, todo) {
    commit('setTodoBeingEdited', todo)
  },
  saveTodoTitle ({ commit }, newTitle) {
    commit('saveTodoTitle', newTitle)
  },
  resetEdit ({ commit }) {
    commit('resetEdit')
  },
  deleteTodo ({ commit }, todo) {
    commit('deleteTodo', todo)
    axios.delete(`http://localhost:8080/api/todos/${todo.id}`)
  },
  saveTodo ({ commit }, todo) {
    commit('saveTodo', todo)
  },
  updateStatus ({ commit }, todo) {
    commit('updateStatus', todo)
  }
}

const mutations = {
  setTodos (state, todos) {
    state.todos = todos
  },
  setCurrentPage (state, currentPage) {
    state.currentPage = currentPage
  },
  setCompleted (state, completed) {
    state.completed = completed
  },
  setRows (state, rows) {
    state.rows = rows
  },
  setEditField (state, editField) {
    state.editField = editField
  },
  addTodo (state, todo) {
    state.todos.push(todo)
    state.editField = null
  },
  setEditFieldEditMode (state, mode) {
    state.editFieldEditMode = mode
  },
  setTodoBeingEdited (state, todo) {
    state.todoBeingEdited = todo
  },
  saveTodoTitle (state, newTitle) {
    state.todos[state.todoBeingEdited.id - 1].title = newTitle
  },
  resetEdit (state) {
    state.editField = null
    state.editFieldEditMode = false
    state.todoBeingEdited = {}
  },
  deleteTodo (state, todoToDelete) {
    state.todos.splice(state.todos.findIndex(todo => todo.id === todoToDelete.id), 1)
  },
  saveTodo (state, todo) {
    axios.put(`http://localhost:8080/api/todos/${todo.id}`,
      { 'id': todo.id, 'title': todo.title, 'completed': todo.completed }
    )
  },
  updateStatus (state, row) {
    console.log(row.id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
