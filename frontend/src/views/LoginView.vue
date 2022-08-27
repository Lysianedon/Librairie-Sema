<template>
    <div class="wrapper">
        <div class="content">
            <div class="notification is-danger is-light column is-6" v-if="errorLogin || errorSignup || UserAlreadyExists" >
                <p class="error-notif" v-if="errorLogin">Oups... Identifiants incorrects..!</p>
                <p class="error-notif" v-if="errorSignup">Les deux mots de passe doivent être identiques </p>
                <p class="error-notif" v-if="UserAlreadyExists">Compte déjà existant. Essayez de vous connecter. </p>
                <button class="delete"></button>
            </div>
            <!-- <h1>LOGIN PAGE</h1> -->
            <!-- <img src="@/assets/logo.png"
                alt=""
                class="logo"> -->
            <div class="white-space"></div>
            <div class="login-quote">
                <div class="login-form">
                    <h2 class="is-size-2">Bienvenue</h2>
                    <h4 class="is-size-4"> {{userHasAnAccount ? 'Connectez - vous' : 'Inscrivez - vous'}}</h4>

                    <input class="input is-medium" type="email" placeholder="Email" v-model="email">

                    <input
                    class="input is-medium"
                    type="password"
                    placeholder="Mot de passe"
                    v-model="password">

                    <input
                    :class="`input is-medium ${userHasAnAccount ? 'is-hidden' : ''}`"
                    type="password"
                    placeholder="Confirmer le mot de passe" v-model="passwordConfirmation">

                    <input type="button" :value="`${userHasAnAccount ? 'SE CONNECTER' : 'S\'INSCRIRE'}`" class="btn-valider" @click="handleLoginOrSignUp">

                    <div class="texts">
                        <p>{{userHasAnAccount ? 'Vous n\'avez pas de compte ? ' : 'Vous avez déjà un compte ? '}}
                            <router-link to="">
                                <a href="" @click="switchToLogin">
                                {{userHasAnAccount ? 'Inscrivez-vous' : 'Connectez-vous'}}
                                </a>
                            </router-link>
                        </p>
                        <p class="is-size-7">En vous inscrivant, vous acceptez les <router-link to=""><a href="">conditions d’utilisation et la politique de confitentialité</a> </router-link> </p>
                    </div>
                </div>
                <div class="quote-block">
                    <p class="quote"> <span class="quote-signs left"> “</span><span class="bigger">R</span>ien <br> ne peut suffire à l'homme que ce qu'il n'a pas. <br><br><span class="quote-signs right">"</span></p>
                    <p class="has-text-right proverbe"> -Les pensées et proverbes wolofs (1963)</p>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default ({
  name: 'LoginView',
  data () {
    return {
      userHasAnAccount: false,
      firstname: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      user: {},
      errorLogin: false,
      errorSignup: false,
      UserAlreadyExists: false
    }
  },
  methods: {
    switchToLogin () {
      this.userHasAnAccount = !this.userHasAnAccount
    },
    handleLoginOrSignUp () {
      // If the user tries to log in :
      if (this.userHasAnAccount) {
        axios
          .post(
            'http://localhost:8001/login',
            { email: this.email, password: this.password },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data)
            if (res.data.success) {
              this.$router.push('/')
            }
          })
          .catch((error) => {
            this.errorLogin = true
            setTimeout(() => {
              this.errorLogin = false
            }, 2000)
            return error
          })
      }
      // If the user tries to sign up (i.e doesn't have an account):
      if (!this.userHasAnAccount) {
        // Checking passwords: If the two passwords don't match, an error message gets displayed:
        if (this.password !== this.passwordConfirmation) {
          this.errorSignup = true
          setTimeout(() => {
            this.errorSignup = false
          }, 2600)
          return null
        }
        const user = {
          firstname: 'cher lecteur',
          email: this.email,
          password: this.password,
          age: 'Non indiqué',
          isAdmin: false,
          preferences: {
            goals: [],
            interests: []
          },
          books: {
            alreadyRead: [],
            favorites: [],
            allBooks: []
          }
        }
        axios
          .post(
            'http://localhost:8001/signup',
            { ...user },
            { withCredentials: true }
          )
          .then(
            res => {
              console.log(res.data)
              if (res.data.success) {
                this.$router.push('/inscription/preferences')
              }
            })
          // If error, it means that the account already exists:
          .catch(err => {
            this.UserAlreadyExists = true
            setTimeout(() => {
              this.UserAlreadyExists = false
            }, 2600)
            return console.log(err)
          })
      }
    }
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&family=Rufina:wght@400;700&display=swap');

.wrapper{
    background: url('@/assets/books.png') no-repeat;
    background-position-x: 55%;
    background-position-y:100%;
    background-size: 29%;
    overflow: hidden;
}
.content{
    /* background: url('@/assets/logo.png') no-repeat, url('@/assets/books.png') no-repeat; */
    background: url('@/assets/logo.png') no-repeat;
    background-position-x: center;
    background-position-y: 3vh;
    background-size: 20%;
    text-align: center;
    /* border: 1px solid black; */
    margin: 0 auto;
}

.btn-valider:hover {
background-color: #D8E0CF;
box-shadow: 0px 0px 0px rgba(216,224,207,1.00);
}

.btn-valider:active {
  transform: translateY(-3px);
}

.notification{
    margin: auto;
    font-size: 1.1rem;
    position: fixed;
    left: 25%;
}

.login-quote{
    display: flex;
}

.login-form{
    /* border: 1px solid black; */
    font-family: 'Ibarra Real Nova', 'serif';
    background-color: RGB(255, 248, 227);
    background-color: #fff1cc9a;;
    backdrop-filter: blur(5px);
    border-radius: 5px;
    margin: 2%;
    padding-top: 5%;
    width: 50%;
}

.quote-block{
    /* border: 1px solid black; */
    margin: 2%;
    width: 50%;
}

.white-space{
    height: 7rem;
}
input{
    margin: auto;
    width: 75%;
    margin: 2%;
}

.btn-valider{
    color: white;
    background-color: black;
    font-weight: bold;
}

.texts{
    margin: 6% auto 3%;
    width: 90%;
}

a{
    color: black;
    font-weight: bold;
}

.quote{
    margin: 5% auto 0 auto;
    padding-top: 7%;
    font-size: 3rem;
    line-height: 175%;
    text-align: center;
    font-family: 'Ibarra Real Nova', 'serif';
    color: black;
    -webkit-animation: 4s ease 0s normal forwards 1 fadein;
    animation: 4s ease 0s normal forwards 1 fadein;
}
@keyframes fadein{
    0% { opacity:0; }
    50% { opacity:.5; }
    100% { opacity:1; }
}

@-webkit-keyframes fadein{
    0% { opacity:0; }
    50% { opacity:.5; }
    100% { opacity:1; }
}

.quote-signs{
    display: block;
    font-size: 12rem;
    text-align: left;
    font-family: 'Sorts Mill Goudy', serif;
}

.right{
    text-align: right;
    line-height: 12%;
}

.bigger{
    font-size: 6rem;
}
.proverbe{
    padding-bottom: -15vh;
}
</style>
