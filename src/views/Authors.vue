<template>
  <div class="authors">
    <b-container fluid>
      <AuthorList></AuthorList>
    </b-container>
  </div>
</template>

<script>
import AuthorList from "@/components/Authors/AuthorList";

export default {
  name: 'Authors',
  components: {
    AuthorList
  }
}
</script>
