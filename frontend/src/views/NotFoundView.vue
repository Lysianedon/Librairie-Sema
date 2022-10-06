<template>
    <div class="wrapper">
      <div class="login-invitation">
        <h1> <span class="big-yellow"> <span class="oups">Oups...</span> La page ou le livre recherché(e) n'est pas ici... </span></h1>
        <h3>Ou peut-être n' a-t-il/elle jamais existé et n'est que le fruit de votre imagination...Imagination qui donnera naissance à votre tout premier livre à succès, qui sera bien évidemment répertorié sur Sema. Qui sait !</h3>
        <p>En attendant que vous preniez la plume...</p>
        <router-link to="/"><div class="btn-valider">Retour à la page d'accueil</div></router-link>
      </div>
      <div class="book">
        <div :class="`icon-option ${isLiked ? '': 'hidden'} `">
          <font-awesome-icon
            icon="fa-solid fa-heart"
            color=" rgb(108, 105, 105)"
            :class="`icon ${isLiked ? 'liked' : ''}`"
            @click="toggleLike"/>
        </div>
        <div class="content-book">
          <div class="book-infos">
            <h3 class="author"> <span class="bold">De: </span> Not Found</h3>
            <h5 class="illustration"> <span class="bold">Illustration: </span> Open Peeps</h5>
          </div>
          <div class="not-found">
            <h2 class="margin">4</h2>
            <h2>4</h2>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  data () {
    return {
      isLiked: false
    }
  },
  methods: {
    toggleLike () {
      this.isLiked = !this.isLiked
    }
  }
}
</script>

<style scoped>
.wrapper{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.login-invitation{
  width: 40vw;
}
.big-yellow, .oups{
  font-size: 3rem;
  color: #f2b818;
  font-weight: bold;
  display:block;
  line-height: 160%;
  font-family: 'Ibarra Real Nova', serif;
}
.oups{
  font-size: 5.5rem;
}
h3{
  font-size: 1rem;
  line-height: 200%;
}
.content-book{
  width: 32vw;
  height: 74vh;
  padding: 2%;
  background-image: url('@/assets/not-found-img.png');
  background-repeat: no-repeat;
  background-size: 72%;
  background-position-y: 17vh;
  background-position-x: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgb(220, 216, 216);
  background-color: rgba(250, 235, 215, 0.759);
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(128, 124, 124, 0.25), 0 2px 7px rgba(100, 98, 98, 0.22);
  /* border: 1px solid black; */
}
.icon{
  text-align: center;
  cursor: pointer;
  margin-left: 15vw;
  color:black;
}
.hidden{
  opacity: 0;
}
.book{
  padding: 2%;
  border-radius: 8px;
}
.book:hover{
  box-shadow: 0 2px 4px rgba(128, 124, 124, 0.25), 0 2px 7px rgba(100, 98, 98, 0.22);
}
.book:hover > * {
  opacity: 1 !important;
}
.icon:hover{
  color:red;
}
.liked{
  color:red !important;
}
.bold{
  font-weight: bold;
  color: black;
}
.author{
  font-size: 2rem;
  line-height: 200%;
  /* color: rgb(91, 89, 89); */
}
.illustration{
  line-height: 270%;
  text-align: center;
}
.not-found{
  display:flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid black; */
  width: 28vw;
}
h2{
  font-size: 12rem;
  height: fit-content;
  color:black;
}
p{
  margin-top: 4%;
}
.margin{
  margin-right: 3% !important;
}
.btn-valider{
  text-align: center;
  margin-top: 6vh;
  color: black;
  font-size: 1.2rem;
  border: 1px solid rgb(241, 241, 241);
}
.btn-valider:hover{
  border: none;
}
/* RESPONSIVE --  RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- RESPONSIVE -- */

@media(max-width: 1170px){
  .oups{
    font-size: 4rem;
  }
  .big-yellow{
    font-size: 2.5rem;
    line-height: 160%;
  }
  .content-book{
    background-size: 65%;
    background-position-y: 25vh;
    height: 70vh;
  }
  h2{
    font-size: 10rem;
    margin-top: 9%;
  }
  .book-infos{
    padding: 4% 0 0 0;
  }
  .illustration{
    line-height: 235%;
  }
}
@media(max-width: 800px){
  .wrapper{
    flex-direction:column-reverse;
    height: auto;
  }
  .login-invitation, .book{
    width: 80vw;
    margin:auto;
  }
  .content-book{
    width: 50vw;
    height: 71vh;
    background-size: 66%;
    background-position-y: 25vh;
    margin: auto;
    margin-bottom: 2vh;
  }
  .not-found{
    width: 45vw;
  }
  h2{
    font-size: 11rem;
    margin-top: 6%;
  }
  .book:hover{
    box-shadow: none;
  }
  .icon{
    margin-left: 35vw;
  }
  .btn-valider{
    margin-bottom: 8vh;
  }
}
@media(max-width: 450px){
  .content-book{
    width: 80vw;
    height: 71vh;
    background-size: 76%;
    background-position-y: 22vh;
    margin: auto;
    margin-bottom: 2vh;
  }
  .book{
    padding: 0;
  }
  .oups{
    font-size: 3.5rem;
  }
  .big-yellow{
    font-size: 2rem;
    line-height: 150%;
  }
  .not-found{
    width: 100%;
  }
  h2{
    font-size: 11rem;
    margin-top: 1%;
  }
  p{
    margin-top: 6vh;
  }
}
@media(max-width: 375px){
  .login-invitation{
    width: 85vw;
  }
  .oups{
    font-size: 3rem;
  }
  .content-book{
    width: 80vw;
    height: 60vh;
    background-size: 75%;
    background-position-y: 22vh;
    margin: auto;
    margin-bottom: 2vh;
  }
  h2{
    font-size: 8rem;
    margin-top: 9%;
  }
}
</style>
