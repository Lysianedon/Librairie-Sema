<template>
    <div class="wrapper">
       <div class="nav">
      <NavbarUser/>
    </div>
    <div class="sidebar-mobile">
      <SidebarMobile/>
    </div>
      <a href="" id="scrollToTop"></a>
      <div class="content">
        <h2>MON COMPTE</h2>

        <div class="user-infos is-flex-tablet is-justify-content-space-between">
          <div class="infos">
            <h4>Nom: <span class="light">{{username}}</span></h4>
            <h4>Email: <span class="light">{{email}}</span></h4>
          </div>
          <h4 class="delete-account"
            @click="deleteAccount">
            <font-awesome-icon
              icon="fa-solid fa-trash-can"
              class="icon icon-trashcan"/>
            Supprimer le compte
          </h4>
        </div>

        <h2>MES PRÉFÉRENCES</h2>
        <div class="buttons-options">
          <ButtonsOptions
            :ageArr=ageArr
            :goalsArr="goalsArr"
            :interestsArr="interestsArr"
            ValidateButtonValue="Sauvegarder"
            :hideName="true"/>
        </div>

    <div class="footer-component">
        <FooterComponent/>
    </div>
      </div>
    </div>
</template>

<script>
import NavbarUser from '@/components/NavbarUser.vue'
import SidebarMobile from '@/components/SidebarMobile.vue'
import ButtonsOptions from '@/components/ButtonsOptions.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import axios from 'axios'
export default {
  name: 'SettingsUserView',
  data () {
    return {
      username: '',
      email: '',
      ageArr: ['Entre 16 et 24 ans', 'Entre 25 et 30 ans', 'Plus de 30 ans', 'Je ne souhaite pas \nrépondre'],
      goalsArr: ['Découvrir des \nauteurs africains',
        'Effectuer des \nrecherches',
        'Par curiosité'
      ],
      interestsArr: ['Biographies', 'Contes', 'Romans', 'Tout !']
    }
  },
  components: { NavbarUser, SidebarMobile, ButtonsOptions, FooterComponent },
  mounted () {
    axios
      .get('http://localhost:8001/user/', { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          // console.log(res.data)
          this.email = res.data.user.email
          this.username = res.data.user.firstname
        }
      })
  },
  methods: {
    deleteAccount () {
      axios
        .delete('http://localhost:8001/user/delete-account', { withCredentials: true })
        .then(res => {
          if (res.data.success) {
            // Redirecting the user to the homepage
            this.$router.push('/')
            // Displaying a success notification
            this.$buefy.toast.open({
              message: 'Compte supprimé',
              type: 'is-success'
            })
          }
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: 'Oups..Un problème est survenu. Reessayez plus tard',
            type: 'is-danger'
          })
          return console.error(err)
        })
    }
  }

}
</script>

<style scoped>
.content{
  margin: 3% auto 0 22vw;
  width: 91vw;
}
.user-infos{
  width: 73vw;
  padding: 2%;
}

h2{
  background-color: #ECEEE5;
  font-family: 'Ibarra Real Nova', serif;
  padding: 1.5%;
  margin: 5% 0;
  width: 75vw;
}

.content h4{
  line-height: 200%;
  font-size: 1.1rem;
}

.light{
  font-weight: lighter;
}

.delete-account{
  color: rgb(142, 139, 139);
  cursor: pointer;
}
.delete-account:hover{
  color: rgb(93, 90, 90);
}
.buttons-options{
  /* border: 1px solid black; */
  width: 80%;
  margin-top: 5%;
}

.footer-component{
   margin-top: 5%;
}

/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

@media(max-width: 1170px){
  .nav{
    display: none;
  }

  .sidebar-mobile{
    display: block;
    position: fixed;
    top: 3%;
    left: 3%;
    z-index: 2;
  }
  .content{
    width: 100vw;
    /* margin: 3vw 3vw 0 5vw; */
    margin: 0;
  }
  .user-infos{
    width: 90vw;
    margin:auto;
  }

  h2{
  margin: 5% 0 5% 3%;
  width: 95vw;
  }
  .buttons-options{
    /* border: 1px solid black; */
    width: 100%;
    margin-top: 5%;
  }
  .footer{
    width: 100vw;
    margin-right: 0;
    /* border: 1px solid black; */
}
}
</style>
