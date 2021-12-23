import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  timeout: 10000,
})

export default {
  API_get(perPage, page) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
  },
  API_getEvent(id) {
    return apiClient.get(`/events/${id}`)
  },
  API_post(event) {
    return apiClient.post('/events', event)
  },
}
