<template>
    <div>
        <input type="search" name="searchbar" id="searchbar" v-model="searchbarValue" placeholder="Rechercher..." >
        <h4 class="has-text-right number-of-users">{{numberOfReaders}} résultat(s)</h4>
      <div class="users-list is-flex is-flex-direction-row">
          <h2 v-if="numberOfReaders === 0" class="no-results">Aucun résultat</h2>
         <div class="user is-flex" v-for="(user, index) in getFilteredData" :key="index">
          <CardReaders :user="user"
          @update-list-users="updateListUsers"/>
         </div>
      </div>
    </div>
</template>

<script>
import CardReaders from '@/components/admin/CardReaders.vue'
export default {
  name: 'ReadersListComponent',
  data () {
    return {
      searchbarValue: '',
      copyUsersList: this.usersList,
      deletedUser: null
    }
  },
  components: {
    CardReaders
  },
  props: {
    usersList: {
      type: Array,
      required: true
    }
  },
  computed: {
    numberOfReaders () {
      return this.getFilteredData.length
    },
    getSearchbarValue () {
      return this.searchbarValue
    },
    getFilteredData () {
      if (this.getSearchbarValue !== '') {
        const filteredData = this.usersList.filter(user => JSON.stringify(user).includes(this.searchbarValue))
        return filteredData
      }
      return this.usersList
    }
  },
  methods: {
    updateListUsers (payload) {
      this.$emit('updateListUsers', {
        deletedUser: payload.deletedUser,
        updatedUser: payload.updatedUser
      })
    }
  }
}
</script>

<style scoped>
.users-list{
    border: 1px solid rgb(218, 217, 217);
    width: 65vw;
    margin: auto;
    height: 72vh;
    overflow-y: scroll;
    border-radius: 16px;
    flex-wrap: wrap;
    box-shadow: 2px 4px 6px rgba(108, 106, 106, 0.25), 2px 5px 8px rgba(136, 134, 134, 0.22);
}

#searchbar{
    width: 84%;
    border-radius: 16px;
    height: 7vh;
    margin: 0 auto 5% 8%;
    border: none;
    border: 1px solid rgb(242, 236, 236);
    box-shadow: -2px 5px 10px rgba(0, 0, 0, 0.1);
}
#searchbar::placeholder, input[type=search]{
    font-size: 1.2rem;
    padding-left: 2% ;
}

.number-of-users{
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
  .users-list{
    width: 78vw;
    padding: 2% 0;
  }
  #searchbar{
    height: 9vh;
  }
}
/* -------MOBILE VERSION --------- */
@media(max-width: 430px){
  .users-list{
    width: 88vw;
    margin-right: 2%;
    height: 80vh;
  }
  #searchbar{
    height: 9vh;
    width: 89%;
  }

  .number-of-users{
    margin: 8% 0;
  }

}
</style>
