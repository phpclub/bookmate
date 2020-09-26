<template>
  <div class="book">
    <b-container fluid>
      <b-card
          :img-alt="Book.title"
          :img-src="Book.photo"
          :title="Book.title"
          img-left
          tag="article"
      >
        <b-card-text>
          Автор(ы):
          <span v-for="item in Book.authors" v-bind:key="item.id">
           <span v-for="author in authorslist" v-bind:key="author.id">
            <span v-if="author.value === item">
              <b-link :to="`/author/`+author.value">{{ author.text }}</b-link><br/>
            </span>
           </span>
          </span>
        </b-card-text>
        <b-card-text>
          ISBN: {{ Book.isbn }}
        </b-card-text>
        <b-card-text>
          Категория: {{ Book.category }}
        </b-card-text>
        <b-card-text>
          Цена: {{ Book.price }}
        </b-card-text>

        <b-card-text>
          Описание: {{ Book.desc }}
        </b-card-text>

        <b-card-text>
          <span v-for="item in Book.tags" v-bind:key="item.id">
          <b-badge pill variant="secondary">{{ item }}</b-badge>&nbsp;
          </span>
        </b-card-text>
      </b-card>
    </b-container>
  </div>
</template>


<script>
import {mapGetters} from "vuex";

export default {
  name: 'Book',
  components: {},
  data() {
    return {
      id: 0,
      authorslist: []
    }
  },
  computed: {
    ...mapGetters(
        [
          'BOOKS', 'AUTHORS'
        ]),
    Book() {
      for (let prop in this.BOOKS) {
        if (this.BOOKS[prop].id == this.id) {
          return this.BOOKS[prop]
        }
      }
      return ''
    }
  },
  mounted() {
    this.id = this.$route.params.book_id
    for (var prop in this.AUTHORS) {
      this.authorslist.push({text: this.AUTHORS[prop].name, value: this.AUTHORS[prop].id})
    }
  }
}
</script>
