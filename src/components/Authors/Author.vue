<template>
  <div>
    <b-form
        ref="authorform"
        @reset="onResetAuthor"
        @submit.stop.prevent="handleSubmitAuthor"
    >
      <b-form-group
          id="authorform-input-group-fio"
          :state="nameState"
          autofocus
          invalid-feedback="Укажите ФИО"
          label="ФИО:"
          label-for="authorform-input-fio"
          trim
      >
        <b-form-input
            id="authorform-input-fio"
            v-model="authorform.name"
            :state="nameState"
            placeholder="Введите ФИО"
            required
        />
      </b-form-group>

      <b-form-group id="authorform-input-group-birthdate" label="Дата рождения:"
                    label-for="authorform-input-birthdate">
        <b-form-datepicker id="authorform-input-birthdate"
                           v-model="authorform.birthdate"
                           :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric'}"
                           class="mb-2"
                           local="ru"
                           placeholder="Дата не выбрана"
                           required
        />
      </b-form-group>

      <b-form-group id="authorform-input-group-gender" label="Пол:" label-for="authorform-input-gender">
        <b-form-select
            id="authorform-input-gender"
            v-model="authorform.gender"
            :options="gender"
            required
        />
      </b-form-group>

      <b-form-group id="authorform-input-group-country" label="Страна:" label-for="authorform-input-country">
        <b-form-select
            id="authorform-input-country"
            v-model="authorform.country"
            :options="country"
            required
        />
      </b-form-group>

      <b-button type="submit" variant="primary">Сохранить</b-button>
      <b-button type="reset" variant="danger">Очистить</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Author',
  components: {},
  data() {
    return {
      authorform: {
        name: '',
        birthdate: null,
        gender: null,
        country: null,
      },
      gender: [{text: 'Укажите пол', value: null}, 'Мужской', 'Женский'],
      country: [{text: 'Укажите страну', value: null}, 'Россия', 'Украина', 'Беларусь'],
    }
  },
  computed: {
    nameState() {
      return this.authorform.name.length > 2
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.authorform.checkValidity()
      //TODO Проверить на уникальность автора
      return valid
    },
    handleSubmitAuthor() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      //Сохраним новую книгу
      this.$emit('update:author', this.authorform)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-author')
      })
    },
    onResetAuthor(evt) {
      evt.preventDefault()
      this.authorform.name = ''
      this.authorform.birthdate = null
      this.authorform.gender = null
      this.authorform.country = null
    }
  }
}
</script>

<style>
</style>
