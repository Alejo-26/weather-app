<template>
  <header class="container add-city">
    <nav>
      <span>Add City</span>
      <div class="right">
        <i @click="editCities" ref="editCities" class="far fa-edit"></i>
        <i @click="reloadApp" class="fa fa-sync"></i>
        <i @click="addCity" class="fas fa-plus"></i>
        <i @click="goToHome" class="fas fa-home"></i>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavigationBar",
  methods: {
    addCity(){
      this.$emit("add-city")
    },
    reloadApp (){
      location.reload()
    },
    editCities(){
      this.$refs.editCities.classList.toggle("edit-active")
      this.$emit("edit-city")
    },
    goToHome(){
      this.$router.push( {name: "AddCity"})
    }
  }
};
</script>

<style lang="scss" scoped>
.add-city {
  background-color: #313640;
}
header {


  nav {
    display: flex;
    color: #fff;
    padding: 30px 0;
    justify-content: space-between;
  }

  .edit-active {
    color: rgba(210, 75,75,1);
  }

  .right {
    i {
      font-size: 20px;
    }
    i:nth-child(2),
    i:nth-child(3),
    i:nth-child(4) {
      margin-left: 16px;
    }
    padding-right: 20px;
    display: flex;
    gap: 16px; // separa los íconos entre sí (opcional pero útil)
  }
  span {
    padding-left: 20px;
    font-weight: 600;
  }
}
</style>