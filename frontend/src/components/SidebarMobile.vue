<template>
  <section>
    <b-sidebar
      type="is-white"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      v-model="open">
      <div class="p-1">
        <b-menu>
          <div class="container">
            <div class="power-icon" @click="logout" v-if="isConnected">
                    <b-tooltip
                        label="Se déconnecter"
                        type="is-black"
                        position="is-right">
                    <font-awesome-icon icon="fa-solid fa-power-off" />
                    </b-tooltip>
                </div>
              <img
                src="@/assets/logo-2.png" alt="logo"
                class="logo"
              />

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

                        <router-link to="/ma-bibliotheque">
                            <div class="btn-option">
                                <span class="icon">
                                <font-awesome-icon icon="fa-solid fa-book"/>
                                </span>
                                Ma bibliothèque
                            </div>
                        </router-link>

                        <router-link to="/favoris">
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
        </b-menu>
      </div>
    </b-sidebar>

    <div class="sidebar-mobile-button">
        <b-tooltip
            label="Menu"
            type="is-black"
            position="is-right">
              <b-button @click="open = true" >
            <font-awesome-icon icon="fa-solid fa-bars" class="icon-button"/>
              </b-button>
        </b-tooltip>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      open: false,
      overlay: true,
      fullheight: false,
      fullwidth: false,
      right: false,
      username: '',
      isConnected: false,
      loginInvitation: 'Connectez - vous'
    }
  },
  mounted () {
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
    }
  }
}
</script>

<style scoped>
.power-icon{
  position: fixed;
  top: 3%;
  left: 5%;
}
.p-1 {
  padding: 1em;
}
nav{
    padding: 5%;
}
.logo{
  width: 76%;
  margin: 0 0 0 10%;
  max-width: 80%;
}

button{
  padding: 5% !important;
  width: 7vw;
  background-color: #FFF1CC;
  height: 5vh;
}

.btn-option{
    width: 100%;
    border-radius: 0;
    border: 0px;
    box-shadow: none;
    margin: 1%;
    color: black;
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
}

.btn-option:hover{
    box-shadow: none;
}

.icon-button{
  width: 8rem;
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
  height: 50px;
}

hr{
  border-top: .1rem solid rgb(48, 47, 47);
  font-weight: 100;
  width: 200px;
  margin: auto auto -1% auto;
}
/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

@media(max-width: 450px){
   button{
    width: 20vw;
  }
  .icon-button{
    width:auto;
  }
}
</style>
