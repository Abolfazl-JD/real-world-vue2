<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>
      It looks like you are experiencing some network errors, please click the
      back button and try again later
    </h3>
    <router-link :to="{ name: 'event-list' }"> or back to homepage</router-link>
  </div>
</template>
