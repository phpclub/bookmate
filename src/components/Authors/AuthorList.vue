<template>
  <div>
      <b-button v-b-modal.modal-author>Добавить Автора</b-button>
      <b-modal
          id="modal-author"
          ref="modal-author"
          hide-footer
          title="Новый Автор"
      >
        <Author v-on:update:author="addAuthor($event)"/>
      </b-modal>
      <b-table :fields="authorfields" :items="authors" striped>

        <template v-slot:cell(name)="data">
          <b-link :to="`/author/`+data.item.id">{{ data.value }}</b-link>
        </template>

      </b-table>
  </div>
</template>

<script>
import Author from "@/components/Authors/Author";
import init from "../../assets/init.json";

export default {
  name: 'AuthorList',
  components: {
    Author
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
  methods: {
    addAuthor(author) {
      //TODO GenId
      //Маленькая хитрость - назначим следующий ID вычисленный из length
      //по хорошему нужно использовать генератор ID
      author.id = this.authors.length + 1
      this.authors.push(author)
      this.syncStorage()
    },
    syncStorage() {
      const parsed = JSON.stringify(this.authors);
      localStorage.setItem('authors', parsed);
    }

  },
  mounted() {
    if (localStorage.getItem('authors')) {
      try {
        this.authors = JSON.parse(localStorage.getItem('authors'));
      } catch (e) {
        localStorage.removeItem('authors');
      }
    } else {
      this.authors = init.authors
      this.syncStorage()
    }
  },
}
</script>

<style>
</style>
