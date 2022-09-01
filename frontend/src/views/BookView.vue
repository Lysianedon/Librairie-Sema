<template>
   <div class="personalised-suggestion">
         <img
            class="img"
            :src="book.image"
            :alt="`page de couverture du livre : \'${book.title} \' `"
            srcset="">
          <div class="book-infos">
            <h3>{{book.title}}</h3>
            <h4>De: {{book.author}}</h4>
            <h4>Genre: {{book.genre}}</h4>
            <h4>Pays: {{book.country}}</h4>
            <h4 class="synopsis-title">Synopsis:</h4>
            <p> {{ book.synopsis}}</p>

            <div class="btns">
              <button class="btn-option" @click="addToLibrary(book._id)">Ajouter à ma bibliothèque</button>
              <button class="btn-option" @click="addToFavorites(book._id)">Ajouter à mes favoris</button>
            </div>
          </div>
    </div>
</template>

<script>
import axios from 'axios'
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
  }
}
</script>

<style scoped>
.personalised-suggestion{
  display: flex;
  justify-content: space-between;
  width: 65vw;
  padding: 2.5% 1.5% 3% 1.5%;
  border-radius: 5px;
  cursor: default;
}

.img{
    margin: auto;
    border-radius: 3px;
    box-shadow: 0 8px 10px rgba(108, 106, 106, 0.25), 0 2px 7px rgba(188, 186, 186, 0.22);
    position: relative !important;
}

.book-infos{
  margin-left: 6%;
  margin-top: 7%;
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

/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */
@media(max-width: 850px){
  .btns{
    flex-direction: column;
    width: 90%;
  }
}
</style>
