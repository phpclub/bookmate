<template>
  <div>
    <b-form
        ref="bookform"
        @reset="onResetBook"
        @submit.stop.prevent="handleSubmitBook"
    >
      <b-form-group
          id="bookform-input-group-title"
          :state="titleState"
          label="Название:"
          label-for="bookform-input-title"
      >
        <b-form-input
            id="bookform-input-title"
            v-model="bookform.title"
            :state="titleState"
            autofocus
            placeholder="Укажите название"
            required
            trim
        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="bookform-input-group-isbn"
          :state="isbnState"
          label="ISBN:"
          label-for="bookform-input-isbn"
      >
        <b-form-input
            id="bookform-input-isbn"
            v-model="bookform.isbn"
            :state="isbnState"
            placeholder="Укажите ISBN"
            required
            trim

        ></b-form-input>
      </b-form-group>

      <b-form-group id="bookform-input-group-authors" label="Автор(ы):" label-for="bookform-input-authors">
        <b-form-select
            id="bookform-input-authors"
            v-model="bookform.authors"
            :options="optionsauthors"
            multiple
            required
        />
      </b-form-group>

      <b-form-group
          id="bookform-input-group-photo"
          label="Обложка:"
          label-for="bookform-input-photo"
      >
        <b-form-input
            id="bookform-input-photo"
            v-model="bookform.photo"
            pattern="https?://.+"
            placeholder="Укажите URL для фото обложки (http://)"
            required size="30"
            trim
            type="url"

        ></b-form-input>
      </b-form-group>

      <b-form-group
          id="bookform-input-group-descr"
          label="Описание:"
          label-for="bookform-input-descr"
      >
        <b-form-textarea
            id="bookform-input-descr"
            v-model="bookform.descr"
            max-rows="6"
            placeholder="Краткое описание книги"
            required
            rows="3"
            size="sm"
            trim
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
          id="bookform-input-group-price"
          label="Цена:"
          label-for="bookform-input-price"
      >
        <b-form-input
            id="bookform-input-price"
            v-model="bookform.price"
            max="1000000.00"
            min="0.00"
            placeholder="Укажите цену"
            required
            step="0.01"
            type="number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="bookform-input-group-category" label="Категории:" label-for="bookform-input-category">
        <b-form-select
            id="bookform-input-category"
            v-model="bookform.category"
            :options="optionscategory"
            required
        />
      </b-form-group>

      <b-form-group id="bookform-input-group-tags" label="Тэги:" label-for="bookform-input-tags">
        <b-form-tags
            id="bookform-input-tags"
            v-model="bookform.tags"
            tag-pills
            placeholder="Укажите тэги"
            add-button-text="+"

        />
      </b-form-group>

      <b-button type="submit" variant="primary">Сохранить</b-button>
      <b-button type="reset" variant="danger">Очистить</b-button>

    </b-form>
  </div>
</template>

<script>

export default {
  name: 'Book',
  components: {},
  data() {
    return {
      bookform: {
        title: '',
        isbn: '',
        authors: [],
        photo: '',
        descr: '',
        tags: [],
        price: 0,
        category: null
      },
      optionsauthors: [], //[{text: 'Укажите автора', value: null}],
      optionscategory: [{text: 'Укажите категорию', value: null}, 'Классика','Детективы','Фантастика'],
      bookfields: [
        {key: 'isbn', label: "ISBN"},
        {key: 'title', label: "Название", sortable: true},
        {key: 'authors', label: "Автор(ы)"},
        {key: 'photo', label: "Обложка"},
        {key: 'desc', label: "Описание"},
        {key: 'tags', label: "Тэги"},
        {key: 'price', label: "Цена", sortable: true},
        {key: 'category', label: "Категория"}
      ],
    }
  },
  computed: {
    titleState() {
      return this.bookform.title.length > 2
    },
    isbnState() {
      return this.bookform.isbn.length > 2
    }
  },
  mounted() {
    if (localStorage.getItem('authors')) {
      const authors = JSON.parse(localStorage.getItem('authors'));
      for (var prop in authors) {
        this.optionsauthors.push({text: authors[prop].name, value: authors[prop].id})
      }
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.bookform.checkValidity()
      //TODO Проверить на уникальность книги
      return valid
    },
    handleSubmitBook() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      //Сохраним новую книгу
      this.$emit('update:book', this.bookform)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-book')
      })
    },
    onResetBook(evt) {
      evt.preventDefault()
      // Reset our form values
      this.bookform.title = ''
      this.bookform.isbn = ''
      this.bookform.authors = []
      this.bookform.photo = ''
      this.bookform.descr = ''
      this.bookform.tags = []
      this.bookform.price = 0
      this.bookform.category = null
    },
  }
}
</script>

<style>
</style>
