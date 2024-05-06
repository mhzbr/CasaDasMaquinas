<template>
  <div class="page">
    <div class="uper-text">
      <p>Conecte-se a usuários ou acompanhantes profissionais, oferecendo uma plataforma segura e discreta para agendar encontros. Explore perfis verificados, marque compromissos e desfrute de uma experiência personalizada e confiável.</p>
    </div>
    <div class="search">
      <h3>Para começar informe sua cidade.</h3>
      <SearchInput v-model="searchVal"/>
    </div>
    <div class="partners-slide">
      <h2>Conheça nossos parceiros destaque</h2>
    </div>
    <div class="signup-split">
      <div class="split split-1">
        <p class="bold-text">Usuário</p>
        <p>Para ter uma experiência personalizada crie sua conta conosco.
          (não é obrigatório ter uma conta para acessar nossa plataforma)</p>
        <router-link to="/signup">
          <button class="log-btn">Criar conta</button>
        </router-link>
      </div>
      <div class="split split-2">
        <p class="bold-text">Parceiro(a)</p>
        <p>Crie e divulgue seu trabalho dentro da nossa plataforma, damos todo apoio necessário para que o nosso sucesso seja o seu também.</p>
        <router-link to="/partnersignup">
          <button class="log-btn">Criar parceria</button>
        </router-link>
      </div>
    </div>
    <div class="social">
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 40px; height: 40px; fill: rgb(92, 92, 92);"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 40px; height: 40px; fill: rgb(92, 92, 92);"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 40px; height: 40px; fill: rgb(92, 92, 92);"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"/></svg>
      </a>
    </div>
    
  </div>
</template>

<script>
import { ref } from 'vue'
import SearchInput from 'vue-search-input'
// Optionally import default styling
import 'vue-search-input/dist/styles.css'

const searchVal = ref('')

export default {
  components: {
    SearchInput
  },
  setup() {
    return {
      searchVal
    }
  }
}
</script>

<style scoped>
.page{
  display: flex;
  flex-direction: column;
  align-self: start;
  background-color: white;
  height: 100%;
  width: 100%;
  text-align: center;
  align-content: center;
  align-items: center;
  overflow: auto;
}

.uper-text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  color: white;
  font-size: 1.5rem;
  background-color: #481222;
  border-radius: 20px;
  width: 90%;
  max-width: 700px;
}
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 20px;
  color: rgb(92, 92, 92);
  font-size: 1.5rem;
  background-color: #D4D4D4;
  width: 100%;
}
.partners-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  color: white;
  font-size: 1rem;
  background-color: #481222;
  width: 100%;
}
.signup-split {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: white;
  font-size: 1rem;
  background-color: #481222;
  width: 100%;
}

@media (max-width: 768px){
  .signup-split{
    flex-direction: column;
  }
}

.split{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  color: black;
  border: 5px solid #481222;
  font-size: 1rem;
  background-color: white;
  max-width: 350px;
  border-radius: 20px;
  width: 100%;
}
.bold-text{
  color: #481222;
  font-weight: bold;
  font-size: 1.2rem;
  padding-bottom: 20px;
}
.log-btn{
  padding: 5px 10px;
  margin-top: 20px;
  color: #481222;
  border: 2px solid #481222;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}
.social {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 40px 20px;
  font-size: 1rem;
  max-width: 700px;
  width: 100%;
}
</style>