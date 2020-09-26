import Vue from 'vue'
import Vuex from 'vuex'
import init from "../assets/init.json";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        authors: [],
        books: [],
    },
    mutations: {
        init(state) {
            // Загрузим авторов
            if (localStorage.getItem('authors')) {
                try {
                    state.authors = JSON.parse(localStorage.getItem('authors'));
                } catch (e) {
                    localStorage.removeItem('authors');
                }
            } else {
                state.authors = init.authors

            }

            // Загрузим книги
            if (localStorage.getItem('books')) {
                try {
                    state.books = JSON.parse(localStorage.getItem('books'));
                } catch (e) {
                    localStorage.removeItem('books');
                }
            } else {
                state.books = init.books

            }
        },
        saveBooks(state, books) {
            state.books = books
            const parsed = JSON.stringify(books);
            localStorage.setItem('books', parsed);
        },
        saveAuthors(state, authors) {
            state.authors = authors
            const parsed = JSON.stringify(authors);
            localStorage.setItem('authors', parsed);
        },
    },
    actions: {
        updateBooks({commit}, credentials) {
            commit('saveBooks', credentials.books)
        },
        updateAuthors({commit}, credentials) {
            commit('saveAuthors', credentials.authors)
        },
    },
    getters: {
        AUTHORS: state => {
            return state.authors;
        },
        BOOKS: state => {
            return state.books;
        },
    },
    modules: {}
})
