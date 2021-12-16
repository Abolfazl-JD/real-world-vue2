<template>
  <div>
    <h1>Events listing</h1>
    <event-card
      v-for="event in events"
      :key="event.id"
      :event="event"
    ></event-card>
    <router-link :to="{ name: 'event-show', params: { id: '1' } }"
      >Show event #1</router-link
    >
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
import EventCard from '@/components/EventCard.vue'

export default {
  components: {
    EventCard,
  },

  data() {
    return {
      events: [],
    }
  },

  created() {
    EventService.API_get()
      .then((res) => {
        this.events = res.data
      })
      .catch((err) => {
        console.log('there is an error', err.response)
      })
  },
}
</script>

<style></style>
