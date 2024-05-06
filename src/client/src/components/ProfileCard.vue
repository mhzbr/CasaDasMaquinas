<template>
  <router-link :to="'/profile/' + id">
    <div class="profile-card" :style="{ height: cardHeight }">
      <div class="profile-photo" :style="{ height: photoHeight }">
        <img :src="photo" alt="Profile Photo" />
      </div>
      <div class="profile-info" :style="{ height: infoHeight }">
        <div class="info">
          <h2>{{ name }}, idade {{ age }}</h2>
          <h3>R${{ value }} p/hora</h3>
        </div>
        <div class="stars">
          <span v-for="i in Math.floor(stars)" :key="i" class="star">&#9733;</span>
          <span v-for="i in 5 - Math.ceil(stars)" :key="i" class="star">&#9734;</span>
        </div>
      </div>
    </div>
  </router-link>
</template>
  
  <script>
  export default {
    name: 'ProfileCard',
    props: {
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number,
        required: true
      },
      value: {
        type: Number,
        required: true
      },
      stars: {
        type: Number,
        required: true,
        validator: value => value % 0.5 === 0 && value <= 5
      },
      photo: {
        type: String,
        required: true
      },
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        cardHeight: '60vh',
        photoHeight: '75%',
        infoHeight: '25%'
      };
    }
  };
  </script>
  
  <style scoped>
  .profile-card {
    border-radius: 40px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 350px;
    margin: 10px;
    background-color: #D9D9D9;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.643);
  }
  .profile-card:hover{
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.869);
  }
  .profile-photo {
    width: 100%;
  }

  
  .profile-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .profile-info {
    display: flex;
    flex-direction: column;
    align-content: left;
    justify-content: start;
    text-align: left;
    margin-left: 20px;
    padding: 1rem;
  }
  
  .stars {
    color: #CC7F0C;
    font-size: 1.5rem;
  }
  
  .star {
    margin-right: 0.1rem;
  }
  </style>
  