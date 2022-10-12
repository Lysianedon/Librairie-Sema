<template>
    <div class="wrap">
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
                position="is-top"
                v-if="currentCollection !== 'favoris'">
              <font-awesome-icon
                icon="fa-solid fa-heart"
                color=" rgb(108, 105, 105)"
                class="icon icon-red"
                @click="addToFavorites(book._id)"/>
              </b-tooltip>

              <b-tooltip
                label="Marquer comme lu"
                type="is-black"
                position="is-top"
                v-if="!fromAlreadyReadCollection">
                <font-awesome-icon
                  icon="fa-solid fa-book-open"
                  class="icon"
                  @click="AddToAlreadyRead(book._id)"/>
              </b-tooltip>

              <b-tooltip
                label="Marquer comme non lu"
                type="is-black"
                position="is-top"
                v-if="fromAlreadyReadCollection">
                <font-awesome-icon
                  icon="fa-solid fa-book"
                  class="icon"
                  @click="deleteFromCollection(book._id, currentCollection),addToLibrary(book._id)"/>
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
    <!-------------------------- USERS PERSONALISED SUGGESTION ----------------------->

    <div class="personalised-suggestion" v-if="personalisedSuggestion">
         <img
            class="img"
            :src="personalisedSuggestion.image"
            :alt="`page de couverture du livre : \'${personalisedSuggestion.title} \' `"
            srcset="">
          <div class="book-infos">
            <h3>{{personalisedSuggestion.title}}</h3>
            <h4>De: {{personalisedSuggestion.author}}</h4>
            <h4>Genre: {{personalisedSuggestion.genre}}</h4>
            <h4>Pays: {{personalisedSuggestion.country}}</h4>

            <h4 v-if="personalisedSuggestion.bookStore" class="ou-acheter">
              Où acheter ce livre:
                <a :href="`${personalisedSuggestion.bookStore.link}`"
                  target="_blank" rel="noopener noreferrer">
                    {{personalisedSuggestion.bookStore.name}}
                </a>
            </h4>
            <h4 class="synopsis-title">Synopsis:</h4>
            <p> {{ personalisedSuggestion.synopsis}}</p>

            <div class="btns" v-if="isUserConnected">
              <button class="btn-option" @click="addToLibrary(personalisedSuggestion._id)">Ajouter à ma bibliothèque</button>
              <button class="btn-option" @click="addToFavorites(personalisedSuggestion._id)">Ajouter à mes favoris</button>
              <button class="btn-option" @click="AddToAlreadyRead(personalisedSuggestion._id)">Ajouter à la section "Déjà lu"</button>
            </div>
          </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BookComponent',
  data () {
    return {
      isUserConnected: false
    }
  },
  props: {
    bookSelection: {
      type: Array,
      required: false
    },
    personalisedSuggestion: {
      type: Object,
      required: false
    },
    fromGeneralCollection: {
      type: Boolean,
      required: false
    },
    fromAlreadyReadCollection: {
      type: Boolean,
      required: false
    },
    currentCollection: {
      type: String,
      required: false
    }
  },
  mounted () {
    axios
      .get(`http://localhost:${process.env.VUE_APP_PORT}/user`, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.user)
          this.isUserConnected = true
        }
      })
      .catch(err => {
        return err
      })
  },
  methods: {
    addToLibrary (bookId, notification = true) {
      // Adding the book to the corresponding collection : favorites or library:
      const bookToAddID = bookId
      axios
        .post(`http://localhost:${process.env.VUE_APP_PORT}/user/library/allbooks`, { bookToAddID }, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            // console.log('added to library', res.data)
            this.$emit('updated-library',
              {
                updatedLibrary: res.data.userLibrary
              })
            if (notification) {
              // Displaying a success notification
              this.$buefy.toast.open({
                message: 'Ajouté à la bibliothèque',
                type: 'is-success'
              })
            }
          }
        })
        .catch(err => {
          // Displaying an error notification
          this.$buefy.toast.open({
            message: 'Livre déjà dans votre bibliothèque',
            type: 'is-danger'
          })
          return console.error(err)
        })
    },
    addToFavorites (bookId) {
      const bookToAddID = bookId
      axios
        .post(`http://localhost:${process.env.VUE_APP_PORT}/user/library/favorites`, { bookToAddID }, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            this.$emit('updated-favorites',
              {
                updatedFavorites: res.data.userFavoritesLibrary
              })
            // Displaying a success notification
            this.$buefy.toast.open({
              message: 'Ajouté aux favoris',
              type: 'is-success'
            })
            // Adding the book to the userLibrary too:
            this.addToLibrary(bookId, false)
          }
        })
        .catch(err => {
          // Displaying an error notification
          this.$buefy.toast.open({
            message: 'Livre déjà dans vos favoris',
            type: 'is-danger'
          })
          return console.log(err)
        })
    },
    deleteFromCollection (bookId, collection, notification = true) {
      if (collection === 'ma bibliotheque') {
        const bookToDeleteID = bookId
        axios
          .delete(`http://localhost:${process.env.VUE_APP_PORT}/user/library/allbooks`, { withCredentials: true, data: { bookToDeleteID } })
          .then(res => {
            if (res.data.success) {
              // console.log(res.data)
              this.$emit('updated-library',
                {
                  updatedLibrary: res.data.userLibrary
                })
              this.deleteFromCollection(bookId, 'favoris', false)
              this.deleteFromCollection(bookId, 'alreadyread', false)

              // Displaying a success notification
              if (notification) {
                this.$buefy.toast.open({
                  message: 'Supprimé de votre bibliothèque',
                  type: 'is-success'
                })
              }
            }
          })
          .catch(err => {
            // Displaying an error notification
            this.$buefy.toast.open({
              message: 'Oups...Erreur, veuillez réessayer',
              type: 'is-danger'
            })
            return console.log(err)
          })
      }
      // --------------------------- IF COLLECTION = FAVORITES ---------------
      if (collection === 'favorites' || collection === 'favoris') {
        const bookToDeleteID = bookId
        axios
          .delete(`http://localhost:${process.env.VUE_APP_PORT}/user/library/favorites`, { withCredentials: true, data: { bookToDeleteID } })
          .then(res => {
            // console.log(res)
            if (res.data.success) {
              // console.log(res.data)
              this.$emit('updated-favorites',
                {
                  updatedFavorites: res.data.userFavoritesLibrary
                })
              // Displaying a success notification
              this.$buefy.toast.open({
                message: 'Supprimé de vos favoris',
                type: 'is-success'
              })
            }
          })
          .catch(err => {
            // Displaying an error notification
            this.$buefy.toast.open({
              message: 'Oups...Erreur, veuillez réessayer',
              type: 'is-danger'
            })
            return console.log(err)
          })
      }
      // --------------------------- IF COLLECTION = ALREADY READ ---------------
      if (collection === 'alreadyread') {
        const bookToDeleteID = bookId
        axios
          .delete(`http://localhost:${process.env.VUE_APP_PORT}/user/library/alreadyread`, { withCredentials: true, data: { bookToDeleteID } })
          .then(res => {
            if (res.data.success) {
              this.$emit('updated-library',
                {
                  updatedAlreadyRead: res.data.userAlreadyreadLibrary
                })
              // Displaying a success notification
              this.$buefy.toast.open({
                message: 'Supprimé de la liste "Déjà lu"',
                type: 'is-success'
              })
            }
          })
      }
    },
    AddToAlreadyRead (bookId) {
      //  Adding the book to "already read" category:
      const bookToAddID = bookId
      axios
        .post(`http://localhost:${process.env.VUE_APP_PORT}/user/library/alreadyread`, { bookToAddID }, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            // console.log(res.data)
            // Adding the book to the userLibrary too:
            this.addToLibrary(bookId, false)

            // Displaying a success notification
            this.$buefy.toast.open({
              message: 'Livre ajouté à la collection "Déjà lu"',
              type: 'is-success'
            })
          }
        })
        .catch(err => {
          // Displaying an error notification
          this.$buefy.toast.open({
            message: 'Livre déjà dans la collection "Déjà lu"',
            type: 'is-danger'
          })
          return console.log(err)
        })
    }
  }
}
</script>

<style scoped>
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

h4:nth-child(5), h4:nth-child(6) {
  font-weight: bold !important;
  text-transform: none;
  line-height: 190%;
}
h4 a {
  color: green;
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
  width: 97%;
  text-align: justify;
}
.synopsis-title{
  font-weight: bold;
  margin-top: 6%;
}

.btns{
  display: flex;
}

button{
  font-weight: bold;
  /* margin-left: .1rem; */
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
