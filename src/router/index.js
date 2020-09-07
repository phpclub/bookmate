import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/authors',
        name: 'Authors',

        component: () => import(/* webpackChunkName: "author" */ '../views/Authors.vue')
    },
    {
        path: '/author/:author_id',
        name: 'Author',
        props: true,
        alias: "/a",
        component: () => import(/* webpackChunkName: "author" */ '../views/Author.vue'),
        children: [
            {
                path: "",
                component: () =>
                    import(/* webpackChunkName: "author" */ "../components/Books/BookList"),
                props: true
            },

        ]
    },
    {
        path: '/books',
        name: 'Books',
        component: () => import(/* webpackChunkName: "book" */ '../views/Books.vue')
    },
    {
        path: '/book/:book_id',
        name: 'Book',
        component: () => import(/* webpackChunkName: "book" */ '../views/Book.vue')
    },
    {
        path: '*',
        component: () => import('../views/404.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    next();
});

export default router
