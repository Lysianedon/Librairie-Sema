<template>
    <div :class="`book is-flex ${enlarged ? 'enlarge': ''}`" v-if="!removed">

                <!-------------------- MODAL TO UPDATE BOOK -------------->
                <div :class="`modify-book ${isModalOpened ? 'display': ''}`">

                  <font-awesome-icon
                    icon="fa-solid fa-xmark"
                    class="icon icon-close"
                    @click="cancelUpdates"/>

                <h2 class="h2-modify-book">Modifier le livre</h2>
                    <label for="identifiant">Identifiant</label>
                    <input type="text" name="identifiant" class="input-identifiant" :value="book._id" disabled>

                    <label for="title">Titre</label>
                    <input type="text" name="title" :class="`input-title-${book._id}`" :value="book.title">

                    <label for="image">Image</label>
                    <input type="text" name="image" :class="`input-image-${book._id}`" :value="book.image">

                    <label for="author">Auteur</label>
                    <input type="text" name="author" :class="`input-author-${book._id}`" :value="book.author">

                    <label for="genre">Genre</label>
                    <input type="text" name="genre" :class="`input-genre-${book._id}`" :value="book.genre">

                    <label for="country">Pays</label>
                    <input type="text" name="country" :class="`input-country-${book._id}`" :value="book.country">

                    <label for="country">Où se le procurer</label>
                    <input type="text" name="country" :class="`input-nameStore-${book._id}`" :value="book.bookStore.name">

                    <label for="country">Lien du site ou adresse</label>
                    <input type="text" name="country" :class="`input-linkStore-${book._id}`" :value="book.bookStore.link">

                    <label for="dateAdded">Date d'ajout</label>
                    <input type="text" name="dateAdded" :class="`input-dateAdded input-dateAdded-${book._id}`" :value="book.dateAdded.stringFormat" disabled>

                    <label for="ageRanges">Tranches d'âge</label>
                     <ul>
                         <input type="text" name="ageRanges" :class="`inputs-ageRanges inputs-ageRanges-${book._id}`" v-for="(age, index) in book.ageRange" :key="index" :value="age">
                    </ul>

                    <label for="synopsis">Synopsis</label>
                    <textarea name="synopsis" :class="`input-synopsis input-synopsis-${book._id}`" id="" cols="70" rows="10" :value="book.synopsis"></textarea>

                    <div class="btns">
                        <div class=" btn btn-valider" @click="saveUpdates(book._id)">Sauvegarder les modifications</div>
                        <div class=" btn btn-option" @click="cancelUpdates">Annuler les modifications</div>
                    </div>
                </div>
                <!-------------------- BOOK CARD --------------------------->
            <div class="book-infos">
                <div class="cols-infos">
                    <img :src="book.image" :alt="`image miniature du livre ${book.title}`" srcset="">
                    <div class="col-one-infos">
                        <h4 class="h4-id book-title">Titre: <span class="light">{{book.title}}</span> </h4>
                        <h4 class="h4-id">Auteur: <span class="light">{{book.author}}</span> </h4>
                        <h4 class="h4-id">Genre: <span class="light">{{book.genre}}</span> </h4>
                        <h4 class="h4-id">Pays: <span class="light">{{book.country}}</span> </h4>
                    </div>
                    <div class="col-two-infos">
                        <h4 class="h4-id book-id">Identifiant: <span class="light">{{book._id}}</span> </h4>
                        <h4 class="h4-id">Date d'ajout: <span class="light">{{book.dateAdded.stringFormat}}</span> </h4>
                        <h4 class="h4-id">Tranches d'âge:</h4>
                        <ul>
                            <li v-for="(age, index) in book.ageRange" :key="index">{{age}}</li>
                        </ul>
                    </div>
                </div>
                 <div :class="`bookstore ${enlarged ? '' : 'hidden'}`" v-if="book.bookStore">
                    <h4 class="h4-id">Où l'acheter: <span class="light"><a :href="`${book.bookStore.link}`" target="_blank" rel="noopener noreferrer">{{book.bookStore.name}}</a></span> </h4>
                </div>
                <h4 :class="`h4-id ${enlarged ? '' : 'hidden mobile-hidden'}`">Synopsis: <span class="light synopsis">{{book.synopsis}}</span> </h4>
            </div>

            <h4 class="voir-plus" @click="openModal"> Afficher tout...</h4>

            <div class="icons is-flex is-flex-direction-column is-justify-content-space-between">
                <b-tooltip
                :label="`${enlarged ? 'Réduire': 'Afficher tout'}`"
                type="is-black"
                position="is-left">
                <font-awesome-icon
                icon="fa-solid fa-eye"
                class="icon icon-eye"
                @click="enlargeCard(book._id)" />
                </b-tooltip>

                <b-tooltip
                label="Modifier"
                type="is-black"
                position="is-left">
                <font-awesome-icon
                icon="fa-solid fa-pencil"
                class="icon icon-pencil"
                @click="openModal"/>
                </b-tooltip>

                <b-tooltip
                label="Supprimer"
                type="is-black"
                position="is-left">
                <font-awesome-icon
                icon="fa-solid fa-trash-can"
                class="icon icon-trashcan"
                @click="deleteBook(book._id)"/>
                </b-tooltip>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CardBooksComponent',
  data () {
    return {
      enlarged: false,
      removed: false,
      isModalOpened: false
    }
  },
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    enlargeCard () {
      this.enlarged = !this.enlarged
    },
    deleteBook (bookToDeleteID) {
      axios
        .delete(`http://localhost:${process.env.VUE_APP_PORT}/admin/booklist`, { withCredentials: true, data: { bookToDeleteID } })
        .then(res => {
          if (res.data.success) {
            this.$buefy.toast.open({
              message: 'Livre supprimé',
              type: 'is-success'
            })
            this.removed = true
            this.$emit('update-list-books', {
              deletedBook: true,
              updatedBook: false
            })
          }
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: 'Un problème est survenu. Veuillez réessayer.',
            type: 'is-danger'
          })
          return console.log(err)
        })
    },
    openModal () {
      this.isModalOpened = !this.isModalOpened
    },
    cancelUpdates () {
      this.isModalOpened = !this.isModalOpened
    },
    saveUpdates (id) {
      // creating the bookObj before sending the updated infos to the server:
      const title = document.querySelector(`.input-title-${this.book._id}`).value
      const author = document.querySelector(`.input-author-${this.book._id}`).value
      const genre = document.querySelector(`.input-genre-${this.book._id}`).value
      const image = document.querySelector(`.input-image-${this.book._id}`).value
      const country = document.querySelector(`.input-country-${this.book._id}`).value
      const synopsis = document.querySelector(`.input-synopsis-${this.book._id}`).value
      const nameStore = document.querySelector(`.input-nameStore-${this.book._id}`).value
      const linkStore = document.querySelector(`.input-linkStore-${this.book._id}`).value
      const ageRange = Array.from(document.querySelectorAll(`.inputs-ageRanges-${this.book._id}`)).map(ageRange => ageRange.value).filter(ageRange => ageRange !== '')

      //  Guard: checking if the required fileds are not empty:
      if (title === '' || author === '' || genre === '' || country === '' || synopsis === '') {
        this.$buefy.toast.open({
          message: 'Champs vides ou incomplets. Veuillez vérifier la fiche.',
          type: 'is-danger'
        })
        return null
      }
      const updatedBook = {
        title,
        author,
        synopsis,
        genre,
        country,
        image,
        ageRange,
        bookStore: {
          name: nameStore,
          link: linkStore
        }
      }

      axios
        .put(`http://localhost:${process.env.VUE_APP_PORT}/admin/booklist`, { id, updatedBook }, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            this.$buefy.toast.open({
              message: 'Fiche mise à jour',
              type: 'is-success'
            })
            setTimeout(() => {
              this.isModalOpened = false
            }, 1500)

            // Signaling the changes to the parentElem and grandparent elem to update data and rerender component:
            this.$emit('update-list-books', {
              deletedBook: false,
              updatedBook: true
            })
          }
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: 'Champs vides ou incomplets. Veuillez vérifier la fiche.',
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
  border-radius: 10px;
  width: 65vw;
  margin: 2%;
  height: 38vh;
  padding: 4%;
  background-color: #ECEEE5;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: ease-in-out 400ms all;
  overflow-y: hidden;
}
.cols-infos{
  display:flex;
  justify-content: space-around;
}

