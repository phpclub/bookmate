<template>
  <b-navbar toggleable="lg" type="light" variant="faded">
    <b-navbar-brand href="/">
      <img height="60px" src="../assets/logo.png">
      Bookmate
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/"><b-icon-house-fill/></b-nav-item>
        <b-nav-item to="/books">Книги</b-nav-item>
        <b-nav-item to="/authors">Авторы</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/about">О проекте</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
name: "NavBar"
}
</script>

<style scoped>
</style>
