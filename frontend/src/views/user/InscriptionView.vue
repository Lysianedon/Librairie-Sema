<template>
    <div class="wrapper">
      <div class="content pb-6">
        <img src="@/assets/logo.png" alt="logo" srcset="" class="logo">
        <h1 class="title-inscription is-size-2 has-text-centered">Faisons connaissance, à livre ouvert...</h1>

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
import axios from 'axios'
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
      ageArr: ['Entre 16 et 24 ans', 'Entre 25 et 30 ans', 'Plus de 30 ans', 'Je ne souhaite pas répondre'],
      goalsArr: ['Découvrir des auteurs africains',
        'Approfondir mes connaissances culturelles',
        'Par curiosité'
      ],
      interestsArr: ['Biographies', 'Contes', 'Tout !']
    }
  },
  beforeMount () {
    axios
      .get('http://localhost:8001/user', { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          console.log(res.data.user)
          // this.userInfos.firstname = res.data.user.firstname
          // this.userInfos = res.data.user
        }
      })
      .catch(err => {
        return console.log(err)
      })
  },
  methods: {

  }
}
</script>

<style scoped>

.content{
  /* background-image:url(//cdn.shopify.com/s/files/1/0014/4880/4425/files/8.jpg?b=allow_avif&v=1532325376); */
  /* background-repeat: no-repeat;
  background-size: 90%;
  background-position-x: 140%;
  background-position-y: 110%; */
  /* border: 1px solid black; */
  /* height: 100vh !important; */
}
.logo{
  /* display: block; */
  /* margin: auto; */
  position: fixed;
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
</style>
