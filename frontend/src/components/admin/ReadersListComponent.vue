<template>
    <div>
      <div class="users-list is-flex is-flex-direction-row">
        <div class="user" v-for="(user, index) in usersList" :key="index">
            <h4>Identifiant:</h4>
            <h4>Nom: {{user.firstname}}</h4>
            <h4>Age: {{user.age}}</h4>
            <h4>Mail: {{user.email}}</h4>
            <h4>Inscrit pour: {{user.goals}}</h4>
            <h4>Ses intérêts: {{user.interests}}</h4>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ReadersListComponent',
  data () {
    return {

    }
  },
  props: {
    usersList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.users-list{
    border: 1px solid black;
    width: 80%;
    margin: auto;
    height: 65vh;
    overflow-y: scroll;
    border-radius: 16px;
}
.user{
    border-radius: 10px;
    border: green solid 1px;
    width: 48%;
    margin: 1.5%;
    height: fit-content;
    padding: 2%;
    background-color: #ECEEE5;
}
</style>
