<template>
  <div>
    <h1>OOPS !</h1>
    <h3>The {{ resource }} you are looking for wasn't found</h3>
    <router-link :to="{ name: 'event-list' }">BACK TO HOMEPAGE</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
