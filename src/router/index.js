import Vue from 'vue'
import VueRouter from 'vue-router'
import EventCreate from '../views/EventCreate.vue'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import NProgress from 'nprogress'
import Store from '@/store/index'
import NotFound from '@/views/NotFound.vue'
import NetworkIssue from '@/views/NetworkIssue.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList,
  },
  {
    path: '/events/:id',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      Store.dispatch('fetchEvent', routeTo.params.id)
        .then(() => {
          next()
        })
        .catch((error) => {
          if (error.response?.status == '404') {
            next({ name: 'error-page', params: { resource: 'Event' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    },
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate,
  },
  {
    path: '/event/create-for-us',
    redirect: { name: 'event-create' },
  },
  {
    path: '/404',
    name: 'error-page',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue,
  },
  {
    path: '*',
    redirect: { name: 'error-page', params: { resource: 'Page' } },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
