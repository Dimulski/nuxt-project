export const state = () => ({
})

export const getters = () => ({
  getRows (state, getters, rootState, rootGetters) {
    return rootGetters['tasks/getRows']
  }
})

export const actions = {
  async nuxtServerInit ({ dispatch }, context) {
    await dispatch('tasks/nuxtServerInit', context) // probably needs Promise.all
    await dispatch('blog/nuxtServerInit', context)
    await dispatch('photos/nuxtServerInit', context)
  }
}
