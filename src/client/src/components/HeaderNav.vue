<template>
  <div id="nav-container">
    <div id="nav-menu">
      <div id='menu-btn' @click="toggleMenu">
        <span v-if="isMenuOpen">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
              d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>
        </span>
        <span v-else>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        </span>
      </div>
      <a @click="redirectToHomepage">
        <img src="../assets/logo.png" alt="Logo" id="logo">
      </a>
      <div class="conta" @click="redirectToProfile">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
      </div>
    </div>
    <div class="subtitle">
      <a @click="redirectToHomepage">
        <img src="../assets/sublogo.png" alt="sublogo" id="sublogo">
      </a>
    </div>
  </div>
  <FrontMenu v-if="isMenuOpen" />
</template>

<script>
import FrontMenu from './FrontMenu.vue';
import axios from 'axios';

export default {
  components: {
    FrontMenu,
  },
  data() {
    return {
      isMenuOpen: false,
      redirect: "/login",
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    redirectToHomepage() {
      this.$router.push('/');
    },
    redirectToProfile() {
      this.$router.push(this.redirect);
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/api/users/currentuser');
      const id = response.data && response.data.id;
      if (id) {
        this.redirect = `/profile/${id}`;
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }
};
</script>

<style scoped>
#nav-container {
  width: 100%;
  position: relative;
  background-color: white;
  z-index: 9998;
}
#nav-menu {
  width: 100%;
  background-color: white;
  text-align: center;
  height: 5vh;
  padding-top: 2vh;
  display: flex;
  justify-content: space-between; 
  align-items: center;
}
.subtitle {
  height: 3vh;
  width: 100%;
  align-content: center;
  text-align: center;
  background-color: #481222;
  border-bottom: 1px solid #cc7f0cad;
}

#menu-btn {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 1rem; 
}

svg {
  width: 20px;
  height: 20px;
  fill: #000;
  cursor: pointer;
  margin: 0 15px;
}

#logo {
  margin-top: -1.5vh; 
  max-height: 4.5vh;
  max-width: 100%;
}
#sublogo{
    max-height: 1.5vh;
    max-width: 100%;
}
a{
  text-decoration: none;
}
a:hover {
  background-color: transparent;
  cursor: pointer;
}
</style>
