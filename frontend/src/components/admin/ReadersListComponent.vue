<template>
    <div>
        <input type="search" name="searchbar" id="searchbar" v-model="searchbarValue" placeholder="Rechercher...">
        <h4 class="has-text-right-tablet number-of-users">{{numberOfReaders}} résultat(s)</h4>
      <div class="users-list is-flex is-flex-direction-row">
          <h2 v-if="numberOfReaders === 0" class="no-results">Aucun résultat</h2>
        <div :class="` user is-flex ${user._id}`" v-for="(user, index) in getFilteredData" :key="index">
            <div class="user-infos">
                <h4>Identifiant: <span class="light">{{user._id}}</span> </h4>
                <h4>Prénom: <span class="light">{{user.firstname}}</span> </h4>
                <h4>Age: <span class="light">{{user.age}}</span> </h4>
                <h4>Mail: <span class="light">{{user.email}}</span> </h4>
                <h4>Inscrit pour: {{user.goals}}</h4>
                <ul>
                    <li v-for="(goal, index) in user.preferences.goals" :key="index">
                        {{goal}}
                    </li>
                </ul>
                <h4>Ses intérêts: {{user.interests}}</h4>
                <ul>
                    <li v-for="(interest, index) in user.preferences.interests" :key="index">
                        {{interest}}
                    </li>
                </ul>
            </div>

            <div class="icons is-flex is-flex-direction-column is-justify-content-space-between">
              <b-tooltip
                label="Voir"
                type="is-black"
                position="is-left">
              <font-awesome-icon
                icon="fa-solid fa-eye"
                class="icon icon-eye"
                @click="enlargeCard" />
              </b-tooltip>

              <b-tooltip
                label="Modifier"
                type="is-black"
                position="is-left">
              <font-awesome-icon
                icon="fa-solid fa-pencil"
                class="icon icon-pencil" />
              </b-tooltip>

              <b-tooltip
                label="Supprimer"
                type="is-black"
                position="is-left">
              <font-awesome-icon
                icon="fa-solid fa-trash-can"
                class="icon icon-trashcan"/>
              </b-tooltip>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ReadersListComponent',
  data () {
    return {
      searchbarValue: '',
      copyUsersList: this.usersList
    }
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
    //   if (this.searchbarValue === '' || this.searchbarValue === null) {
    //     return this.usersList
    //   }
      if (this.getSearchbarValue !== '') {
        const filteredData = this.usersList.filter(user => JSON.stringify(user).includes(this.searchbarValue))
        return filteredData
      }
      return this.usersList
    }
  },
  methods: {
    enlargeCard (e) {
      const card = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
      if (!card.className.includes('enlarge')) {
        card.classList.add('enlarge')
      } else {
        card.classList.remove('enlarge')
      }
    },
    handleFilteredData () {
      console.log(' handlefilteredData: ', this.getFilteredData)
      this.$emit('update-search-results', {
        searchResults: this.getFilteredData
      })
      return null
    }
  }
}
</script>

<style scoped>
.users-list{
    border: 1px solid rgb(218, 217, 217);
    width: 65vw;
    margin: auto;
    height: 67vh;
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
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
}
#searchbar::placeholder{
    font-size: 1.2rem;
    padding-left: 2%;
}

.number-of-users{
    width: 91%;
    margin-bottom: 2%;
}
.user{
    border-radius: 10px;
    width: 47%;
    min-width: 47%;
    margin: 2.5% auto;
    height: 29vh;
    padding: 4%;
    background-color: #ECEEE5;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: ease-in-out 400ms all;
    overflow-y: hidden;
}
.user:hover{
    background-color: #eef0e7;
    box-shadow: 0 4px 8px rgba(108, 106, 106, 0.25), 0 4px 15px rgba(136, 134, 134, 0.22);
}
.enlarge{
    height: 61vh;
    width: 50%;
    min-width: 47%;
    margin: auto;
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
</style>
