<template>
  <div class="home">
    <b-container fluid>
      <b-tabs content-class="mt-3">
        <b-tab active title="Книги">
        <BookList></BookList>
        </b-tab>
        <b-tab title="Авторы">
        <AuthorList></AuthorList>
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>
import BookList from "@/components/Books/BookList";
import AuthorList from "@/components/Authors/AuthorList";

export default {
  name: 'Home',
  components: {
    BookList,
    AuthorList
  }
}
</script>
