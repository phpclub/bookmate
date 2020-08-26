<template>
  <div class="books">
    <b-container fluid>
      <BookList></BookList>
    </b-container>
  </div>
</template>

<script>
import BookList from "@/components/Books/BookList";

export default {
  name: 'Books',
  components: {
    BookList,
  }
}
</script>