.col-two-infos, .col-one-infos{
  margin-right: 2%;
}
.book:hover{
  background-color: #eef0e7;
  box-shadow: 0 4px 8px rgba(108, 106, 106, 0.25), 0 4px 15px rgba(136, 134, 134, 0.22);
}
.enlarge{
  height: 100vh;
  padding-bottom: 3%;
  min-width: 47%;
}
.voir-plus{
    display: none;
}

.hidden{
    visibility: hidden;
}
.removed{
  display: none;
}

img{
    width: 100px;
    height:150px;
    margin: 3% 4% 0 0;
    box-shadow: 0 2px 4px rgba(128, 124, 124, 0.25), 0 2px 7px rgba(100, 98, 98, 0.22);
    border-radius: 5px;
}
.light{
    font-size:1.1rem;
}
.book-title, .book-id{
    width: 80%;
}
.synopsis{
    font-size:1.1rem;
    display:block;
    padding-top: 2%;
}

.modify-book{
  height: 71vh;
  width: 60vw;
  overflow-y: scroll ;
  border-radius: 10px;
  padding: 2%;
  text-align: center;
  background-color: #fff1cce9;
  backdrop-filter: blur(5px);
  position: fixed;
  right: 42%;
  transform: translate(50%,-50%);
  z-index: 1;
  box-shadow: 0 4px 8px rgba(108, 106, 106, 0.25), 0 4px 15px rgba(136, 134, 134, 0.22);
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  top: -50%; /*Put it on the very top*/
  transition: all .4s ease-in-out; /*make it smooth*/
}
label{
    display: block;
}
.input-synopsis{
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  margin-top: 3%;
  padding: 3%;
  border: 1px solid rgb(238, 235, 235);
  font-size: .9rem;
  line-height: 200%;
  box-shadow: 0 4px 8px rgba(108, 106, 106, 0.25), 0 4px 15px rgba(136, 134, 134, 0.22);
}

