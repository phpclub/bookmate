<template>
  <div id="app">
    <Header title="Bookmate - CRUD приложение по типу книжный магазин"/>
    <b-container fluid>
      <b-tabs content-class="mt-3">
        <BookList></BookList>
        <AuthorList></AuthorList>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import BookList from "@/components/Books/BookList";
import AuthorList from "@/components/Authors/AuthorList";

export default {
  name: 'App',
  components: {
    Header,
    BookList,
    AuthorList
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
</style>
