import Vue from 'vue'
import VueRouter from 'vue-router'
import AllCurrencies from '@/views/AllCurrencies.vue'
import TrackedCurrencies from '@/views/TrackedCurrencies.vue'
import CurrencyDetails from '@/components/CurrencyDetails.vue'

Vue.use(VueRouter)

const routes = [
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