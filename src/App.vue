<template>
  <div class="main">
    <Navigation class="navigation"/>
    <router-view v-bind:cities="cities"/>
  </div>
</template>

<script>
import axios from "axios"
import db from "./firebase/firebaseinit"
import Navigation from "./components/Navigation.vue"

export default {
  name: "App",
  components: {
    Navigation,

  },
  data() {
    return {
      APIkey: "5c107b0c9179e90811ea58a9ebdd8ed8",
      city: "Milan",
      cities: [],
    }

  },
  created (){
    //this.getCurrentWeather();
    this.getCityWeather();
  }, 
  methods: {

    getCityWeather() {
      let firebaseDB = db.collection('cities');

      firebaseDB.onSnapshot( snap => {
        snap.docChanges().forEach( async(doc) => {
          //console.log(doc.doc.data());
          if (doc.type == "added"){
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=metric&appid=${this.APIkey}`
              );
              const data = response.data;
              //console.log(data)
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,                
                })
                .then( () =>{
                  this.cities.push(doc.doc.data());
                })
            }
            catch (err){
              console.log(err);
            }
          }
        });
      });
    },

    getCurrentWeather (){
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.APIkey}`)
        .then((res) => {
          console.log(res)
        })
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;
  
}
}
</style>
