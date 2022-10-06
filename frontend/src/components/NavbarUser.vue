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

            <router-link to="/">
              <div class="btn-option">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-home"/>
                </span>
                Accueil
              </div>
            </router-link>

            <router-link to="/section/ma-bibliotheque">
              <div class="btn-option">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-book"/>
                  </span>
                  Ma bibliothèque
              </div>

            </router-link>
            <router-link to="/section/favoris">
              <div class="btn-option">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-heart" color="red"/>
                </span>
                Mes favoris
              </div>
            </router-link>
          </div>

          <div class="white-space"></div>

          <div class="params">

            <router-link to="/mon-compte" v-if="isConnected">
              <div class="btn-option">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-gear" />
                </span>
                Mon compte
              </div>
            </router-link>

            <router-link to="/aide">
              <div class="btn-option">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-circle-info" />
                </span>
                Aide
              </div>
            </router-link>
          </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
export default {
  name: 'NavbarUser',
  data () {
    return {
      username: '',
      isConnected: false,
      loginInvitation: 'Connectez - vous'
    }
  },
  mounted () {
    console.log('process.env.VUE_APP_TEST}', process.env.VUE_APP_TEST)
    axios
      .get(`http://localhost:${process.env.VUE_APP_PORT}/user/`, { withCredentials: true })
      .then(res => {
        // console.log(res.data)
        this.username = res.data.user.firstname
        this.isConnected = true
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
    },
    navigateToPage () {
      const componentKey = ref(0)
      componentKey.value += 1
      console.log(componentKey.value)
      return componentKey.value
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
  margin: 0 0 0 28%;
  max-width: 75%;
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
  width: 9%;
  max-width: 12%;
}

.white-space{
  height: 10px;
}

hr{
  border-top: .1rem solid rgb(48, 47, 47);
  font-weight: 100;
  width: 200px;
  margin: auto auto -1% auto;
}

.btn-option{
  font-family: 'Roboto', sans-serif;
  box-shadow: none;
  border-radius: 40px;
  color: black;
  font-weight: 200;
  width: 220px;
  text-align: center;
}

.btn-option:hover{
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.4s cubic-bezier(.25,.8,.25,1);
}

</style>
