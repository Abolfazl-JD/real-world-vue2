import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc1383', name: 'abolfazl' },
    categories: [
      'sustainable',
      'football',
      'basketball',
      'persuasive',
      'compassion',
    ],
    events: [],
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.API_post(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch((err) => console.log('there has been an error', err.response))
    },
  },
  modules: {},
  getters: {
    catLength(state) {
      return state.categories.length
    },
  },
})
