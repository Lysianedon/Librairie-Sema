import Vue from 'vue'
import VueRouter from 'vue-router'
// ---------------- IMPORT VIEWS -------------
import HomeView from '@/views/user/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import InscriptionView from '@/views/user/InscriptionView.vue'
// import LibraryUserView from '@/views/user/LibraryUserView.vue'
import SectionView from '@/views/user/SectionView.vue'
import FavoriteUserView from '@/views/user/FavoriteUserView.vue'
import SettingsUserView from '@/views/user/SettingsUserView.vue'
import HelpView from '@/views/HelpView.vue'
import BookView from '@/views/BookView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/inscription/preferences',
    name: 'inscription',
    component: InscriptionView
  },
  // {
  //   path: '/section/ma-bibliotheque',
  //   name: 'LibraryUserView',
  //   component: LibraryUserView
  // },
  {
    path: '/section/:sectionview',
    name: 'SectionView',
    component: SectionView

  },
  {
    path: '/favoris',
    name: 'FavoriteUserView',
    component: FavoriteUserView
  },
  {
    path: '/mon-compte',
    name: 'SettingsUserView',
    component: SettingsUserView
  },
  {
    path: '/aide',
    name: 'HelpView',
    component: HelpView
  },
  {
    path: '/livres/:bookId',
    name: 'BookView',
    component: BookView
  }
  // {
  //   path: '/livres/nouveautes',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/tout-les-livres',
  //   name: 'AllBooksView',
  //   component: AllBooksView
  // },
  // {
  //   path: '/livres/biographies',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/livres/romans',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/livres/bandes-dessinees',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/ma-librairie/deja-lus',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/admin/back-office',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/admin/back-office/utilisateurs',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/admin/back-office/livres',
  //   name: 'home',
  //   component: HomeView
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
