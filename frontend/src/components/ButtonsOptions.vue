<template>
    <div>
      <div class="notification is-danger is-light column is-6" v-if="NotifErrorEmptyVal" >
        <p class="has-text-centered mt-2">Des champs sont vides. Veuillez compléter tout le formulaire. </p>
        <button class="delete"></button>
      </div>

      <h2 class="is-size-4 has-text-centered is-size-4-mobile" v-if="!hideName">Je m'appelle:</h2>
      <input type="text" name="firstname" id="firstname" v-model="firstname" class="input input-firstname is-medium" v-if="!hideName">

      <h2 class="is-size-4 has-text-centered">J'ai:</h2>
      <div class="buttons">
        <div v-for="(value) in ageArr" :key="value">
            <input type="button" :class="`btn-option btn-ages-options ${value === age ? 'selected' : ''}`" :value=value @click="toggleButton">
          </div>
      </div>
      <h2 class="is-size-4 has-text-centered title-goals">Je suis ici pour...</h2>
        <h3 class="is-size-6 has-text-centered">Plusieurs choix possibles</h3>

      <div class="buttons">
        <div v-for="(value) in goalsArr" :key="value">
          <input type="button" :class="`btn-option btn-goals-options ${goals.includes(value) ? 'selected' : '' }`" :value=value @click="toggleButton">
        </div>
    </div>
      <h2 class="is-size-4 has-text-centered title-interests">Je suis plutôt intéressé.e par les...</h2>
      <h3 class="is-size-6 has-text-centered">Plusieurs choix possibles</h3>
      <div class="buttons">
        <div v-for="(value) in interestsArr" :key="value">
          <input type="button" :class="`btn-option btn-interests-options ${interests.includes(value) ? 'selected' : '' } `" :value=value @click="toggleButton">
        </div>
    </div>
      <button class="btn-valider" @click="validateForm">{{ValidateButtonValue}}</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'ButtonsAgeOptionsComponent',
  data () {
    return {
      firstname: '',
      age: '',
      goals: [],
      interests: [],
      NotifErrorEmptyVal: false
    }
  },
  props: {
    ageArr: {
      type: Array,
      required: true
    },
    goalsArr: {
      type: Array,
      required: true
    },
    interestsArr: {
      type: Array,
      required: true
    },
    ValidateButtonValue: {
      type: String,
      required: true
    },
    hideName: {
      type: Boolean,
      required: false
    }
  },
  mounted () {
    axios
      .get(`http://localhost:${process.env.VUE_APP_PORT}/user/`, { withCredentials: true })
      .then(res => {
        // console.log(res.data)
        this.firstname = res.data.user.firstname
        this.age = res.data.user.age
        this.goals = res.data.user.preferences.goals
        this.interests = res.data.user.preferences.interests
        // Put interests to sg:
        // Updating the store with user data:
        this.$store.commit('updateAge', this.age)
        this.$store.commit('updateGoals', this.goals)
        // Putting interests to plural:
        this.interests = this.interests.map(interest => this.putToPlural(interest))
        this.$store.commit('updateInterests', this.interests)
      })
      .catch(err => {
        return console.error(err)
      })
  },
  methods: {
    ...mapActions(['updateAge', 'addNewGoals', 'removeGoals', 'addNewInterests', 'removeInterests', 'putWordsToSingular', 'updateInterests']),
    putToPlural (word) {
      if (word.toLowerCase() === 'biographie' || word.toLowerCase() === 'conte' || word.toLowerCase() === 'roman') {
        word = word.concat('', 's')
      }
      return word
    },
    validateForm () {
      const firstname = this.firstname
      const age = this.$store.state.age
      const goals = this.$store.state.preferences.goals
      let interests = this.$store.state.preferences.interests

      // Guard : checking if any field is empty. If so, an error notification gets displayed:
      if (age.length === 0 || goals.length === 0 || interests.length === 0) {
        this.NotifErrorEmptyVal = true
        setTimeout(() => {
          this.NotifErrorEmptyVal = false
        }, 1800)
        return console.error('Champ(s) vide(s)')
      }
      // Guard: checking if hideName option is activated : if not, it means that the name needs to be filled too:
      if (!this.hideName && firstname.length === 0) {
        this.NotifErrorEmptyVal = true
        setTimeout(() => {
          this.NotifErrorEmptyVal = false
        }, 1800)
        return console.error('Champ(s) vide(s)')
      }
      // Putting interests to singular:
      this.$store.commit('putWordsToSingular')
      interests = this.$store.state.preferences.interests
      // console.log('before updating interests in userInfos : ', interests)
      // Creating updated user's infos object:
      const userInfos = {
        firstname,
        age,
        preferences: {
          goals,
          interests
        }
      }
      // Updating user's infos in database:
      axios
        .put(`http://localhost:${process.env.VUE_APP_PORT}/user/`, { ...userInfos }, { withCredentials: true })
        .then(res => {
          console.log(res.data)
          if (res.data.success) {
            this.$buefy.toast.open({
              message: 'Enregistré',
              type: 'is-success'
            })
            setTimeout(() => {
              this.$router.push('/')
            }, 1300)
          }
        })
        .catch(err => {
          return console.error(err)
        })
    },
    toggleButton (e) {
      // TOGGLE AGE OPTIONS BUTTONS :
      if (e.target.className.includes('btn-ages-options')) {
        document.querySelectorAll('.btn-ages-options').forEach(button => {
          if (button !== e.target) {
            button.classList.remove('selected')
          }
          if (button === e.target) {
            if (e.target.className.includes('selected')) {
              e.target.classList.remove('selected')
              this.age = ''
              this.$store.commit('updateAge', this.age)
            } else if (!e.target.className.includes('selected')) {
              e.target.classList.add('selected')
              this.age = button.value
              this.$store.commit('updateAge', this.age)
            }
          }
        })
      }
      // TOGGLE GOALS OPTIONS BUTTONS :
      if (e.target.className.includes('btn-goals-options')) {
        document.querySelectorAll('.btn-goals-options').forEach(button => {
          if (button === e.target) {
            if (e.target.className.includes('selected')) {
              e.target.classList.remove('selected')
              this.$store.commit('removeGoals', button.value)
            } else if (!e.target.className.includes('selected')) {
              e.target.classList.add('selected')
              this.$store.commit('addNewGoals', button.value)
            }
          }
        })
      }
      // TOGGLE INTERESTS OPTIONS BUTTONS :
      if (e.target.className.includes('btn-interests-options')) {
        document.querySelectorAll('.btn-interests-options').forEach(button => {
          if (button === e.target) {
            if (e.target.className.includes('selected')) {
              e.target.classList.remove('selected')
              this.$store.commit('removeInterests', button.value)
            } else if (!e.target.className.includes('selected')) {
              e.target.classList.add('selected')
              this.$store.commit('addNewInterests', button.value)
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.notification{
    margin: 0 auto;
    font-size: 1.1rem;
    position: fixed;
    position: fixed !important;
    z-index: 1;
    top: 10%;
    left: 5%;
    transform: translate(50%,-100%);
}

.selected{
    background-color:  #FFF1CC;
}

.buttons{
  justify-content: center;
}

.btn-option{
  font-family: 'Roboto', sans-serif;
  height: 7vh;
  max-width: 15vw;
  min-width: 12vw;
  line-height: 140%;
  height: auto;
  min-height: 8vh;
}

h2{
  font-family: 'Ibarra Real Nova', 'serif';
}

.title-goals, .title-interests{
  margin-top: 5% !important;
}

.input-firstname{
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 5%;
}

.btn-valider{
  min-width: fit-content;
  width: 20%;
  height: 6.5vh;
  font-weight: bold;
  background-color: #D8E0CF;
  text-transform: uppercase;
  /* margin: auto !important; */
  margin: 3% auto 0 40%;
}
/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

@media(max-width: 1030px){
  .input-firstname{
    width: 55%;
  }
  .btn-option{
    max-width: 45vw;
    min-width: 30vw;
  }
  .btn-valider{
    width: 40%;
    margin: 3% auto 0 30%;
  }
}
@media(max-width: 430px){
    .input-firstname{
    width: 85%;
  }
  .btn-valider{
    width: 70%;
    margin: 3% auto 0 13%;
  }
  .buttons{
    flex-direction: column;
  }
  .btn-option{
    max-width: 65vw;
    min-width: 63vw;
    box-sizing: border-box;
  }
}
</style>
