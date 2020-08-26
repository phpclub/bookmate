<template>
  <div class="author">
    <b-container fluid>
      TODO информация по конкретном авторе {{ $route.params.author_id }} со списком книг

      <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
          img-left
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>

      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'Author',
  components: {
  }
}
</script>
