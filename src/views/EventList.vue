<template>
  <div>
    <h1>Events listing</h1>
    <event-card
      v-for="event in events"
      :key="event.id"
      :event="event"
    ></event-card>
    <template v-if="page > 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >prev</router-link
      >
      |
    </template>
    <router-link
      v-show="page != Math.ceil(totalEvents / 3)"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >Next</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard,
  },

  computed: {
    ...mapState(['events', 'totalEvents']),
    page() {
      return Number(this.$route.query.page) || 1
    },
  },

  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: 3,
      page: this.page,
    })
  },
}
</script>

<style></style>
