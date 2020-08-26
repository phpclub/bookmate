<template>
  <div>
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

    <b-button v-b-modal.modal-book>Добавить книгу</b-button>

    <b-modal
        id="modal-book"
        ref="modal-book"
        hide-footer
        title="Новая Книга"
    >
      <Book v-on:update:book="addBook($event)"/>
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
        <b-img :src="data.value" alt="Fluid image" fluid></b-img>
      </template>
      <template v-slot:cell(authors)="data">
          <span v-for="item in data.value" v-bind:key="item.id">
           <span v-for="author in authorslist" v-bind:key="author.id">
            <span v-if="author.value === item">
              <b-link :to="`/author/`+author.value">{{ author.text }}</b-link>
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
import Book from "@/components/Books/Book";
import init from "../../assets/init.json";

export default {
  name: 'BookList',
  props: {
    author_id: String
  },
  components: {
    Book
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
  computed: {},
  methods: {
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
      this.syncStorage()
    },
    delBook(id) {
      for (let prop in this.books) {
        if (this.books[prop].id === id) {
          this.book = this.books.splice(prop, 1)
        }
      }
      this.syncStorage()
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
    syncStorage() {
      const parsed = JSON.stringify(this.books);
      localStorage.setItem('books', parsed);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
  mounted() {
    if (localStorage.getItem('books')) {

      try {
        this.books = JSON.parse(localStorage.getItem('books'));
      } catch (e) {
        localStorage.removeItem('books');
      }
    } else {
      this.books = init.books
      const parsed = JSON.stringify(this.books);
      localStorage.setItem('books', parsed);
    }
    if (localStorage.getItem('authors')) {
      const authors = JSON.parse(localStorage.getItem('authors'));
      for (var prop in authors) {
        this.authorslist.push({text: authors[prop].name, value: authors[prop].id})
      }
    }


    // TODO добавить фильтр по author_id когда список загружен на странице автора
    // Пока просто удалим чужие книжки - все равно потом на Vuex переводить все
    if (this.author_id > 0) {
      for (let prop in this.books) {
        //Грязный хак надо проверять на вхождение this.author_id
         if (this.books[prop].authors[0] != this.author_id) {
           this.book = this.books.splice(prop, 1)
         }
        //console.log(this.books[prop].authors[0])
      }
    }
    this.totalRows = this.books.length
  },
}
</script>

<style>
</style>
