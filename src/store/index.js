import { createStore } from 'vuex'

const USER_ID_STORAGE_KEY = 'wallet_user_id'

export default createStore({
  state: {
    userId: localStorage.getItem(USER_ID_STORAGE_KEY) || null
  },
  getters: {
    userId: (state) => state.userId
  },
  mutations: {
    SET_USER_ID(state, userId) {
      state.userId = userId
      localStorage.setItem(USER_ID_STORAGE_KEY, userId)
    }
  },
  actions: {
    setUserId({ commit }, userId) {
      commit('SET_USER_ID', userId)
    }
  },
  modules: {
  }
})
