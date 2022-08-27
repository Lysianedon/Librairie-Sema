import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create a new store instance for user's data:

const state = {
  age: '2',
  preferences: {
    goals: [],
    interests: []
  }
}
const mutations = {
  updateAge (state, props) {
    state.age = props
    console.log('hello from state ! Age: ', state.age)
  }
}
const actions = {
  updateAge: ({ commit }) => commit('updateAge')
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
