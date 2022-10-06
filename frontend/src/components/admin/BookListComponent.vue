<template>
    <div>
        <input type="search" name="searchbar" id="searchbar" v-model="searchbarValue" placeholder="Rechercher..." >
        <h4 class="has-text-right number-of-books">{{numberOfBooks}} résultat(s)</h4>
      <div class="books-list is-flex is-flex-direction-row">
          <h2 v-if="numberOfBooks === 0" class="no-results">Aucun résultat</h2>
         <div class="book is-flex" v-for="(book, index) in getFilteredData" :key="index">
          <CardBooks :book="book"
          @update-list-books="updateListBooks"/>
         </div>
      </div>
    </div>
</template>

<script>
import CardBooks from '@/components/admin/CardBooks.vue'
export default {
  name: 'BookListComponent',
  data () {
    return {
      searchbarValue: '',
      copyBooksList: this.bookList,
      deletedBook: null
    }
  },
  components: {
    CardBooks
  },
  props: {
    bookList: {
      type: Array,
      required: true
    }
  },
  computed: {
    numberOfBooks () {
      return this.getFilteredData.length
    },
    getSearchbarValue () {
      return this.searchbarValue
    },
    getFilteredData () {
      if (this.getSearchbarValue !== '') {
        const filteredData = this.bookList.filter(book => JSON.stringify(book).toLowerCase().includes(this.searchbarValue.toLowerCase()))
        return filteredData
      }
      return this.bookList
    }
  },
  methods: {
    updateListBooks (payload) {
      this.$emit('updateListBooks', {
        deletedBook: payload.deletedBook,
        updatedBook: payload.updatedBook
      })
    }
  }
}
</script>

<style scoped>
.books-list{
    border: 1px solid rgb(218, 217, 217);
    width: 65vw;
    margin: auto;
    height: 72vh;
    overflow-y: scroll;
    border-radius: 16px;
    flex-wrap: wrap;
    background-color: rgba(248, 248, 248, 0.694);
    box-shadow: 2px 4px 6px rgba(108, 106, 106, 0.25), 2px 5px 8px rgba(136, 134, 134, 0.22);
}

#searchbar{
    width: 84%;
    border-radius: 16px;
    height: 7vh;
    margin: 0 auto 5% 8%;
    border: none;
    border: 1px solid rgba(242, 236, 236, 0.925);
    box-shadow: -2px 5px 10px rgba(0, 0, 0, 0.1);
}
#searchbar::placeholder, input[type=search]{
    font-size: 1.2rem;
    padding-left: 2% ;
    padding-right: 2% ;
}
.number-of-books{
    width: 91%;
    margin-bottom: 2%;
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
}
.icon{
    cursor: pointer;
}

/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

@media(max-width: 1070px){
  .books-list{
    width: 78vw;
    padding: 2% 0;
  }
  #searchbar{
    height: 9vh;
  }
}
/* -------MOBILE VERSION --------- */
@media(max-width: 430px){
  .books-list{
    width: 88vw;
    margin-right: 2%;
    height: 80vh;
  }
  #searchbar{
    height: 9vh;
    width: 89%;
  }

  .number-of-books{
    margin: 8% 0;
  }

}
</style>
