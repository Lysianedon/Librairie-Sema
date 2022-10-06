<template>
    <div class="wrapper">
      <div class="content pb-6">
        <img src="@/assets/logo.png" alt="logo" srcset="" class="logo">
        <h1 class="title-inscription is-size-2-tablet has-text-centered is-size-4-mobile p-2">Faisons connaissance, à livre ouvert...</h1>

        <ButtonsAgeOptions
          :ageArr=ageArr
          :goalsArr="goalsArr"
          :interestsArr="interestsArr"
          ValidateButtonValue="Valider"
        />
      </div>
    </div>
</template>

<script>
import ButtonsAgeOptions from '@/components/ButtonsOptions.vue'
export default {
  name: 'InscriptionView',
  components: {
    ButtonsAgeOptions
  },
  data () {
    return {
      userInfos: {
        firstname: '',
        age: '',
        password: '',
        email: '',
        preferences: {
          goals: [],
          interests: []
        },
        books: {
          alreadyRead: [],
          toRead: [],
          allBooks: []
        }
      },
      ageArr: ['Entre 12 et 17 ans', 'Entre 18 et 24 ans', 'Entre 25 et 30 ans', 'Plus de 30 ans', 'Je ne souhaite pas \nrépondre'],
      goalsArr: ['Découvrir des \nauteurs africains',
        'Effectuer des \nrecherches',
        'Par curiosité'
      ],
      interestsArr: ['Biographies', 'Contes', 'Romans', 'Tout !']
    }
  }
}
</script>

<style scoped>

.logo{
  position: fixed;
  max-width: 19%;
  top: 2%;
}
.content{
  margin-top: 2%;
}

.title-inscription{
  font-family: 'Ibarra Real Nova', 'serif';
  margin-bottom: 5%;
}

h2{
  font-family: 'Ibarra Real Nova', 'serif';
}
/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

@media(max-width: 1030px){
  .logo{
    display: none;
  }
}
</style>
