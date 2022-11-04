<template>
  <div class="home">
    <div class="nav">
      <NavbarUser/>
    </div>
    <div class="sidebar-mobile">
      <SidebarMobile/>
    </div>
      <a href="" id="scrollToTop"></a>

    <div class="content">
      <img src="@/assets/banner.png" alt="banniere de page d'accueil" srcset="" class="banner banner-homepage">
      <img src="@/assets/home-banner-mobile.png" alt="banniere de page d'accueil" srcset="" class="banner banner-mobile">

      <div
        class="title-button"
        v-if="userLibrary && userLibrary.allBooks && userLibrary.allBooks.length > 0">
        <h2>MA BIBLIOTHÈQUE</h2>
        <router-link to="/section/ma-bibliotheque" class="btn-afficher-tout btn-afficher-tout-bigger">Afficher tout</router-link>
      </div>
      <div class="container-books">
        <Book
        :bookSelection="userLibrary.allBooks"
        :fromGeneralCollection="false"
        :currentCollection="'ma bibliotheque'"
        @updated-library="updateLibrary"/>
      </div>

      <div class="personalisedSelection" v-if="personalisedSuggestion.title">
          <h2 class="center">SÉLECTIONNÉ POUR VOUS</h2>
          <Book
          :personalisedSuggestion="personalisedSuggestion"
          @updated-library="updateLibrary"/>
        </div>

      <div class="title-button">
        <h2>NOUVEAUTÉS</h2>
        <router-link to="/section/nouveautes" class="btn-afficher-tout">Afficher tout</router-link>
      </div>
        <div class="container-books">
          <Book
          :bookSelection="newBooks"
          :fromGeneralCollection="true"
          @updated-library="updateLibrary"/>
        </div>

      <div class="title-button">
        <h2>BIOGRAPHIES</h2>
        <router-link to="/section/biographies" class="btn-afficher-tout">Afficher tout</router-link>
      </div>
      <div class="container-books">
        <Book
        :bookSelection="biographies"
        :fromGeneralCollection="true"
        @updated-library="updateLibrary"/>
      </div>

      <div class="title-button">
        <h2>TOUS LES LIVRES</h2>
        <router-link to="/section/tous-les-livres" class="btn-afficher-tout btn-afficher-tout-bigger">Afficher tout</router-link>
      </div>

      <div class="container-books">
        <Book
        :bookSelection="bookList"
        :fromGeneralCollection="true"
        @updated-library="updateLibrary"/>
      </div>
    </div>

    <a href="#scrollToTop" class="haut-de-page">
      <b-tooltip
            label="Remonter"
            type="is-white"
            position="is-top">
          <font-awesome-icon icon="fa-solid fa-arrow-up" />
        </b-tooltip>
    </a>

    <div class="footer-component">
        <FooterComponent/>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import NavbarUser from '@/components/NavbarUser.vue'
import Book from '@/components/Book.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import SidebarMobile from '@/components/SidebarMobile.vue'

