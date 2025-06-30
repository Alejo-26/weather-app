<template>
  <div>
    <header v-if="addCityActive" class="container add-city">
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
    <header v-else class="container" :class="{day: isDay, night:isNight}" >
      <nav>
        <router-link class="router-link" :to="{ name: 'AddCity' }">
          <i class="fas fa-plus"></i>
        </router-link>
        <span>
          {{ new Date().toLocaleDateString("en-us", { weekday: "short" }) }},
          {{ new Date().toLocaleDateString("en-us", { month: "short" }) }},
          {{ new Date().toLocaleDateString("en-us", { day: "2-digit" }) }}
        </span>
        <span>&deg; F</span>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  props: ["addCityActive", "isDay", "isNight"],
  methods: {
    addCity() {
      this.$emit("add-city");
    },
    reloadApp() {
      location.reload();
    },
    editCities() {
      this.$refs.editCities.classList.toggle("edit-active");
      this.$emit("edit-city");
    },
    goToHome() {
      this.$router.push({ name: "AddCity" });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-city {
  background-color: #313640;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}


header {
  z-index: 99;
  position: fixed;
  max-width: 1024px;
  width: 100%;
  top: 0;
  left: 0;

  nav {
    display: flex;
    color: #fff;
    padding: 30px 30px;
    justify-content: space-between;
  }
  .router-link {
    color: #fff;
  }

  .edit-active {
    color: rgba(210, 75, 75, 1);
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