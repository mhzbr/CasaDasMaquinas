<template>
  <button @click="handleClick" class="button">Tenho interesse</button>
  <chat v-if="button" @close="handleClick" :chatWith="chatWith" :currentUser="currentUser"/>
</template>

<script>
import chat from './Chat.vue';
import axios from 'axios';
export default {
  components: {
    chat
  },
  props:{
    chatWith: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      button: false,
      currentUser: undefined
    };
  },
  methods: {
    handleClick() {
      this.button = !this.button;
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/api/users/currentuser');
      this.currentUser = response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  },
};
</script>

<style scoped>
.button {
  padding: 10px;
  border-radius: 10px;
  background-color: #481222;
  color:white;
  font-size: 1.5em;
  cursor: pointer;
  direction: ltr;
  border: 1px solid white;
}
</style>