<template>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import {mapMutations} from "vuex";


export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {}
  },
  created() {
    this.init()
  },
  methods: {
    ...mapMutations({
      init: 'init' // map `this.init()` to `this.$store.commit('init')`
    })
  }
}
</script>

<style>
</style>
