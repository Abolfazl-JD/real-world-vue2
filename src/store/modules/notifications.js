import { v4 as uuidv4 } from 'uuid'

export const namespaced = true

export const state = {
  notifications: [],
}

export const mutations = {
  ADD_NOTIFICATION(state, notification) {
    state.notifications.push({
      ...notification,
      id: uuidv4(),
    })
  },
  REMOVE_NOTIFICATION(state) {
    state.notifications = []
  },
}

export const actions = {
  add({ commit }, notification) {
    commit('ADD_NOTIFICATION', notification)
  },
  remove({ commit }, notification) {
    commit('REMOVE_NOTIFICATION', notification)
  },
}
