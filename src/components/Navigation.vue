<template>
  <header class="container add-city">
    <nav>
      <span>Add City</span>
      <div class="right">
        <i class="far fa-edit"></i>
        <i class="fa fa-sync"></i>
        <i @click="addCity" class="fas fa-plus"></i>
        <i class="fas fa-home"></i>
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