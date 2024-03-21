<template>
  <div class="app">
    <HeaderNav/>
    <div class="router-container">
      <RouterView />
    </div>
    <footer>
      <FooterNav />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import FooterNav from '@/components/FooterNav.vue'
import HeaderNav from '@/components/HeaderNav.vue'
</script>

<style>
  html,
  body {
    margin: 0;
    border: 0;
    padding: 0;
  }

  #app {
    height: inherit;
    width: inherit;
    margin: 0;
    border: 0;
    padding: 0;
  }

  .app {
    height: 100vh;
    width: 100vw;
    margin: 0 auto;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Irina Sherif', sans-serif;
  }

  .router-container {
    height: 85%;
    flex-grow: 1;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  footer {
    height: 15%;
    width: 100%;
  }
  a{
    text-decoration: none;
    color: black;
  }
  a:hover {
    background-color: transparent;
}

</style>
