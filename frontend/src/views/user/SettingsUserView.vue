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
        <h1>MON COMPTE</h1>
        <h4>Nom: <span class="light">{{username}}</span></h4>
        <h4>Mail: <span class="light">{{email}}</span></h4>
        <h4 class="delete-account">
          <font-awesome-icon
            icon="fa-solid fa-trash-can"
            class="icon icon-trashcan"/>
          Supprimer le compte
        </h4>
        <h1>MES PRÉFÉRENCES</h1>
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
  }

}
</script>

<style scoped>
.content{
  margin: 3% auto 0 22vw;
  width: 91vw;
}

h1{
  background-color: #ECEEE5;
    font-family: 'Ibarra Real Nova', serif;
  padding: 1.5%;
  margin: 5% 0;
  width: 75vw;
}

.content h4{
  line-height: 200%;
}

.light{
  font-weight: lighter;
}

.delete-account{
  color: rgb(142, 139, 139);
}
.buttons-options{
  /* border: 1px solid black; */
  width: 80%;
  margin-top: 5%;
}

.footer-component{
   margin-top: 5%;
}
</style>
