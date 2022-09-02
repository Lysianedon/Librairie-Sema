<template>

<div class="wrapper">
    <div class="nav">
      <NavbarUser/>
    </div>
    <div class="sidebar-mobile">
      <SidebarMobile/>
    </div>
  <div class="content">
    <img src="@/assets/banner.png" alt="banniere de page d'accueil" srcset="" class="banner">

    <div class="personalised-suggestion">

      <a class="btn-retour" @click="$router.go(-1)"> &lt;&lt; Retour</a>
      <div class="white-space"></div>
      <Book
         :personalisedSuggestion="book"
         @updated-library="updateLibrary"/>
    </div>

      <div class="footer-component">
        <FooterComponent/>
      </div>

   </div>
</div>
</template>

<script>
import axios from 'axios'
import NavbarUser from '@/components/NavbarUser.vue'
import SidebarMobile from '@/components/SidebarMobile.vue'
import Book from '@/components/Book.vue'
import FooterComponent from '@/components/FooterComponent.vue'
export default {
  name: 'BookView',
  data () {
    return {
      book: {
        title: '',
        author: '',
        genre: '',
        country: '',
        synopsis: ''
      }
    }
  },
  mounted () {
    axios
      .get(`http://localhost:8001/books/${this.$route.params.bookId}`)
      .then(res => {
        if (res.data.success) {
          console.log(res.data)
          this.book = res.data.selectedBook
        }
      })
      .catch(err => {
        return console.error(err)
      })
  },
  components: { NavbarUser, SidebarMobile, Book, FooterComponent }
}
</script>

<style scoped>
.personalised-suggestion{
  width: 90%;
  margin: 3% auto;
}

.content{
  margin: 3% auto 0 22vw;
  width: 91vw;
}

.nav{
  position: fixed;
  top: 6%;
}

.sidebar-mobile{
  display: none;
}

.banner{
  width: 82%;
  margin: auto;
  height: 42vh;
  border: 2px solid rgb(88, 88, 88);
  border-radius: 15px;
}
/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

@media(max-width: 1250px){
  .personalised-suggestion{
    flex-direction: column;
    align-items: center;
    width: 80vw;
    padding: 2.5% 1.5% 3% 1.5%;
  }
}

@media(max-width: 1170px){
  .nav{
    display: none;
  }

  .sidebar-mobile{
    display: block;
    position: fixed;
    top: 3%;
    left: 2%;
    z-index: 2;
  }

  .content{
    margin: auto;
    width: 95vw;
  }

  .banner{
    width: 95%;
    margin: 3% 2% !important;
    height: 42vh;
  }

  .personalised-suggestion{
    margin: 12% auto 8% 4%;
  }
  .footer-component{
    margin-left: 0;
  }
  .btn-retour{
    padding: 2%;
  }
  .white-space{
    height: 6vh;
  }

  @media(max-width: 425px){
    .btn-retour{
      padding: 4%;
    }
  }
}

</style>
