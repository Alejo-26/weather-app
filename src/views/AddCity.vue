<template>
  <div class="grid">
    <div class="city-link" v-for="(city, index) in cities" v-bind:key="index">
      <City v-bind:city="city" v-bind:edit="edit"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import City from "../components/City"

export default {
  name: 'AddCity',
  props: ["cities", "edit"],
  created (){
    console.log(this.cities)

  },
  components: {
    City
  }
}
</script>

<style lang="scss" scoped>
.grid{
  display: grid;
  padding-top:81px;
  background-color: #21363d;
  width: 100%;
  min-height: 100vh;
  grid-auto-rows: 290px;
  @media (min-width: 400px){
    grid-template-columns: repeat(2,1fr);
  }
}
</style>
