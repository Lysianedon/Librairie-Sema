<template>
  <div class="home">
    <div class="nav">
      <NavbarUser/>
    </div>
      <a href="" id="scrollToTop"></a>

    <div class="content">
      <img src="@/assets/banner.png" alt="banniere de page d'accueil" srcset="" class="banner">

      <div
        class="title-button"
        v-if="userLibrary && userLibrary.allBooks && userLibrary.allBooks.length > 0">
        <h2>MA BIBLIOTHÈQUE</h2>
        <router-link to="/ma-bibliotheque" class="btn-afficher-tout">Afficher tout</router-link>
      </div>
      <Book
      :bookSelection="userLibrary.allBooks"/>

      <div class="title-button">
        <h2>NOUVEAUTÉS</h2>
        <router-link to="/livres/nouveautes" class="btn-afficher-tout">Afficher tout</router-link>
      </div>
      <Book
      :bookSelection="newBooks"/>

      <div class="title-button">
        <h2>BIOGRAPHIES</h2>
        <router-link to="/livres/biographies" class="btn-afficher-tout">Afficher tout</router-link>
      </div>

      <Book
      :bookSelection="biographies"/>

        <div class="personalisedSelection" v-if="personalisedSuggestion.title">
          <h2 class="center">SÉLECTIONNÉ POUR VOUS</h2>
          <Book
          :personalisedSuggestion="personalisedSuggestion"/>
        </div>

      <div class="title-button">
        <h2>TOUS LES LIVRES</h2>
        <router-link to="/livres/tout-les-livres" class="btn-afficher-tout">Afficher tout</router-link>
      </div>
      <Book
      :bookSelection="bookList"/>
    </div>

    <a href="#scrollToTop" class="haut-de-page">
      <b-tooltip
            label="Remonter"
            type="is-white"
            position="is-top">
          <font-awesome-icon icon="fa-solid fa-arrow-up" />
        </b-tooltip>
    </a>

    <FooterComponent/>

  </div>
</template>

<script>
import axios from 'axios'
import NavbarUser from '@/components/NavbarUser.vue'
import Book from '@/components/Book.vue'
import FooterComponent from '@/components/FooterComponent.vue'

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
    FooterComponent
  },
  beforeMount () {
    axios
      .get('http://localhost:8001/user', { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          console.log(res.data.user)
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
      .get('http://localhost:8001/books', { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          // Getting the book list:
          const bookList = res.data.bookList
          // console.log(bookList)

          // Getting the newly added books:

          // Step 1 : Flatten the obj before sorting them:
          const flattenObj = (ob) => {
            // The object which contains the
            // final result
            const result = {}
            // loop through the object "ob"
            for (const i in ob) {
              // We check the type of the i using
              // typeof() function and recursively
              // call the function again
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
          console.log('newlyAddedBooks', newlyAddedBooks)
          this.newBooks = newlyAddedBooks

          const date = 'Wed Nov 09 2022'
          console.log(`stringFormat:${date} => parsedFormat:${Date.parse(date)}`)
          console.log('date to String', new Date(1665612000000).toDateString())
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
            .get('http://localhost:8001/user/library/personalised-suggestion', { withCredentials: true })
            .then(res => {
              if (res.data.success) {
                // console.log(res.data)
                this.personalisedSuggestion = res.data.personalisedSuggestion
              }
            })
          // Getting the user's library:
          axios
            .get('http://localhost:8001/user/library/', { withCredentials: true })
            .then(res => {
              if (res.data.success) {
                // console.log(res.data)
                this.userLibrary = res.data.userLibrary
              }
            })
        }
      })
      .catch(err => {
        return console.log(err)
      })
  }
}
</script>

<style scoped>

.content{
  margin: 3% auto 0 22vw;
  width: 91vw;
}

.nav{
  position: fixed;
  top: 6%;
}

.banner{
  width: 82%;
  margin: auto;
  height: 42vh;
  border: 2px solid rgb(88, 88, 88);
  border-radius: 15px;
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

.haut-de-page{
  margin-left: 95vw;
}
</style>
