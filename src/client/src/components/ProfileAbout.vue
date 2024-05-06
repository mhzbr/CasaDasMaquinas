<!-- ProfileAbout.vue -->
<template>
    <div class="content">
      <div class="profile-about">
        <h3>Sobre</h3>
        <p>{{ aboutText }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      aboutText: String
    }
  }
  </script>
  
  <style scoped>
  .content{
    background-color: #cc7f0c4d;
    width: 100%;
    justify-content: center;
    align-content: center;
    display: flex;
  }
  .profile-about {
    margin: 30px 0;
    align-content: center;
    text-align: center;
    max-width: 800px;
    margin-bottom: 40px;
    padding: 20px;
  }
    .profile-about h3 {
        font-size: 2em;
        color: black;
    }
    .profile-about p {
        padding-top: 10px;
        margin: 0 10px;
        font-size: 1.1em;
        color: black;
        text-align: justify;
    }
  </style>
  