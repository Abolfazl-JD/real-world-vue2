<template>
  <div class="container">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="notification-bar"
    >
      <p>{{ notification.message }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      timeOut: null,
    }
  },

  computed: {
    ...mapState('notifications', ['notifications']),
  },

  mounted() {
    this.timeOut = setTimeout(() => {
      this.$store.dispatch('notifications/remove')
      console.log('removed')
    }, 5000)
  },

  beforeDestroy() {
    clearInterval(this.timeOut)
  },
}
</script>

<style scoped>
.container {
  position: fixed;
  right: 0;
  bottom: 0;
  padding-right: 40px;
}

.notification-bar {
  margin: 1em 0 1em;
}
</style>
