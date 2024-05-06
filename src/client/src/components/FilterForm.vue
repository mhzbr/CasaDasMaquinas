<template>
  <div class="overlay">
    <div class="form-container">
      <button class="close-btn" @click="toggleFilter">×</button>
      <div class="top">
        <h1>Filtros</h1>
      </div>
      <div class="form-inputs">
        <form @submit.prevent="filter" class="edit-form">
          <SearchInput v-model="searchVal" :placeholder="'Search'" />
          <div class="slidebars">
            <h2>Preço</h2>
            <v-range-slider
              v-model="price"
              :max="1000"
              :min="50"
              :step="25"
              class="align-center"
              hide-details
            ></v-range-slider>
            <div class="range-values">
              <h4>de R${{ price[0] }}</h4>
              <h4 v-if="price[1] < 1000">até R${{ price[1] }}</h4>
              <h4 v-else>até R$999+</h4>
            </div>
          </div>

          <div class="slidebars">
            <h2>Idade</h2>
            <v-range-slider
              v-model="age"
              :max="60"
              :min="18"
              :step="1"
              class="align-center"
              hide-details
            ></v-range-slider>
            <div class="range-values">
              <h4>de {{ age[0] }} anos</h4>
              <h4 v-if="age[1] < 60">até {{ age[1] }} anos</h4>
              <h4 v-else>até 60+</h4>
            </div>
          </div>

          <!-- Select boxes -->
          <button v-if="showWeight" class="submit" @click="toggleWeight">
            Peso
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="12" height="12" fill="white">
              <path
                d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
              />
            </svg>
          </button>

          <button v-else class="submit" @click="toggleWeight">
            Peso
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="12" height="12" fill="white">
              <path
                d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
              />
            </svg>
          </button>

          <div v-if="showWeight" class="slidebars">
            <h2>Peso</h2>
            <v-range-slider
              v-model="weight"
              :max="160"
              :min="40"
              :step="1"
              class="align-center"
              hide-details
            ></v-range-slider>
            <div class="range-values">
              <h4>de {{ weight[0] }}kg</h4>
              <h4 v-if="weight[1] < 160">até {{ weight[1] }}kg</h4>
              <h4 v-else>até 160kg+</h4>
            </div>
          </div>

          <button v-if="showHeight" class="submit" @click="toggleHeight">
            Altura
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="12" height="12" fill="white">
              <path
                d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
              />
            </svg>
          </button>

          <button v-else class="submit" @click="toggleHeight">
            Altura
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="12" height="12" fill="white">
              <path
                d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
              />
            </svg>
          </button>

          <div v-if="showHeight" class="slidebars">
            <h2>Altura</h2>
            <v-range-slider
              v-model="height"
              :max="200"
              :min="80"
              :step="1"
              class="align-center"
              hide-details
            ></v-range-slider>
            <div class="range-values">
              <h4>de {{ height[0] }}cm</h4>
              <h4 v-if="height[1] < 200">até {{ height[1] }}cm</h4>
              <h4 v-else>até 200cm+</h4>
            </div>
          </div>
          <!-- Submit button -->
          <button type="submit" class="submit">Filtrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import SearchInput from 'vue-search-input';
import { useUserFilterStore } from '@/stores/userFilter';

export default {
  components: {
    SearchInput,
  },
  data() {
    return {
      searchVal: '',
      price: [50, 1000],
      age: [18, 60],
      showWeight: false,
      showHeight: false,
      weight: [40, 160],
      height: [90, 200],
    };
  },
  methods: {
    filter() {
      // Emit toggleFilter event
      this.$emit("toggleFilter");

      // Update user filter with current values
      const userFilterStore = useUserFilterStore();
      userFilterStore.updateFilter(
        this.weight[0],
        this.weight[1],
        this.height[0],
        this.height[1],
        this.price[0],
        this.price[1],
        this.age[0],
        this.age[1]
      );

      // Emit update event
      this.$emit("update");
    },
    toggleWeight() {
      this.showWeight = !this.showWeight;
    },
    toggleHeight() {
      this.showHeight = !this.showHeight;
    },
    toggleFilter() {
      this.$emit("toggleFilter");
    },
  },
};
</script>

<style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Black background with 50% opacity */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Set a high z-index value */
  }
  
  .form-container {
    /* White background for the form container */
    padding: 0 20px 20px 20px;
    width: 360px;
    border-radius: 10px;
    position: relative;
    justify-content: center;
    align-items: center;
    align-content: center;
    display: flex;
    max-height: 50vh;
    flex-direction: column;
    background-color: rgb(230, 230, 230);
    color: black;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    background: none;
    color: white;
    font-size: 2em;
    border: none;
    cursor: pointer;
  }
  
  .top {
    background-color: #481222;
    color: white;
    text-align: center;
    justify-content: center;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 10px 10px 0 0;
    width: 360px;
    height: 70px;
  }
  
  .edit-form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  
  .range-values {
    display: flex;
    justify-content: space-between;
  }
  
  input,
  textarea {
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    color: white;
    fill: white;
    border: none;
    width: 100%;
    background-color: rgba(245, 245, 220, 0);
    border: 2px solid white;
  }
  
  ::placeholder {
    color: white;
  }
  
  input[type="file"] {
    display: none;
  }
  
  .custom-file-upload,
  .submit {
    padding: 10px;
    border-radius: 10px;
    background-color: #481222;
    color: white;
    font-size: 1em;
    cursor: pointer;
    text-align: center;
    margin: 10px auto;
    width: 200px;
    direction: ltr;
    border: none;
  }
  .slidebars {
    margin: 10px 0;
    border-radius: 5px;
    padding: 20px;
    background-color: #0000005b;
  }
  .form-inputs {
    width: 360px;
    max-height: 40vh;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 20px;
  }
  </style>
  