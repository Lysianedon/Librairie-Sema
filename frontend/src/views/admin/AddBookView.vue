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
import axios from 'axios'
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
  beforeMount () {
    // GUARD: if user is not an admin, he gets redirected to the homepage
    axios
      .get(`http://localhost:${process.env.VUE_APP_PORT}/user/`, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          if (!res.data.user.isAdmin) {
            this.$router.push('/')
          }
        }
      })
      .catch(err => console.error(err))
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

@media(max-width: 1070px){
  .nav{
    display: none;
  }
  .nav-mobile{
    display: initial;
    position: fixed;
    top: 8%;
    left: 3%;
  }
  .content{
    margin: 0;
    width: 100vw;
    max-width: 100vw;
    padding: 2% 0 4% 0;
  }
  .hello-msg{
    padding-right: 4vw;
  }
  .gerer-livres{
    margin: 4vh 0 !important;
    width: 100% !important;
    text-align: center;
  }
}

@media(max-width: 450px){
  .gerer-livres{
    line-height: 180%;
  }
  .nav-mobile{
    top: 5%;
  }
}
</style>
