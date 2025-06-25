<template>
  <div class="main">
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" v-bind:APIkey="APIkey"/>
    <Navigation v-on:add-city="toggleModal" v-on:edit-city="toggleEdit"/>
    <router-view v-bind:cities="cities" v-bind:edit="edit" v-bind:APIkey2="APIkey2"/>
  </div>
</template>

<script>
import axios from "axios"
import db from "./firebase/firebaseinit"
import Navigation from "./components/Navigation.vue"
import Modal from "./components/Modal.vue"

export default {
  name: "App",
  components: {
    Navigation,
    Modal

  },
  data() {
    return {
      APIkey: "5c107b0c9179e90811ea58a9ebdd8ed8",
      APIkey2: "KQDFG354HAGR9NJH3RF3BJHUN",
      city: "Milan",
      cities: [],
      modalOpen:null,
      edit:null
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
          if (doc.type == "added" && !doc.doc.Nd){
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
          } else if (doc.type === "added" && doc.doc.Nd){
            //this.cities.push(doc.doc.data())
            //this method does not apply anymore, because doc.doc.Nd was deleted by openweather
          } else if (doc.type === "removed"){
            // on the following line i filter the city from the array cities which has been removed
            this.cities = this.cities.filter((city) => city.city !== doc.doc.data().city);
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
    },
    toggleModal(){
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit(){
      this.edit = !this.edit;
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
