<template>
  <div class="app">
    <div class="nav-container">
      <HeaderNav/>
    </div>
    <div class="router-container">
      <RouterView/>
    </div>
    <footer>
      <FooterNav/>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import {RouterView} from "vue-router"
import FooterNav from "@/components/FooterNav.vue"
import HeaderNav from "@/components/HeaderNav.vue"
</script>

<style>
html,
body {
  margin: 0;
  border: 0;
  padding: 0;
  overflow: hidden;
}

/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  width: 0;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
  scrollbar-width: none;
}

.nav-container {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
}

#app {
  height: inherit;
  width: inherit;
  margin: 0;
  border: 0;
  padding: 0;
  overflow: hidden;
}

.app {
  height: 100vh;
  width: 100vw;
  margin: 0;
  background-color: #481222;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: start;
  overflow: hidden;
  align-items: center;
  font-family: 'Irina Sherif', sans-serif;
}

.router-container {
  height: 80vh;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

footer {
  height: 7vh;
  width: 100%;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  background-color: transparent;
}
</style>
