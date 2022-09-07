<template>
    <div :class="`user is-flex ${enlarged ? 'enlarge': ''}`" v-if="!removed">

                <!-------------------- MODAL TO UPDATE USER -------------->
                <div :class="`modify-user ${isModalOpened ? 'display': ''}`">
                <h2>Modifier l'utilisateur</h2>
                    <label for="id">Identifiant</label>
                    <input type="text" name="identifiant" class="input-identifiant" :value="user._id" disabled>

                    <label for="username">Prénom</label>
                    <input type="text" name="username" :class="`input-firstname-${user._id}`" :value="user.firstname">

                    <label for="age">Age</label>
                    <input type="text" name="age" :class="`input-age-${user._id}`" :value="user.age">

                    <label for="email">Email</label>
                    <input type="text" name="email" :class="`input-email-${user._id}`" :value="user.email">

                    <label for="goals">Inscrit pour</label>
                    <ul>
                        <input type="text" name="goals" class="inputs-goals" v-for="(goal, index) in user.preferences.goals" :key="index" :value="goal" disabled>
                    </ul>
                    <label for="interests">Ses intérêts: </label>
                    <ul>
                        <input type="text" name="interests" class="inputs-interests" v-for="(interest, index) in user.preferences.interests" :key="index" :value="interest" disabled>
                    </ul>
                    <div class="btns">
                        <div class=" btn btn-valider" @click="saveUpdates(user._id)">Sauvegarder les modifications</div>
                        <div class=" btn btn-option" @click="cancelUpdates">Annuler les modifications</div>
                    </div>
                </div>
                <!-------------------- USER CARD --------------------------->
            <div class="user-infos">
                <h4 class="h4-id">Identifiant: <span class="light">{{user._id}}</span> </h4>
                <h4>Prénom: <span class="light">{{user.firstname}}</span> </h4>
                <h4>Age: <span class="light">{{user.age}}</span> </h4>
                <h4>Mail: <span class="light">{{user.email}}</span> </h4>
                <h4>Inscrit pour:</h4>
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
                :label="`${enlarged ? 'Réduire': 'Afficher tout'}`"
                type="is-black"
                position="is-left">
                <font-awesome-icon
                icon="fa-solid fa-eye"
                class="icon icon-eye"
                @click="enlargeCard(user._id)" />
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
                @click="deleteUser(user._id)"/>
                </b-tooltip>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CardComponent',
  data () {
    return {
      enlarged: false,
      removed: false,
      isModalOpened: false,
      updatedUser: {
        firstname: '',
        age: '',
        email: ''
      }
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    enlargeCard () {
      this.enlarged = !this.enlarged
    },
    deleteUser (userId) {
      axios
        .delete('http://localhost:8001/admin/user-list', { withCredentials: true, data: { userId } })
        .then(res => {
          if (res.data.success) {
            this.$buefy.toast.open({
              message: 'Utilisateur supprimé',
              type: 'is-success'
            })
            this.removed = true
            this.$emit('update-list-users', {
              deletedUser: true,
              updatedUser: false
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
      // creating the userObj before sending the updated infos to the server:
      const firstname = document.querySelector(`.input-firstname-${this.user._id}`).value
      const age = document.querySelector(`.input-age-${this.user._id}`).value
      const email = document.querySelector(`.input-email-${this.user._id}`).value

      const updatedUser = {
        firstname,
        age,
        email
      }
      console.log('updatedUser', updatedUser)
      axios
        .put('http://localhost:8001/admin/user-list', { id, updatedUser }, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            this.$buefy.toast.open({
              message: `Fiche de ${this.user.firstname} mise à jour`,
              type: 'is-success'
            })
            setTimeout(() => {
              this.isModalOpened = false
            }, 1500)

            // Signaling the changes to the parentElem and grandparent elem to update data and rerender component:
            this.$emit('update-list-users', {
              deletedUser: false,
              updatedUser: true
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
    }
  }
}
</script>

<style scoped>
.user{
  border-radius: 10px;
  width: 32vw;
  margin: 2%;
  height: 33vh;
  padding: 5%;
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
  height: 63vh;
  min-width: 47%;
}
.removed{
  display: none;
}

.modify-user{
  height: 71vh;
  overflow-y: scroll ;
  border-radius: 10px;
  padding: 2%;
  background-color: #fff1cce9;
  backdrop-filter: blur(5px);
  width: 50vw;
  position: fixed;
  right: 45%;
  transform: translate(50%,-50%);
  z-index: 1;
  text-align: center;
  box-shadow: 0 4px 8px rgba(108, 106, 106, 0.25), 0 4px 15px rgba(136, 134, 134, 0.22);
  visibility: hidden;
  opacity: 0;
  z-index: -1;
  top: -50%; /*Put it on the very top*/
  transition: all .4s ease-in-out; /*make it smooth*/
}

.display{
  visibility: visible;
  z-index: 200;
  opacity: 1;
  top: 50%;
}

.btns{
  display:flex;
  justify-content: center;
  margin-top: 6%;
}

.btn {
  width: 37%;
  font-family: 'Roboto', sans-serif;
  height: 8vh;
  line-height: auto;
  padding: 1%;
}

.btn:nth-child(2):hover{
  background-color: rgb(245, 170, 170);
}

label{
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
}
.icon{
  cursor: pointer;
}
/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

@media(max-width: 1070px){
  .user{
    width: 38vw;
    height: 31vh;
    margin: 2% 1% 2% 6%;
  }
  .modify-user{
    height: 71vh;
    width: 60vw;
    right: 50%;
  }
  .btn {
    height: auto;
    line-height: auto;
    padding: 2% auto;
  }

}

@media(max-width: 880px){
  .user{
    width: 77vw;
    height: 33vh;
    margin: 2% 2% 2% 3%;
    justify-content: space-evenly;
  }
  .enlarge{
    height: 67vh;
    min-width: 47%;
  }
  .icons{
    height: 20vh;
    margin: 3% 0 0 1%;
  }
  .modify-user{
    height: 73vh;
    width: 63vw;
  }
  .modify-user h2 {
    padding: 3% 0;
  }
  .display{
    top: 55%;
  }
  input[type="text"]{
    width: 70%;
  }
}
/* -------MOBILE VERSION --------- */
@media(max-width: 430px){
  .user{
    width:87vw;
    height: 30vh;
    margin: 2% 2% 2% 3%;
    justify-content: space-evenly;
  }
  .enlarge{
    height: 75vh;
    min-width: 47%;
  }
  .modify-user{
    width: 88vw;
  }
  .modify-user h2 {
    font-size: 1.6rem;
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
}
@media(max-width: 380px){
  .user{
    flex-direction: column;
    height: 76vh;
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
  }
  .icon-eye{
    display:none;
  }
  .h4-id span {
    font-size: 1rem !important;
  }

}
</style>
