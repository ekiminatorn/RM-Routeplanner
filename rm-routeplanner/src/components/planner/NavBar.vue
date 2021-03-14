<template>
  <div>
    <nav class="navbar navbar-dark rainmaker-background-color">
      <div class="container-fluid">
        <div v-on:click="toggleSidebar" class="navbar-brand bi-list" style="padding-left: 20px; padding-top: 0; padding-bottom: 0; margin: 0; font-size: 2em"></div>
      </div>
    </nav>
    <transition name="slide">
    <div v-if="displaySidebar" id="sidebar" class="sidebar">
      <router-link to="planner">Reittisuunnittelu</router-link>
      <router-link to="planner/places">Kohteet</router-link>
      <router-link to="planner/drivers">Kuljettajat</router-link>
      <router-link to="planner/vehicles">Ajoneuvot</router-link>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data: function () {
    return {
      displaySidebar: false,
    };
  },
  methods: {
    toggleSidebar: function () {
      this.displaySidebar = !this.displaySidebar;
    },
  },
};
</script>

<style lang="scss" scoped>
/* The sidebar menu */
.sidebar {
  height: 100%; /* 100% Full-height */
  width: 250px; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: -10; /* Stay on top */
  top: 0;
  left: 0;
  background-color: $rainmaker-color;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidebar */
}

/* The sidebar links */
.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: white;
  display: block;
  transition: 0.3s;
}

.sidebar a:hover {
  color: #575555;
}

.slide-enter, .slide-leave-to {
    width: 0px;
}

.slide-enter-to, .slide-leave {
    width: 250px;
}
</style>