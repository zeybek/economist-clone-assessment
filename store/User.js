export const state = () => ({
  module: 'User',
  currentUser: '',
})

export const getters = {
  getCurrentUser: (state) => {
    return state.currentUser
  },
}

export const mutations = {
  SET_USER(state, payload) {
    state.currentUser = payload
  },
}
