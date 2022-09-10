<template>
    <div>
      <form action="" method="post">

        <label for="title">Titre*</label>
        <input type="text" name="title" class="title" >

        <label for="author">Auteur(s)*</label>
        <input type="text" name="author" class="author" >

        <label for="image">Lien de l'image*</label>
        <input type="text" name="image" class="image" >

        <div class="wrapper-genre-country">
            <div class="content-genre">
                <label for="genre">Genre*</label>
                <select name="" id="" v-model="selectedGenre" class="genre-options-wrapper">
                    <option disabled value="">Sélectionner:</option>
                    <option v-for="(genre,index) in genres" :key="index">{{genre}}</option>
                </select>
            </div>

            <div class="content-country">
                <label for="country">Pays*</label>
                <input type="text" name="country" class="country medium">
            </div>
        </div>

        <h4>Tranches d'âge (plusieurs choix possibles)*</h4>

        <div class="label-checkbox">
            <input type="checkbox" id="agerange-1" class="agerange" value="Moins de 25 ans" v-model="checkedAgeRanges">
            <label for="ageranga-1">Moins de 25 ans</label>
        </div>
        <div class="label-checkbox">
            <input type="checkbox" id="agerange-2" class="agerange" value="Entre 25 et 30 ans" v-model="checkedAgeRanges">
            <label for="ageranga-2">Entre 25 et 30 ans</label>
        </div>
        <div class="label-checkbox">
            <input type="checkbox" id="agerange-3" class="agerange" value="Plus de 30 ans" v-model="checkedAgeRanges">
            <label for="ageranga-3">Plus de 30 ans</label>
        </div>

        <label for="book-store-name" class="label-book-store-name">Où se le procurer</label>
        <input type="text" name="book-store-name" class="book-store-name" >

        <label for="book-store-link" class="label-book-store-link">Lien du site ou adresse</label>
        <input type="text" name="book-store-link" class="book-store-link" >

        <label for="synopsis" class="label-synopsis">Synopsis*</label>
        <textarea name="synopsis" id="synopsis" class="input-synopsis" cols="70" rows="10"></textarea>

        <button class="btn-valider">Ajouter un livre</button>
      </form>
    </div>
</template>

<script>
export default {
  name: 'BookFormComponent',
  data () {
    return {
      ageRanges: ['Moins de 25 ans', 'Entre 25 et 30 ans', 'Plus de 3O ans', 'Je ne souhaite pas répondre'],
      genres: ['Roman', 'Biographie', 'Conte', 'Bande dessinée', 'Livre de recettes'],
      selectedGenre: '',
      checkedAgeRanges: [],
      newBook: {}
    }
  }
}
</script>

<style scoped>
form{
  border: 1px solid black;
  padding: 5%;
  border: 1px solid rgb(241, 239, 239);
  width: 50vw;
  margin: auto;
  overflow-y: scroll;
  border-radius: 16px;
  background-color: rgba(248, 248, 248, 0.694);
  background-color: #fff1ccb1;
  backdrop-filter: blur(3px);
  box-shadow: 2px 5px 8px rgba(214, 214, 214, 0.563), 2px 5px 8px rgba(214, 214, 214, 0.563);
}

input[type="text"]{
  font-size: 1rem;
  padding-left: 3%;
  display: block;
  width: 80%;
  border-radius: 16px;
  height: 6vh;
  margin: 2% 0 0 3%;
  border: none;
  border: 1px solid rgb(234, 234, 234);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
input[type="checkbox"]{
  width: 20px;
  margin-top: 2.5%;
}

h4{
  padding-left: 3%;
  margin-top: 6vh;
}

.medium{
  width: 105% !important;
}
.wrapper-genre-country{
  display: flex;
  justify-content: space-evenly;
  margin: 4% 0;
  /* border: 1px solid black; */
  width: 85%;
}

label{
    display:block;
  margin: 3% 0 1% 5%;
  font-weight: bold;
  font-size: 1.1rem;
}
.genre-options-wrapper{
  width: 15vw;
  background-color: white;
  border: 1px solid rgb(225, 222, 222);
  padding: 7%;
  border-radius: 16px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
.label-checkbox{
  display: flex;
  padding-left: 3vw;
}

.label-book-store-name, .label-book-store-link{
  padding-top: 3vh;
}

.label-synopsis{
  padding-top: 3vh;
}

.input-synopsis{
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  margin: 2% 0 0 1%;
  width: 38vw;
  overflow-y: scroll;
  padding: 1% 3% 3% 3%;
  border: 1px solid rgb(238, 235, 235);
  font-size: .9rem;
  line-height: 200%;
  box-shadow: 0 4px 8px rgba(108, 106, 106, 0.25), 0 4px 15px rgba(136, 134, 134, 0.22);
}

.btn-valider{
  width: 20vw;
  margin: 10% auto 0 24%;
  font-weight: bold;
}

</style>
