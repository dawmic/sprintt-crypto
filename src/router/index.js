import Vue from 'vue'
import VueRouter from 'vue-router'
import AllCurrencies from '@/components/AllCurrencies.vue'
import TrackedCurrencies from '@/components/TrackedCurrencies.vue'
import CurrencyDetails from '@/components/CurrencyDetails.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/',
        name: 'AllCurrencies',
        component: AllCurrencies,
        props: true,
    },
    {
        path: '/TrackedCurrencies',
        name: 'TrackedCurrencies',
        component: TrackedCurrencies
    },
    {
        path: '/CurrencyDetails/:name',
        name: 'CurrencyDetails',
        component: CurrencyDetails,
        props: true,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router