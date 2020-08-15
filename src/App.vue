<template>
  <div id="app">
    <img alt="Bookmate" src="./assets/logo.png">
    <Header msg="Bookmate"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
</style>
