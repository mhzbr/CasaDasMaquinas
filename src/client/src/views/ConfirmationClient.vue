<template>
    <div class="login-background">
      <img alt="Login Background" class="background-image" src="../assets/login-background.png">
      <div class="login-container">
        <div class="floating-menu">
          <h2>Um Codigo foi enviado ao email cadastrado</h2>
          <ConfirmationFormClient/>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ConfirmationFormClient from '@/components/ConfirmationFormClient.vue';
  
  export default {
    name: 'Confirmation',
    components: {
      ConfirmationFormClient
    },
  }
  </script>
  
  <style scoped>
  .login-background {
    position: relative;
    background-color: #481222; /* Ajuste a altura conforme necessário */
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .background-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height:100%;
      object-fit:cover;
  }
  
  .login-container {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  
  .floating-menu {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: rgb(255, 255, 255);
    padding: 20px;
    padding-top: 30px;
    border-radius: 15px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    width: 80%;
    height: 90%;
    min-width: 300px;
    max-width: 600px;
    color: #481222;
    overflow: auto;
  }
  
  </style>