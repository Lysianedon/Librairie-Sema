<template>
    <div>
      <form @submit.prevent="submitBookForm">

        <label for="title">Titre*</label>
        <input type="text" name="title" class="title" v-model="newBook.title">

        <label for="author">Auteur(s)*</label>
        <input type="text" name="author" class="author" v-model="newBook.author">

        <!-- <label for="image">Lien de l'image*</label>
        <input type="text" name="image" class="image" v-model="newBook.image"> -->

        <div class="label-img-div">
            <label for="image">Image*</label>
            <div class="btn-option select-img" @click="onPickFile">Selectionner une image</div>
            <input
                type="file"
                name="image"
                id="image"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
                hidden>
        </div>

        <div class="wrapper-genre-country">
            <div class="content-genre">
                <label for="genre">Genre*</label>
                <select name="" id="" v-model="newBook.genre" class="genre-options-wrapper">
                    <option disabled value="">Sélectionner:</option>
                    <option v-for="(genre,index) in genres" :key="index">{{genre}}</option>
                </select>
            </div>

            <div class="content-country">
                <label for="country">Pays*</label>
                <input type="text" name="country" class="country medium" v-model="newBook.country">
            </div>
        </div>

        <h4>Tranches d'âge (plusieurs choix possibles)*</h4>

        <div class="label-checkbox">
            <input type="checkbox" id="agerange-1" class="agerange" value="Entre 12 et 17 ans" v-model="newBook.ageRange">
            <label for="agerange-1">Entre 12 et 17 ans</label>
        </div>

        <div class="label-checkbox">
            <input type="checkbox" id="agerange-2" class="agerange" value="Entre 18 et 24 ans" v-model="newBook.ageRange">
            <label for="agerange-2">Entre 18 et 24 ans</label>
        </div>
        <div class="label-checkbox">
            <input type="checkbox" id="agerange-3" class="agerange" value="Entre 25 et 30 ans" v-model="newBook.ageRange">
            <label for="ageranga-3">Entre 25 et 30 ans</label>
        </div>
        <div class="label-checkbox">
            <input type="checkbox" id="agerange-4" class="agerange" value="Plus de 30 ans" v-model="newBook.ageRange">
            <label for="agerange-4">Plus de 30 ans</label>
        </div>

        <label for="synopsis" class="label-synopsis">Synopsis*</label>
        <textarea name="synopsis" id="synopsis" class="input-synopsis" cols="70" rows="10" v-model="newBook.synopsis"></textarea>

        <label for="book-store-name" class="label-book-store-name">Nom du lieu/site où se le procurer*</label>
        <input type="text" name="book-store-name" class="book-store-name" v-model="newBook.bookStore.name">

        <label for="book-store-link" class="label-book-store-link">Lien du site ou adresse*</label>
        <input type="text" name="book-store-link" class="book-store-link" v-model="newBook.bookStore.link">
        <p>*: Champs obligatoires</p>
        <button class="btn-valider">Ajouter un livre</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BookFormComponent',
  data () {
    return {
      ageRanges: ['Moins de 25 ans', 'Entre 25 et 30 ans', 'Plus de 3O ans', 'Je ne souhaite pas répondre'],
      genres: ['Roman', 'Biographie', 'Conte', 'Bande dessinée', 'Livre de recettes'],
      errorEmptyFields: false,
      newBook: {
        title: '',
        author: '',
        country: '',
        synopsis: '',
        genre: '',
        ageRange: [],
        image: '',
        dateAdded: {
          parsedFormat: '',
          stringFormat: ''
        },
        bookStore: {
          name: '',
          link: ''
        }
      }
    }
  },
  methods: {
    onPickFile () {
      console.log('click')
      this.$refs.fileInput.click()
    },
    onFilePicked () {
    //   const preview = document.querySelector('img')
      const file = document.querySelector('input[type=file]').files[0]
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        // Converting the img into a base64 string
        // preview.src = reader.result
        if (typeof reader.result === 'string') {
          this.newBook.image = reader.result.split(',')[1]
        }
      }, false)
      if (file) {
        reader.readAsDataURL(file)
      }
    },
    submitBookForm () {
      this.errorEmptyFields = false
      const fileSource = document.querySelector('input[type=file]').files[0]
      console.log(fileSource)
      // Guard : checking the format of the links with a regex:
      const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/
      const regex = new RegExp(expression)
      //   if (!this.newBook.image.match(regex) || !this.newBook.bookStore.link.match(regex)) {
      if (!this.newBook.bookStore.link.match(regex)) {
        this.$buefy.toast.open({
          message: 'Format des liens invalides',
          type: 'is-danger'
        })
        return null
      }
      axios
        .get(`http://localhost:8001/admin/upload-image/${fileSource}`, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            console.log(res.data)
          }
        })
        .catch(err => console.log(err))

      //   Adding the dateAdded to newBook obj:
      this.newBook.dateAdded.stringFormat = new Date().toDateString()
      this.newBook.dateAdded.parsedFormat = Date.parse(new Date().toDateString())
      //   console.log(this.newBook)
      //   const newBook = this.newBook
      //   Checking if any mandatory field of the form is empty: if so, an error message gets displayed
      const formValues = Object.values(this.newBook)
      formValues.forEach(val => {
        if (typeof val === 'object') {
          if (val.length === 0) {
            this.errorEmptyFields = true
            this.$buefy.toast.open({
              message: 'Champs vides: veuillez remplir tous les champs obligatoires.',
              type: 'is-danger'
            })
            return null
          }
          Object.values(val).forEach(v => {
            if (v === '' || v === null) {
              this.errorEmptyFields = true
              this.$buefy.toast.open({
                message: 'Champs vides: veuillez remplir tous les champs obligatoires.',
                type: 'is-danger'
              })
              return null
            }
          })
        }
        if (val === '' || val === null) {
          this.errorEmptyFields = true
          this.$buefy.toast.open({
            message: 'Champs vides: veuillez remplir tous les champs obligatoires.',
            type: 'is-danger'
          })
          return null
        }
      })
    //   if (!this.errorEmptyFields) {
    //     console.log('before axios: ', this.newBook)
    //     axios
    //       .post('http://localhost:8001/admin/booklist', { newBook }, { withCredentials: true })
    //       .then(res => {
    //         if (res.data.success) {
    //           this.$buefy.toast.open({
    //             message: 'Référence ajoutée à la bibliothèque',
    //             type: 'is-success'
    //           })
    //           //   Resetting the bookform
    //           this.newBook = {
    //             title: '',
    //             author: '',
    //             country: '',
    //             synopsis: '',
    //             genre: '',
    //             ageRange: [],
    //             image: '',
    //             dateAdded: {
    //               parsedFormat: '',
    //               stringFormat: ''
    //             },
    //             bookStore: {
    //               name: '',
    //               link: ''
    //             }
    //           }
    //         }
    //       })
    //       .catch(err => {
    //         this.$buefy.toast.open({
    //           message: 'Oups.. Un problème est survenu. Veuillez réessayer.',
    //           type: 'is-danger'
    //         })
    //         return console.log(err)
    //       })
    //     return null
    //   }
    //   return null
    }
  }
}
</script>

