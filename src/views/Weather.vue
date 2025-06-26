<template>
  <h4>Weather</h4>
</template>

<script>
import axios from "axios";
import db from "../firebase/firebaseinit";
export default {
  name: "WeatherView",
  props: ["APIkey2"],
  data() {
    return {
      forecast: null,
      currentWeather: null,
      loading: true,
      lat:"",
      lon:"",
      currentTime: null,
    };
  },
  created() {
    this.getWeather();
    //With this command i can extract a param from the URL
    //console.log(this.$route.params.city);
  },
  beforeDestroy(){
    this.$emit("resetDays")
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
            axios.get(
              `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.lat},${this.lon}/2025-06-01/2025-06-07?unitGroup=metric&include=days&key=${this.APIkey2}&contentType=json`
            ).then((res) => {
              this.forecast = res.data;
            })
            .then (() => {
              this.loading = false;
              this.getCurrentTime();
            })
          });
        });
    },
    getCurrentTime(){
      const dateObject = new Date();
      this.currentTime = dateObject.getHours();
      const sunrise = new Date(this.currentWeather.sys.sunrise * 1000).getHours();
      const sunset = new Date(this.currentWeather.sys.sunset *1000).getHours();
      if (this.currentTime > sunrise && this.currentTime < sunset) {
        this.$emit("is-day");
      } else {
        this.$emit ("is-night");
      }
    }
  },
};
</script>

<style>
h4 {
  padding-top: 100px;
}
</style>