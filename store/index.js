// store/index.js
export const state = () => ({
})

export const getters = () => ({
  getRows (state, getters, rootState, rootGetters) {
    return rootGetters['tasks/getRows']
  }
})
// end
