<template>
  <div class="main">
    <Modal
      v-if="modalOpen"
      v-on:close-modal="toggleModal"
      v-bind:APIkey="APIkey"
    />
    <Navigation
      v-on:add-city="toggleModal"
      v-on:edit-city="toggleEdit"
      v-bind:addCityActive="addCityActive"
      v-bind:isDay="isDay"
      v-bind:isNight="isNight"
    />
    <router-view
      v-bind:cities="cities"
      v-bind:edit="edit"
      v-bind:APIkey2="APIkey2"
      v-on:is-day="dayTime"
      v-on:is-night="nightTime"
      v-on:resetDays="resetDays"
    />
  </div>
</template>

<script>
import axios from "axios";
import db from "./firebase/firebaseinit";
import Navigation from "./components/Navigation.vue";
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Modal,
  },
  data() {
    return {
      isDay: null,
      isNight: null,
      APIkey: "5c107b0c9179e90811ea58a9ebdd8ed8",
      APIkey2: "KQDFG354HAGR9NJH3RF3BJHUN",
      city: "Milan",
      cities: [],
      modalOpen: null,
      edit: null,
      addCityActive: null,
    };
  },
  created() {
    //this.getCurrentWeather();
    this.getCityWeather();
    this.checkRoute();
  },
  methods: {
    getCityWeather() {
      let firebaseDB = db.collection("cities");

      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async (doc) => {
          //console.log(doc.doc.data());
          if (doc.type == "added" && !doc.doc.Nd) {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&units=metric&appid=${this.APIkey}`
              );
              const data = response.data;
              //console.log(data)
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,
                })
                .then(() => {
                  this.cities.push(doc.doc.data());
                });
            } catch (err) {
              console.log(err);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            //this.cities.push(doc.doc.data())
            //this method does not apply anymore, because doc.doc.Nd was deleted by openweather
          } else if (doc.type === "removed") {
            // on the following line i filter the city from the array cities which has been removed
            this.cities = this.cities.filter(
              (city) => city.city !== doc.doc.data().city
            );
          }
        });
      });
    },

    getCurrentWeather() {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.APIkey}`
        )
        .then((res) => {
          console.log(res);
        });
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    checkRoute() {
      if (this.$route.name === "AddCity") {
        this.addCityActive = true;
      } else {
        this.addCityActive = false;
      }
      //console.log(this.addCityActive);
    },
    dayTime() {
      this.isDay = !this.isDay;
      //console.log(this.isDay)
    },
    nightTime() {
      this.isNight = !this.isNight;
      //console.log(this.isDay)
    },
    resetDays(){
      this.isDay = false;
      this.isNight = false;
    }
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
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
