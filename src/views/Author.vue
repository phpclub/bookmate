<template>
  <div class="author">
    <b-container fluid>
      <b-card
          :title="Author.name"
          class="mb-2"
          style="max-width: 20rem;"
          tag="article"
      >
        <b-card-text>
          Дата рождения: {{ Author.birthdate }}
        </b-card-text>

        <b-card-text>
          Страна: {{ Author.country }}
        </b-card-text>


      </b-card>

      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: 'Author',
  components: {},
  data() {
    return {
      id: 0
    }
  },
  computed: {
    ...mapGetters(
        [
          'AUTHORS'
        ]),
    Author() {
      for (let prop in this.AUTHORS) {
        if (this.AUTHORS[prop].id == this.id) {
          return this.AUTHORS[prop]
        }
      }
      return ''
    }
  },
  watch: {
    $route(to, from) {
      if (from.params.author_id != to.params.author_id) {
        //Обработаем смену
        this.id = to.params.author_id
      }
    }
  },
  mounted() {
    this.id = this.$route.params.author_id
  }
}
</script>
