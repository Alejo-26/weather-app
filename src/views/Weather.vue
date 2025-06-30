<template>
  <div class="main">
    <div v-if="loading" class="loading">
      <span></span>
    </div>
    <div v-else class="weather" :class="{ day: isDay, night: isNight }">
      <div class="weather-wrap"></div>
      <CurrentWeather v-bind:isDay="isDay" :isNigth="isNight" :currentWeather="currentWeather"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "../firebase/firebaseinit";
import CurrentWeather from "@/components/CurrentWeather.vue";

export default {
  name: "WeatherView",
  props: ["APIkey2", "isDay", "isNight"],
  components: {
    CurrentWeather
  },
  data() {
    return {
      forecast: null,
      currentWeather: null,
      loading: true,
      lat: "",
      lon: "",
      currentTime: null,
    };
  },
  created() {
    this.getWeather();
    //With this command i can extract a param from the URL
    //console.log(this.$route.params.city);
  },
  beforeDestroy() {
    this.$emit("resetDays");
  },
  methods: {
    getWeather() {
      db.collection("cities")
        .where("city", "==", `${this.$route.params.city}`)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            this.currentWeather = doc.data().currentWeather;
            this.lat = doc.data().currentWeather.coord.lat;
            this.lon = doc.data().currentWeather.coord.lon;
            axios
              .get(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.lat},${this.lon}/2025-06-01/2025-06-07?unitGroup=metric&include=days&key=${this.APIkey2}&contentType=json`
              )
              .then((res) => {
                this.forecast = res.data;
              })
              .then(() => {
                this.loading = false;
                console.log("Loading finalizado: ", this.loading)
                this.getCurrentTime();
              });
          });
        });
    },
    getCurrentTime() {
      const dateObject = new Date();
      this.currentTime = dateObject.getHours();
      const sunrise = new Date(
        this.currentWeather.sys.sunrise * 1000
      ).getHours();
      const sunset = new Date(this.currentWeather.sys.sunset * 1000).getHours();
      if (this.currentTime > sunrise && this.currentTime < sunset) {
        this.$emit("is-day");
      } else {
        this.$emit("is-night");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 2px solid transparent;
    border-top-color: #142a5f;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
  }
}
.weather {
  transition: 500ms ease;
  overflow: scroll;
  width: 100%;
  padding-top: 100px; // Altura aproximada de tu header
  height: calc(100vh - 100px); // Esto ajusta el alto real visible

  .weather-wrap {
    overflow: hidden;
    max-width: 1024px;
    margin: 0 auto;
  }
}
</style>