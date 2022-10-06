<template>
    <div>
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
        <h2 class="gerer-livres ml-5 p-5">Gérer la bibliothèque</h2>

        <div class="book-list">
          <BookListComponent
          :bookList="bookList"
          @updateListBooks="updateListBooksFromParentElem"/>
        </div>

      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import NavbarAdmin from '@/components/admin/NavbarAdmin.vue'
import NavbarMobileAdmin from '@/components/admin/NavbarMobileAdmin.vue'
import BookListComponent from '@/components/admin/BookListComponent.vue'
export default {
  name: 'BookListView',
  data () {
    return {
      adminName: '',
      bookList: []
    }
  },
  components: { NavbarAdmin, NavbarMobileAdmin, BookListComponent },
  mounted () {
    axios
      .get(`http://localhost:${process.env.VUE_APP_PORT}/books`, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.bookList)
          this.bookList = res.data.bookList
        }
      })
  },
  methods: {
    getName (payload) {
      this.adminName = payload.adminName
    },
    updateListBooksFromParentElem (payload) {
      if (payload.deletedBook || payload.updatedBook) {
        axios
          .get(`http://localhost:${process.env.VUE_APP_PORT}/books`, { withCredentials: true })
          .then(res => {
            if (res.data.success) {
              // console.log(res.data.bookList)
              this.bookList = res.data.bookList
            }
          })
      }
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
    padding: 2% 0 4% 0;
  }
  .book-list{
    margin-top: 6%;
  }
  .gerer-livres{
    width: 100%;
    text-align: center;
  }
}
/* -------MOBILE VERSION --------- */
@media(max-width: 430px){
  .nav-mobile{
    top: 5%;
  }
  .hello-msg{
    font-size: 1.3rem;
  }
  .back-office{
    font-size: 1.8rem;
    margin: 12% auto;
  }
  .gerer-livres{
    font-size: 1.5rem;
    margin: 3% 3% 10% 3% !important;
    width: 100%;
  }
}
</style>
