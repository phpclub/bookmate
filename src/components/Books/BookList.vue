<template>
  <div>
    <b-button v-b-modal.modal-book>Добавить книгу</b-button>
    <b-form-group
        class="mb-0"
        label="Фильтр"
        label-align-sm="right"
        label-cols-sm="3"
        label-for="filterInput"
        label-size="sm"
    >
      <b-form-input
          id="filterInput"
          v-model="filter"
          placeholder="Поиск на названию и описанию ..."
          type="search"
      />
    </b-form-group>

    <b-modal
        id="modal-book"
        ref="modal-book"
        hide-footer
        title="Новая Книга"
    >
      <BookForm v-on:update:book="addBook($event)"/>
    </b-modal>

    <b-table
        id="booklist"
        :current-page="currentPage"
        :fields="bookfields"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :items="books"
        :per-page="perPage"
        striped
        @filtered="onFiltered"
    >
      <template v-slot:cell(id)="data">
        <b-button @click="showConfirmBox(data.value)">X</b-button>
      </template>
      <template v-slot:cell(title)="data">
        <b-link :to="`/book/`+data.item.id">{{ data.value }}</b-link>
      </template>
      <template v-slot:cell(photo)="data">
        <b-img :alt="`Обложка книги: `+data.item.title" :src="data.value" fluid></b-img>
      </template>
      <template v-slot:cell(authors)="data">
          <span v-for="item in data.value" v-bind:key="item.id">
           <span v-for="author in authorslist" v-bind:key="author.id">
            <span v-if="author.value === item">
              <b-link :to="`/author/`+author.value">{{ author.text }}</b-link><br/>
            </span>
           </span>
          </span>
      </template>
      <template v-slot:cell(tags)="data">
          <span v-for="item in data.value" v-bind:key="item.id">
          <b-badge pill variant="secondary">{{ item }}</b-badge>
          </span>
      </template>
      <template v-slot:cell()="data">
        <i>{{ data.value }}</i>
      </template>
    </b-table>

    <b-pagination
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="totalRows"
        align="center"
        aria-controls="booklist"
        small
    />
  </div>
</template>

<script>
import BookForm from "@/components/Books/BookForm";
import {mapGetters} from "vuex";

export default {
  name: 'BookList',
  props: {
    author_id: String
  },
  components: {
    BookForm
  },
  data() {
    return {
      bookfields: [
        {key: 'isbn', label: "ISBN"},
        {key: 'title', label: "Название", sortable: true},
        {key: 'authors', label: "Автор(ы)"},
        {key: 'photo', label: "Обложка"},
        {key: 'desc', label: "Описание"},
        {key: 'tags', label: "Тэги"},
        {key: 'price', label: "Цена", sortable: true},
        {key: 'category', label: "Категория"},
        {key: 'id', label: "Действия"}
      ],
      //ISBN, название, автор/список авторов, картинку, краткое описание, теги, цена, категория
      books: [],
      authorslist: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      filter: null,
      filterOn: ['title', 'desc'],
    }
  },
  computed: {
    ...mapGetters(
        [
          'BOOKS', 'AUTHORS'
        ]),
  },
  watch: {
    $route(to, from) {
      if (from.params.author_id != to.params.author_id) {
        //Обработаем смену
        this.reinit()
      }
    }
  },
  mounted() {
    this.reinit()
    for (var prop in this.AUTHORS) {
      this.authorslist.push({text: this.AUTHORS[prop].name, value: this.AUTHORS[prop].id})
    }
  },
  methods: {
    reinit() {
      this.books = [];
      if (this.author_id > 0) {
        for (let prop in this.BOOKS) {
          // Если вызываем со странице автора - отфильтруем где он автор
          if (this.BOOKS[prop].authors.includes(parseInt(this.author_id))) {
            this.books.push(this.BOOKS[prop])
          }
        }
      } else {
        this.books = this.BOOKS
      }
    },
    getBookNameById(id) {
      for (let prop in this.books) {
        if (this.books[prop].id === id) {
          return this.books[prop].title
        }
      }
      return ''
    },
    addBook(book) {
      //TODO GenId
      //Маленькая хитрость - назначим следующий ID вычисленный из length
      //по хорошему нужно использовать генератор ID
      book.id = this.books.length + 1
      this.books.push(book)
      this.$store
          .dispatch('updateBooks', {
            books: this.books
          })
          .then(() => {
            console.log('Success')
          })
          .catch(err => {
            this.error = 'Не удалось добавить книгу'
            console.log(err)
          })
    },
    delBook(id) {
      for (let prop in this.books) {
        if (this.books[prop].id === id) {
          this.book = this.books.splice(prop, 1)
        }
      }
      this.$store
          .dispatch('updateBooks', {
            books: this.books
          })
          .then(() => {
            console.log('Success')
          })
          .catch(err => {
            this.error = 'Не удалось удалить книгу'
            console.log(err)
          })
    },
    showConfirmBox(id) {
      this.$bvModal.msgBoxConfirm('Удалить книгу "' + this.getBookNameById(id) + '" ?', {
        title: 'Подтвердите удаление',
        okTitle: 'Да',
        cancelTitle: 'Нет',
      })
          .then(value => {
            if (value) {
              this.delBook(id)
            }
          })
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>

<style>
</style>
