<template>
  <div>
    <form @submit.prevent="signUp">
      <div class="fm">
        <input id="name" v-model="name" placeholder="Nome" required type="text">
        <input id="lastName" v-model="lastName" placeholder="Sobrenome" required type="text">
        <input id="email" v-model="email" placeholder="E-mail" required type="email">
        <input id="cpf" v-model="cpf" placeholder="CPF" required type="text">
        <div class="senhas">
          <input id="password" v-model="password" placeholder="Senha" required type="password"> 
          <input id="confirm-password" v-model="confirmPassword" placeholder="Confirme sua senha" required type="password">
        </div>
        <button type="submit">Cadastrar-se</button>
        <p>Ja tem conta?</p>
        <a href="/partnerlogin">Faça o login</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Recap from "./Recap.vue";
export default {
  components: {
    Recap
  },
  data()
  {
    return {
      name: '',
      lastName: '',
      email: '',
      cpf: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
      sitekey: "6LeqcL0pAAAAAN0KvN3w6Dt3EGLHPSZKjhKvy_k0"
    };
  },
  methods: {
    signUp()
    {
      if (this.password !== this.confirmPassword)
      {
        alert('Passwords do not match!');
        return;
      }

      const data = {
        firstName: this.name,
        lastName: this.lastName,
        email: this.email,
        cpf: this.cpf,
        password: this.password,
      };

      // Send the data using Axios
      axios.post('http://localhost:3000/api/users/signup', data)
          .then(response =>
          {
            // Handle successful response
            alert("Login successful: " + JSON.stringify(response));
            this.$router.push('/confirmation');
          })
          .catch(error =>
          {

            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later. ERROR' + error.message);
          });
    }
  }
};
</script>


<style scoped>
.fm{
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 10%;
}

.senhas{
  display:flex;
  flex-direction: row;
}

.senhas input{
  width: 50%;
}

input {
  border: 2px solid white;
  border-radius: 5px;
  width: 100%;
  background-color: #D9D9D9;
  font-size: 1.5em;
  margin: 10px auto;
  height: 40px;
  padding: 15px 5px;
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
  margin: 5px;
}

.remember-me-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

button {
  border: 1px solid #481222;
  border-radius: 10px;
  color: #481222;
  font-size: 1.1em;
  padding: 0 20px;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 15px;
}
a {
  color: #481222;
  font-weight: bolder;
}
</style>