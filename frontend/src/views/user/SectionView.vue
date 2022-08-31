<template>
    <div class="wrap">
        <h1 class="is-size-1"> {{sectionTitle}}</h1>
    <div class="books" v-if="bookSelection">
        <div :v-if="typeof bookSelection === Array"
            v-for="(book, index) in bookSelection" :key="index"
            class="book">
            <div class="icons-options" v-if="isUserConnected">
              <b-tooltip
                label="Voir"
                type="is-black"
                position="is-top">
                <router-link :to="`/livres/${book._id}`" class="grey">
                  <font-awesome-icon icon="fa-solid fa-eye" class="icon icon-eye"/>
                </router-link>
              </b-tooltip>

              <b-tooltip
                label="Ajouter à la bibliothèque"
                type="is-black"
                position="is-top"
                v-if="fromGeneralCollection">
              <font-awesome-icon
                icon="fa-solid fa-circle-plus"
                class="icon"
                @click="addToLibrary(book._id)"/>
              </b-tooltip>

              <b-tooltip
                label="Ajouter aux favoris"
                type="is-black"
                position="is-top">
              <font-awesome-icon
                icon="fa-solid fa-heart"
                color=" rgb(108, 105, 105)"
                class="icon icon-red"
                @click="addToFavorites(book._id)"/>
              </b-tooltip>

              <b-tooltip
                label="Supprimer"
                type="is-black"
                position="is-top"
                v-if="!fromGeneralCollection">
              <font-awesome-icon
                icon="fa-solid fa-trash-can"
                class="icon icon-trashcan"
                @click="deleteFromCollection(book._id, currentCollection)"/>
              </b-tooltip>

            </div>
            <router-link :to="`/livres/${book._id}`">
              <img
              class="img"
              :src="book.image"
              :alt="`page de couverture du livre : \'${book.title} \' `"
              srcset="">
            </router-link>
            <router-link :to="`/livres/${book._id}`">
              <h3>{{book.title}}</h3>
            </router-link>

            <h4>De: {{book.author}}</h4>
            <h4>Pays: {{book.country}}</h4>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SectionView',
  data () {
    return {
      sectionTitle: '',
      backendRouteName: '',
      currentSection: '',
      bookSelection: [],
      isUserConnected: false,
      fromGeneralCollection: false
    }
  },
  mounted () {
    const params = this.$route.params.sectionview
    // IF THE ROUTE IS REDIRECTING TO THE USER'S LIBRARY, WE GET THE INFOS AND SET THE PARAMETERS ACCORDINGLY (SECTION TITLE, BACKEND'S ROUTE URL, ETC):
    if (params === 'ma-bibliotheque') {
      this.sectionTitle = 'Ma bibliothèque'
      this.backendRouteName = 'user/library'
      this.currentSection = 'Ma bibliothèque'

      // Getting the book selection:
      axios
        .get(`http://localhost:8001/${this.backendRouteName}`, { withCredentials: true })
        .then(res => {
          console.log(res.data)
          this.bookSelection = res.data.userLibrary.allBooks
          this.isUserConnected = true
        })
    }
    // IF THE ROUTE IS REDIRECTING TO THE USER'S FAVORITES:
    if (params === '') {
      this.sectionTitle = 'Ma bibliothèque'
      this.backendRouteName = 'user/library'
      this.currentSection = 'Ma bibliothèque'

      // Getting the book selection:
      axios
        .get(`http://localhost:8001/${this.backendRouteName}`, { withCredentials: true })
        .then(res => {
          console.log(res.data)
          this.bookSelection = res.data.userLibrary.allBooks
          this.isUserConnected = true
        })
    }
  }
}
</script>

<style scoped>
.wrap{
  /* flex-wrap: wrap; */
  /* flex-wrap: wrap; */
}
.book{
    /* border: 1px solid black; */
    height: 75vh;
    height: fit-content;
    width: 17vw;
    margin: 1%;
    padding: 2.5% 1.5% 3% 1.5%;
    border-radius: 5px;
    cursor: pointer;
}

.book:hover{
  /* border: 1px solid rgb(207, 203, 203); */
    box-shadow: 0 2px 4px rgba(128, 124, 124, 0.25), 0 2px 7px rgba(100, 98, 98, 0.22);
}

.books{
  display: flex;
}

.img{
    margin: auto;
    border-radius: 3px;
    box-shadow: 0 8px 10px rgba(108, 106, 106, 0.25), 0 2px 7px rgba(188, 186, 186, 0.22);
    position: relative !important;
}

h3{
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    line-height: 155% !important;
}

h3::first-letter{
  text-transform: capitalize;
}

h4{
    text-transform: capitalize;
    font-size: 1rem !important;
    font-weight: lighter !important;
    margin-bottom: 3%;
}

.personalised-suggestion{
  display: flex;
  justify-content: space-between;
  width: 65vw;
  padding: 2.5% 1.5% 3% 1.5%;
  border-radius: 5px;
  cursor: default;
}

.book-infos{
  margin-left: 6%;
  margin-top: 7%;
}

p{
  line-height: 190%;
  width: 90%;
  text-align: justify;
}
.synopsis-title{
  font-weight: bold !important;
  margin-top: 6%;
}

.btns{
  display: flex;
}

button{
  font-weight: bold;
}

.icons-options{
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin: auto 0 auto 10%;
  background-color: white;
  opacity: 0;
  margin-bottom: 5%;
  color: rgb(77, 76, 76);
}

.grey{
  color: rgb(77, 76, 76);
}
.icon{
  width: 19px;
}

.icon-trashcan{
  width: 17px;
}
.icon-eye{
  width: 21px;
}

.book:hover > * {
  opacity: 1;
}

.icon:hover{
  color: black;
}
.icon-red:hover{
  color: red;
}
/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

@media(max-width: 850px){
  .btns{
    flex-direction: column;
    width: 90%;
  }

  .book:nth-child(3){
    display: none;
  }
}

@media(max-width: 500px){
  .books{
    flex-direction: column;
    width: 100vw;
    overflow-x: hidden;
  }
  p{
    text-align: left;
    width: 95%;
  }
}

@media(max-width: 1250px){
  .book{
    /* height: 75vh; */
    height: fit-content;
    width: 95%;
    margin: 1%;
  }

  .book:nth-child(4){
    display: none;
  }

  .personalised-suggestion{
    flex-direction: column;
    align-items: center;
    width: 80vw;
    padding: 2.5% 1.5% 3% 1.5%;
  }

  .book-infos{
    margin-left: 16%;
    margin-top: 7%;
  }
}
</style>