.display{
  visibility: visible;
  z-index: 200;
  opacity: 1;
  top: 50%;
}

.icon-close{
  margin-left:52vw;
}

.btns{
  display:flex;
  justify-content: center;
  text-align: center;
  margin-top: 6%;
  font-weight: normal;
}

.btn {
  width: 30%;
  font-family: 'Roboto', sans-serif;
  height: 8vh;
  line-height: auto;
  padding: 1%;
}

.btn:nth-child(2):hover{
  background-color: rgb(245, 170, 170);
}

.modify-book{
  font-weight: bold;
}

input[type="text"]{
  font-size: 1rem;
  padding-left: 2% ;
  display: block;
  width: 64%;
  border-radius: 16px;
  height: 6vh;
  margin: 2% auto;
  border: none;
  border: 1px solid rgb(242, 236, 236);
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
}

h4, span{
  font-size: 1rem;
  line-height: 200%;
  cursor: default;
}

.no-results{
  text-align:center;
  width: 50%;
  margin: auto;
  color: rgb(162, 155, 155);
}
span{
  font-size: 1.2rem;
}
.light{
  font-weight: 100;
}

.icons{
  height: 20vh;
  /* padding-left: 1%; */
}
.icon{
  cursor: pointer;
}
/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

@media(max-width: 1070px){
  .book{
    width: 78vw;
  }
  .modify-book{
    height: 71vh;
    width: 60vw;
    right: 50%;
  }
  .icon-close{
    margin-left:50vw;
  }
  .btn {
    height: auto;
    line-height: auto;
    padding: 2% auto;
  }

}

@media(max-width: 880px){
  .book{
    justify-content: space-evenly;
  }
  img{
    display: none;
  }

  .enlarge{
    height: 150vh;
    min-width: 47%;
  }
  .icons{
    height: 20vh;
    margin: 3% 0 0 1%;
  }
  .modify-book{
    height: 73vh;
    width: 63vw;
  }
  .modify-book h2 {
    padding: 3% 0;
  }
  .icon-close{
    padding-top: 3%;
  }
  .display{
    top: 55%;
  }
  input[type="text"]{
    width: 70%;
  }
  .input-synopsis{
    width: 80%;
  }
  .btn{
    width: 39%;
  }
}
/* -------MOBILE VERSION --------- */
@media(max-width: 430px){
  .book{
    margin: 2% 2% 2% 4%;
    justify-content: space-evenly;
    width: 85vw;
  }
  .mobile-hidden{
    display: none;
  }
  .cols-infos{
    flex-direction: column;
  }
  .enlarge{
    height: 250vh;
    min-width: 47%;
  }
  .modify-book{
    width: 88vw;
  }
  .modify-book h2 {
    font-size: 1.6rem;
  }
  .icon-close{
    margin-left:65vw;
  }
  input[type="text"], .input-identifiant{
    width: 83%;
  }
  .btns{
    flex-direction:column;
  }
  .btn{
    width: 55vw;
    margin: 2% auto;
    height: auto;
    padding: 3%;

  }
  input[type="text"]:disabled {
    margin-left: 1%;
    width: 90%;
  }
  .input-identifiant, .input-dateAdded {
    width: 82% !important;
    margin-left: 8% !important;
  }
}
@media(max-width: 380px){
  .book{
    flex-direction: column;
    height: fit-content;
  }
  .enlarge{
    height: fit-content;
  }
  .voir-plus{
    display: block;
    text-align: center;
    text-decoration: underline;
    margin-bottom: 10vh;
  }
  label{
    font-size: 1rem;
  }
  h4{
    font-size: 1.1rem !important;
  }
  .icons{
    flex-direction: row !important;
    justify-content: space-between !important;
    margin: 8% 30% 0 0;
    height: fit-content;
    padding-bottom: 4%;
  }
  .icon-eye{
    display:none;
  }
  .h4-id span {
    font-size: 1rem !important;
  }

}
</style>