export default {
  name: 'HomeView',
  data () {
    return {
      username: '',
      userLibrary: [],
      userInfos: {},
      bookList: [],
      newBooks: [],
      biographies: [],
      personalisedSuggestion: {}
    }
  },
  components: {
    NavbarUser,
    Book,
    FooterComponent,
    SidebarMobile
  },
  beforeMount () {
    axios
      .get(`http://localhost:${process.env.VUE_APP_PORT}/user`, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.user)
          this.username = res.data.user.firstname
          this.userInfos = res.data.user
        }
      })
      .catch(err => {
        return console.log(err)
      })
  },
  mounted () {
    axios
      .get(`http://localhost:${process.env.VUE_APP_PORT}/books`, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          // Getting the book list:
          const bookList = res.data.bookList
          // console.log(bookList)

          // Getting the newly added books:

          // Step 1 : Flatten the obj before sorting them:
          const flattenObj = (ob) => {
            // The object which contains the final result
            const result = {}
            // loop through the object "ob"
            for (const i in ob) {
              // We check the type of the i using typeof() function and recursively call the function again
              if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
                const temp = flattenObj(ob[i])
                for (const j in temp) {
                  // Store temp in result
                  result[i + j] = temp[j]
                }
              } else { // Else store ob[i] in result directly
                result[i] = ob[i]
              }
            }
            return result
          }
          const flattenBooksOjects = bookList.map(book => {
            book = flattenObj(book)
            return book
          })
          // console.log(flattenBooksOjects)

          // Step 2 : sorting the books:
          const newlyAddedBooks = flattenBooksOjects.slice().sort((a, b) => b.dateAddedparsedFormat - a.dateAddedparsedFormat)
          newlyAddedBooks.length = 4
          // console.log('newlyAddedBooks', newlyAddedBooks)
          this.newBooks = newlyAddedBooks

          // const date = 'Wed Nov 09 2022'
          // console.log(`stringFormat:${date} => parsedFormat:${Date.parse(date)}`)
          // console.log('date to String', new Date(1665612000000).toDateString())
          // const books = [1661431787000, 1661429232332, 1661429717940, 1661429717988, 1661429717993, 1660924717993]

          // Getting a selection of 4 biographies:
          const biographies = bookList.filter(book => book.genre.toLowerCase() === 'biographie' || book.genre.toLowerCase() === 'autobiographie')
          biographies.length = 4
          // console.log('biographies', biographies)
          this.biographies = biographies

          // Get a selection of four books :
          bookList.length = 4
          // console.log('bookList', bookList)
          this.bookList = bookList

          // Getting the user's personalised book suggestion:
          axios
            .get(`http://localhost:${process.env.VUE_APP_PORT}/user/library/personalised-suggestion`, { withCredentials: true })
            .then(res => {
              if (res.data.success) {
                // console.log(res.data)
                this.personalisedSuggestion = res.data.personalisedSuggestion
              }
            })
          // Getting the user's library:
          axios
            .get(`http://localhost:${process.env.VUE_APP_PORT}/user/library/`, { withCredentials: true })
            .then(res => {
              if (res.data.success) {
                // console.log(res.data)
                const userLibrary = res.data.userLibrary
                // console.log('userLibrary.allBooks', userLibrary)
                if (userLibrary.allBooks.length > 4) {
                  userLibrary.allBooks.length = 4
                }
                this.userLibrary = userLibrary
              }
            })
        }
      })
      .catch(err => {
        return console.log(err)
      })
  },
  methods: {
    updateLibrary (payload) {
      if (payload.updatedLibrary) {
        this.userLibrary.allBooks = payload.updatedLibrary
        console.log('updatedLibrary: ', payload.updatedLibrary)
        if (this.userLibrary.allBooks.length > 4) {
          this.userLibrary.allBooks.length = 4
        }
      }
    }
  }
}
</script>

<style scoped>

.content{
  margin: 3% auto 0 22vw;
  width: 91vw;
}

.banner{
  width: 82%;
  margin: auto;
  height: 42vh;
  border: 2px solid rgb(88, 88, 88);
  border-radius: 15px;
}
.banner-mobile{
  display: none;
}

.title-button{
  display: flex;
  justify-content: space-between;
  margin-top: 3%;
  width: 74vw;
}

h2{
  font-family: 'Ibarra Real Nova', serif;
  color: black;
  cursor: default;
}

.personalisedSelection{
  /* width: 50%; */
  margin: 8% auto 8% 5%;
}
.center{
  margin: auto;
  /* border: 1px solid green; */
  width: 70%;
}

.footer-component{
  margin-left: 22vw;
  margin-top: 3%;
}

/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

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
  .title-button{
  justify-content: space-between;
  margin: 3% 0 0 2%;
  width: 90vw;
  }

  .center{
    width: 50%;
    margin-bottom: 5%;
  }

  .personalisedSelection{
  margin: 8% auto 8% 4%;
  }
  .haut-de-page{
    padding:2%;
    margin-left: 88vw;
  }
  .footer-component{
    margin-left: 0;
  }
}
/*-------------  TABLET MODE ------------ */
@media(max-width: 770px){
  .center{
    width: 80%;
    margin-left: 15%;
    margin-bottom: 5%;
  }
}

/*-------------  MOBILE MODE ------------ */
@media(max-width: 450px){

  .container-books{
    width: 50%;
    /* margin: auto; */
    /* margin: 0 0 0 12%; */
    padding: 0;
  }
  .btn-afficher-tout{
    padding: 3% 2% .1% 2%;
    height: 7vh;
    text-align: center;
    overflow-wrap: break-word;
  }
  .btn-afficher-tout-bigger{
    padding: 0 2% 5% 2% !important;
    /* width: 50vw; */
  }

  h2{
    font-size: 1.9rem;
  }

  .title-button{
    width: 92vw;
  }

  .center{
    width: 90%;
    margin: 10% 4%;
    text-align: center;
  }

  .haut-de-page{
    padding:6%;
     margin-left: 75vw;
  }
}
@media(max-width: 460px){
  .banner-mobile{
    display: initial;
  }
  .banner-homepage{
    display: none;
  }
}
@media(max-width: 330px){
    .title-button{
      flex-direction: column;
      width: 90vw;
      align-items: center;
      justify-content: center;
    }

    .btn-afficher-tout{
    padding: 3% 2% .1% 2%;
    height: 5vh;
    text-align: center;
    overflow-wrap: break-word;
  }
}
</style>
