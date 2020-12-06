import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'article',
    component: () => import(/* webpackChunkName: "news" */ '@/views/news/index.vue')
  },
  {
    path: '/article/:id',
    name: 'articledetail',
    component: () => import(/* webpackChunkName: "news" */ '@/views/news/ArticleDetail.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "news" */ '@/views/user/index.vue'),
    redirect: 'user/index',
    children: [
      {
        path: 'index',
        name: 'userindex',
        component: () => import(/* webpackChunkName: "news" */ '@/views/user/list.vue'),
      },
      {
        path: 'detail',
        name: 'userdetail',
        component: () => import(/* webpackChunkName: "news" */ '@/views/user/detail.vue'),
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
