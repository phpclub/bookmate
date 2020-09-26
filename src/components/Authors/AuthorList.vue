<template>
  <div>
    <b-button v-b-modal.modal-author>Добавить Автора</b-button>
    <b-modal
        id="modal-author"
        ref="modal-author"
        hide-footer
        title="Новый Автор"
    >
      <AuthorForm v-on:update:author="addAuthor($event)"/>
    </b-modal>
    <b-table :fields="authorfields" :items="authors" striped>

      <template v-slot:cell(name)="data">
        <b-link :to="`/author/`+data.item.id">{{ data.value }}</b-link>
      </template>

    </b-table>
  </div>
</template>

<script>
import AuthorForm from "@/components/Authors/AuthorForm";
import init from "../../assets/init.json";
import {mapGetters} from "vuex";

export default {
  name: 'AuthorList',
  components: {
    AuthorForm
  },
  data() {
    return {
      authorfields: [
        {key: 'name', label: "ФИО", sortable: true},
        {key: 'birthdate', label: "Дата рождения"},
        {key: 'gender', label: "Пол"},
        {key: 'country', label: "Страна", sortable: true}
      ],
      authors: init.authors
    }
  },
  computed: {
    ...mapGetters(
        [
          'BOOKS', 'AUTHORS'
        ]),
  },
  methods: {
    addAuthor(author) {
      //TODO GenId
      //Маленькая хитрость - назначим следующий ID вычисленный из length
      //по хорошему нужно использовать генератор ID
      author.id = this.authors.length + 1
      this.authors.push(author)
      this.$store
          .dispatch('updateAuthors', {
            authors: this.authors
          })
          .then(() => {
            console.log('Success')
          })
          .catch(err => {
            this.error = 'Не удалось добавить автора'
            console.log(err)
          })
    },


  },
  mounted() {
    this.authors = this.AUTHORS
  },
}
</script>

<style>
</style>