<style scoped>
form{
  border: 1px solid black;
  padding: 5% 0 5% 5%;
  border: 1px solid rgb(241, 239, 239);
  width: 53vw;
  margin: auto;
  overflow-y: scroll;
  border-radius: 16px;
  background-color: #ECEEE5;
  /* backdrop-filter: blur(4px); */
  box-shadow: 2px 5px 8px rgba(214, 214, 214, 0.563), 2px 5px 8px rgba(214, 214, 214, 0.563);
}

input[type="text"]{
  font-size: 1rem;
  padding-left: 3%;
  display: block;
  width: 80%;
  border-radius: 16px;
  height: 6vh;
  margin: 2% 0 0 3%;
  border: none;
  border: 1px solid rgb(234, 234, 234);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
.label-img-div{
    display:flex;
    margin: 3% 0;
}
.select-img{
  border-radius: 16px;
  width: fit-content;
  font-family: 'Roboto', sans-serif;
}
input[type="checkbox"]{
  width: 20px;
  margin-top: 2.5%;
}

h4{
  padding-left: 3%;
  margin-top: 6vh;
}
p{
    margin-top: 5vh;
}
.medium{
  width: 172% !important;
}
.wrapper-genre-country{
  display: flex;
  justify-content: space-evenly;
  margin: 4% 30% 0 0;
  /* width: 85%; */
}

label{
    display:block;
  margin: 3% 0 1% 5%;
  font-weight: bold;
  font-size: 1.1rem;
}
.genre-options-wrapper{
  width: 14vw;
  background-color: white;
  border: 1px solid rgb(225, 222, 222);
  padding: 7%;
  border-radius: 16px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
.label-checkbox{
  display: flex;
  padding-left: 3vw;
}

.label-book-store-name, .label-book-store-link, .label-synopsis{
  padding-top: 3vh;
}

.input-synopsis{
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  margin: 2% 0 0 1%;
  width: 40vw;
  overflow-y: scroll;
  padding: 1% 3% 3% 3%;
  border: 1px solid rgb(238, 235, 235);
  font-size: .9rem;
  line-height: 200%;
  box-shadow: 0 4px 6px rgba(108, 106, 106, 0.25), 0 4px 6px rgba(136, 134, 134, 0.22);
}

.btn-valider{
  width: 20vw;
  font-family: 'Roboto', sans-serif;
  margin: 3% auto 0 24%;
  font-weight: bold;
}
.btn-valider:hover{
  background-color: #FFF1CC;
}
/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

@media(max-width: 1070px){
  form{
    width: 80vw;
  }
  .input-synopsis{
    width: 65vw;
  }
  input[type="text"]{
    width: 85%;
  }
  .btn-valider{
    width: 30vw;
    margin: 3% auto 0 25%;
  }
  .wrapper-genre-country{
    display: flex;
    margin: 4% 30% 0 0;
  }
 .genre-options-wrapper{
   width: 22vw;
 }
}

@media(max-width: 440px){
  .label-img-div{
    flex-direction: column;
  }
  .wrapper-genre-country{
    flex-direction: column;
    margin: 4%;
  }
  .genre-options-wrapper{
    width: 60vw;
    height: 6vh;
    padding: 1% 4%;
 }
  .medium{
    width: 60vw !important;
  }
  .btn-valider{
    width: 50vw;
    margin: 3% auto 5% 12%;
  }
}
@media(max-width: 380px){
  .select-img{
    width: 45vw;
    font-size: .9rem;
    text-align: center;
  }
    .btn-valider{
      width: 58vw;
      margin: 3% auto 5% 6%;
    }
}
@media(max-width: 330px){
  .select-img{
    width: 50vw;
  }
}
</style>
