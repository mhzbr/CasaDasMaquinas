<template>
  <div class="profile-h-container">
    <div class="profile-h">
      <div class="profile-header">
        <div class="profile-image">
          <img :src="profileImage" alt="Profile Image" style="width: 250px; height: 250px;">
        </div>
        <div class="profile-info">
          <h1>{{ name }}</h1>
          <div style="display:flex; flex-direction: row; justify-content:space-between; margin: 10px 0;">
            <h3>R${{ price }}/hora </h3>
            <h3>{{ age }} anos</h3>
          </div>
          <p style="text-align:justify;">Olá me chamo {{ name }}, tenho {{ age }} anos. {{ description }}</p>
        </div>
      </div>
      <div class="profile-info-bl">
        <div class="profile-info-bl-lat">
          <div class="verified" v-if="verifiedProfile">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.4-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z"/></svg> Perfil Verificado
          </div>
          <div class="stars">
            <span v-for="i in Math.floor(stars)" :key="i" class="star">&#9733;</span>
            <span v-for="i in 5 - Math.ceil(stars)" :key="i" class="star">&#9734;</span>
          </div>
        </div>    
        <div style="display: flex; flex-direction:row; justify-content:space-around; width:100%" v-if="isCurrentUser">
          <profile-edit-btn  />
          <LogOutBtn :color="color"  />
        </div>    
        <div class="profile-header-btns" v-else>
          <chatButton :chatWith="user"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProfileEditBtn from './ProfileEditBtn.vue';
import LogOutBtn from './LogOutBtn.vue';
import chatButton from './ChatButton.vue';
export default {
  data() {
    return {
      color: '#481222',
      isCurrentUser: false
    };
  },
  props: {
    profileImage: String,
    name: String,
    age: Number,
    price: String,
    description: String,
    verifiedProfile: Boolean,
    stars: Number,
    userId: String,
    user: Object
  },
  components: {
    ProfileEditBtn,
    LogOutBtn,
    chatButton
  },
  methods: {
    async checkCurrentUser() {
      try {
        const response = await axios.get('http://localhost:3000/api/users/currentuser');
        const id = response.data.id;
        if (!id) {
          console.error('Error: ID not found in the response data');
          return;
        }
        const siteURL = window.location.href;
        const list = siteURL.split('/');
        const userIdFromURL = list[list.length - 1];
        this.isCurrentUser = userIdFromURL === id;
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    },
    sendGift() {
      // Implementar lógica para enviar presente
    }
  },
  mounted() {
    this.checkCurrentUser();
  }
};
</script>

<style scoped>
  .profile-header-btns {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 20px 0;
  }
  .profile-header-btns button {
    padding: 10px;
    border-radius: 10px;
    background-color: #481222;
    color:white;
    font-size: 1.5em;
    cursor: pointer;
    direction: ltr;
    border: 1px solid white;
  }
  .verified {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    color:#481222;
    font-weight: bold;
    font-size: 1.8em;
  }
  .verified svg {
    width: 40px;
    height: 40px;
    fill: #481222;
    margin-right: 10px;
  }
  .profile-header-btns button:hover {
    background-color: rgb(60, 60, 60);
  }
  .profile-header {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  @media (max-width: 768px) {
    .profile-header {
      flex-direction: column;
    }
  }
  .profile-h {
    width: 100%;
    padding: 0 10px;
    max-width: 800px;
  }
  
  .profile-image img {
    width: 100px; /* Ajuste conforme necessário */
    height: 100px; /* Ajuste conforme necessário */
    border-radius: 50%;
    object-fit: cover;
  }
  
  .profile-info {
    height: 100%;
    min-height: 250px;
    border-radius: 10px;
    justify-items: space-around;
    padding: 10px 20px;
    margin-left: 15px;
    background-color: white;
    }

  .stars {
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #CC7F0C;
    font-size: 2.5rem;
  }
  .star {
    margin-right: 0.1rem;
  }
  .description {
    padding: 10px;
    border-radius: 0 10px;
    text-align: justify;
    margin: 10px 0;
  }
  .profile-info-bl{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }
  .profile-info-bl-lat{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 20px 10px 0 10px;
  }
  .profile-h-container {
    padding: 20px 0;
    background-color: #CBCBCB;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow: auto;
  }
</style>