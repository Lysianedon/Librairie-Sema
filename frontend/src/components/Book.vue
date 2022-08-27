<template>
    <div>
    <div class="books" v-if="bookSelection">
        <div :v-if="typeof bookSelection === Array"
            v-for="(book, index) in bookSelection" :key="index"
            class="book">
            <div class="icons-options">
              <b-tooltip
                label="Voir"
                type="is-black"
                position="is-top">
              <font-awesome-icon icon="fa-solid fa-eye" class="icon icon-eye"/>
              </b-tooltip>
              <b-tooltip
                label="Ajouter à la bibliothèque"
                type="is-black"
                position="is-top"
                v-if="fromGeneralCollection">
              <font-awesome-icon
                icon="fa-solid fa-circle-plus"
                class="icon"
                @click="addToCollection (book._id, 'library')"/>
              </b-tooltip>

              <b-tooltip
                label="Ajouter aux favoris"
                type="is-black"
                position="is-top">
              <font-awesome-icon
                icon="fa-solid fa-heart"
                color=" rgb(108, 105, 105)"
                class="icon icon-red"
                @click="addToCollection (book._id, 'favorites')"/>
              </b-tooltip>

              <b-tooltip
                label="Supprimer"
                type="is-black"
                position="is-top"
                v-if="!fromGeneralCollection">
              <font-awesome-icon icon="fa-solid fa-trash-can" class="icon icon-trashcan"/>
              </b-tooltip>

            </div>
            <img
            class="img"
            :src="book.image"
            :alt="`page de couverture du livre : \'${book.title} \' `"
            srcset="">
            <h3>{{book.title}}</h3>
            <h4>De: {{book.author}}</h4>
            <h4>Pays: {{book.country}}</h4>
        </div>
    </div>

    <!-------------------------- USERS PERSONALISED SUGGESTION --------------->

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
            <h4 class="synopsis-title">Synopsis:</h4>
            <p> {{ personalisedSuggestion.synopsis}}</p>

            <div class="btns">
              <button class="btn-option" @click="addToCollection(personalisedSuggestion._id, 'library')">Ajouter à ma bibliothèque</button>
              <button class="btn-option" @click="addToCollection(personalisedSuggestion._id, 'favorites')">Ajouter à mes favoris</button>
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
    }
  },
  methods: {
    addToCollection (bookId, collection) {
      // Adding the book to the corresponding collection : favorites or library:
      if (collection === 'library') {
        const bookToAddID = bookId
        axios
          .post('http://localhost:8001/user/library/allbooks', { bookToAddID }, { withCredentials: true })
          .then(res => {
            if (res.data.success) {
              console.log(res.data)
              // Displaying a success notification
              this.$buefy.toast.open({
                message: `Ajouté ${collection === 'library' ? 'à la bibliothèque' : 'aux favoris'}`,
                type: 'is-success'
              })
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
      }
      if (collection === 'favorites') {
        const bookToAddID = bookId
        axios
          .post('http://localhost:8001/user/library/favorites', { bookToAddID }, { withCredentials: true })
          .then(res => {
            if (res.data.success) {
              console.log(res.data)
              // Displaying a success notification
              this.$buefy.toast.open({
                message: 'Ajouté aux favoris',
                type: 'is-success'
              })
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
      }
    },
    sayHi () {
      console.log('test')
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
  /* border: 1px solid rgb(207, 203, 203); */
    box-shadow: 0 2px 4px rgba(128, 124, 124, 0.25), 0 2px 7px rgba(100, 98, 98, 0.22);
}

.books{
  display: flex;
}

.img{
    /* width: 93% !important; */
    /* height: 90% !important; */
    /* width: 275px !important; */
    /* height: 340px !important; */
    /* border: 1px solid black; */
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
</style>
