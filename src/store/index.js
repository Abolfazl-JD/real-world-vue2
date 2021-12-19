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
    totalEvents: 0,
    event: {},
  },

  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTAL_EVENTS(state, total) {
      state.totalEvents = total
    },
    SET_EVENT(state, event) {
      state.event = event
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
    fetchEvents({ commit }, { perPage, page }) {
      EventService.API_get(perPage, page)
        .then((res) => {
          commit('SET_EVENTS', res.data)
          commit('SET_TOTAL_EVENTS', Number(res.headers['x-total-count']))
        })
        .catch((err) => {
          console.log('there is an error', err.response)
        })
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.API_getEvent(id)
          .then((res) => {
            commit('SET_EVENT', res.data)
          })
          .catch((err) => {
            console.log(err.response)
          })
      }
    },
  },

  modules: {},

  getters: {
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id)
    },
  },
})
