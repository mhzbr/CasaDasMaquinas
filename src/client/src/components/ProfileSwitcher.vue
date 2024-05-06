<template>
    <div id="Content">
      <button id="cliente" :class="{ 'highlight': isClient }" @click="toggleColors">Video</button>
      <button id="parceiro" :class="{ 'highlight': !isClient }" @click="toggleColors">Imagens</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isClient: false
      };
    },
  
    methods: {
      toggleColors() {
        this.isClient = !this.isClient;
        this.sendToggle();
      },
      sendToggle() {
        this.$emit('onClick');
      }
    }
  };
  </script>
  
  <style scoped>
  a {
    margin: 0;
    width: 50%;
    padding: 0;
  }
  button {
    width: 100%;
    background-color: #fff;
    border: 1px solid #481222;
    font-size: large;
    color: #481222;
    padding: 10px;
    margin: 0;
  }
  
  #Content {
    width: 100%;
    margin: 20px 0;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    box-shadow: 0 4px 8px #48122276; 
  }
  
  .highlight {
    background-color: #481222;
    color: #fff;
  }
  
  #cliente {
    border-radius: 10px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  #parceiro {
    border-radius: 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  </style>
  