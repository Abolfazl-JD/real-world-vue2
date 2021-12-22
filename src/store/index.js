import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'
import * as notifications from './modules/notifications'

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
    createEvent({ commit, dispatch }, event) {
      return EventService.API_post(event)
        .then(() => {
          commit('ADD_EVENT', event)
          const notification = {
            type: 'Success',
            message: 'Your event has been successfully created ',
          }
          dispatch('notifications/add', notification, { root: true })
        })
        .catch((error) => {
          const notification = {
            type: 'Error',
            message: 'there was a problem creating your event : ',
          }
          dispatch('notifications/add', notification, { root: true })
          throw error
        })
    },

    fetchEvents({ commit, dispatch }, { perPage, page }) {
      return EventService.API_get(perPage, page)
        .then((res) => {
          commit('SET_EVENTS', res.data)
          commit('SET_TOTAL_EVENTS', Number(res.headers['x-total-count']))
        })
        .catch((err) => {
          const notification = {
            type: 'Error',
            message: 'there was a problem fetching events : ' + err.message,
          }
          dispatch('notifications/add', notification, { root: true })
        })
    },

    fetchEvent({ commit, getters, dispatch }, id) {
      const event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        return EventService.API_getEvent(id)
          .then((res) => {
            commit('SET_EVENT', res.data)
          })
          .catch((err) => {
            const notification = {
              type: 'Error',
              message: 'there was a problem fetching event : ' + err.message,
            }
            dispatch('notifications/add', notification, { root: true })
          })
      }
    },
  },

  modules: {
    notifications,
  },

  getters: {
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id)
    },
  },
})
