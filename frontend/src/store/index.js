import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    firstname: '',
    age: '',
    preferences: {
      goals: [],
      interests: []
    }
  },
  getters: {
  },
  mutations: {
    updateAge (state, payload) {
      state.age = payload
    },
    updateFirstName (state, payload) {
      state.firstname = payload
    },
    // Modify mutations to : delete or add Goal => same for interests
    addNewGoals (state, payload) {
      state.preferences.goals.push(payload)
    },
    removeGoals (state, payload) {
      state.preferences.goals.forEach(goal => {
        if (goal === payload) {
          const index = state.preferences.goals.indexOf(goal)
          state.preferences.goals.splice(index, 1)
        }
      })
    },
    addNewInterests (state, payload) {
      state.preferences.interests.push(payload)
    },
    removeInterests (state, payload) {
      state.preferences.interests.forEach(interest => {
        if (interest === payload) {
          const index = state.preferences.interests.indexOf(interest)
          state.preferences.interests.splice(index, 1)
        }
      })
    }
  },
  actions: {
    updateAge: ({ commit }) => commit('updateAge'),
    updateFirstName: ({ commit }) => commit('updateFirstName'),
    addNewGoals: ({ commit }) => commit('addNewGoals'),
    removeGoals: ({ commit }) => commit('removeGoals'),
    addNewInterests: ({ commit }) => commit('addNewInterests'),
    removeInterests: ({ commit }) => commit('removeInterests')
  },
  modules: {

  }
})
