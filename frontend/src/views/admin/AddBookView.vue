<template>
   <div class="wrapper">
      <div class="content">
         <div class="nav">
          <NavbarAdmin
          @get-name="getName"/>
        </div>
        <div class="nav-mobile">
          <NavbarMobileAdmin
           @get-name="getName"/>
        </div>
       <h3 class="has-text-right hello-msg">Bonjour, {{adminName}} !</h3>
        <h1 class="has-text-centered back-office">BACK OFFICE</h1>
        <h2 class="gerer-livres ml-5 p-5">Ajouter une référence à la bibliothèque</h2>

        <div class="bookform">
            <BookForm/>
        </div>

      </div>
    </div>
</template>

<script>
import NavbarAdmin from '@/components/admin/NavbarAdmin.vue'
import NavbarMobileAdmin from '@/components/admin/NavbarMobileAdmin.vue'
import BookForm from '../../components/admin/BookForm.vue'
export default {
  name: 'AddBookView',
  data () {
    return {
      adminName: ''
    }
  },
  components: { NavbarAdmin, NavbarMobileAdmin, BookForm },
  methods: {
    getName (payload) {
      this.adminName = payload.adminName
    }
  }
}
</script>

<style scoped>
.content{
  /* background: url('@/assets/bookmark.png') no-repeat;
  background-position-y: 42vh;
  background-position-x: 52vw;
  background-size: 30%; */
  margin: 1% auto 0 22vw;
  width: 74vw;
  padding: 2% 0 4% 0;
}

.nav{
  position: fixed;
  top: 6%;
  left: 1%;
}
.nav-mobile{
  display: none;
}
.book-list{
  margin-top: 5%;
}
.hello-msg{
  font-weight: 100;
}
.gerer-livres{
  background-color: #ECEEE5;
}

.bookform{
  margin-top: 10vh;
}
/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */
</style>
