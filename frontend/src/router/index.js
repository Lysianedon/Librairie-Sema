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
import ReadersListView from '@/views/admin/ReadersListView.vue'
import BookListView from '@/views/admin/BookListView.vue'
import AddBookView from '@/views/admin/AddBookView.vue'

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
  },
  {
    path: '/admin/back-office/bibliotheque',
    name: 'BookListView',
    component: BookListView
  },
  {
    path: '/admin/back-office/lecteurs',
    name: 'ReadersListView',
    component: ReadersListView
  },
  {
    path: '/admin/back-office/bibliotheque/ajouter-un-livre',
    name: 'AddBookView',
    component: AddBookView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
