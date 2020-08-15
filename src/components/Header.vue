<template>
  <div>
    <div class="logo">
      <img :alt="title" src="../assets/logo.png">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  vertical-align: top;
  margin-block-start: 0px;
  margin-block-end: 0px;
  display: inline;
}
h3 {
  vertical-align: top;
  margin-block-start: 0px;
  margin-block-end: 0px;
  display: inline;
}

</style>
