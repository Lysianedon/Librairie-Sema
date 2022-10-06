<template>
    <div class="container">
      <div class="power-icon" @click="logout" v-if="isConnected">
        <b-tooltip
            label="Se déconnecter"
            type="is-white"
            position="is-right">
          <font-awesome-icon icon="fa-solid fa-power-off" />
        </b-tooltip>
      </div>

      <img src="@/assets/logo-2.png" alt="logo" srcset="" class="logo">

        <h2 class="username" v-if="isConnected">{{username}}</h2>
        <router-link to="/login" class="loginInvitation">
          <h2 v-if="!isConnected">{{loginInvitation}}</h2>
        </router-link>
        <hr>
        <nav>
          <div class="nav-links">

            <router-link to="/admin/back-office/lecteurs">
              <div class="btn-option">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-users" />
                </span>
                Gérer les lecteurs
              </div>
            </router-link>

            <router-link to="/admin/back-office/bibliotheque">
              <div class="btn-option">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-book"/>
                  </span>
                  Gérer la bibliothèque
              </div>
            </router-link>

            <router-link to="/admin/back-office/bibliotheque/ajouter-un-livre">
              <div class="btn-option">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-plus" />
                </span>
                Ajouter un livre
              </div>
            </router-link>
          </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NavbarAdmin',
  data () {
    return {
      username: '',
      isConnected: false,
      loginInvitation: 'Connectez - vous'
    }
  },
  mounted () {
    axios
      .get(`http://localhost:${process.env.VUE_APP_PORT}/user/`, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          this.username = res.data.user.firstname
          this.$emit('get-name', {
            adminName: this.username
          })
          // console.log(res.data)
          this.isConnected = true
        }
      })
      .catch(err => console.error(err))
  },
  methods: {
    logout () {
      axios
        .get(`http://localhost:${process.env.VUE_APP_PORT}/logout/`, { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            this.$router.push('/login')
          }
        })
        .catch(err => {
          return console.log(err)
        })
    }
  }
}
</script>

<style scoped>

.container{
  width: 315px;
}
.power-icon{
  margin-left: 15%;
  cursor:pointer;
}
.username{
  cursor: default;
}

.loginInvitation{
  color: black;
}

.loginInvitation:hover{
  color: #c3a450;
}

.logo{
  width: 56%;
  margin: 0 0 0 25%;
  max-width: 75%;
}
.username{
  margin-bottom: 6vh;
  font-size: 1.4rem;
}
h2{
  text-align: center;
  font-family: 'Ibarra Real Nova', serif;
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 5vh;
  text-transform: capitalize;

}
.icon{
  margin-right: 2%;
  width: 8%;
  max-width: 10%;
}

.icon:nth-child(1){
  width: 9%;

}

.white-space{
  height: 10px;
}

hr{
  border-top: .1rem solid rgb(48, 47, 47);
  font-weight: 100;
  width: 150px;
  margin: auto auto -1% auto;
}

.btn-option{
  font-family: 'Roboto', sans-serif;
  box-shadow: none;
  border-radius: 40px;
  color: black;
  font-weight: 200;
  width: 225px;
  text-align: center;
}

.btn-option:hover{
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.4s cubic-bezier(.25,.8,.25,1);
}

</style>
