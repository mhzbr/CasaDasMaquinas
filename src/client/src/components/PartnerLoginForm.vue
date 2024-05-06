<template>
  <div>
    <form  @submit.prevent="login">
      <div class="fm">
        <input id="email" v-model="email" placeholder="E-mail" required type="email">
        <input id="password" v-model="password" placeholder="Senha" required type="password">
        <input id="cpf" v-model="cpf" placeholder="CPF" required type="text">
        <Recap :sitekey="sitekey" :callback="callback"/>
        <button type="submit">Logar</button>
        <ClientLogintext :linkProp="'/partnersignup'"/>
      </div>
    </form>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import axios from "axios";
import ClientLogintext from "./ClientLogintext.vue";
import Recap from "./Recap.vue";

const response=0;
export default defineComponent({
  name: "ClientLoginForm",
  components: {
    ClientLogintext,
    Recap
  },
  data()
  {
    return {
      email: "",
      password: "",
      rememberMe: false,
      cpf: "",
      sitekey: "6LeqcL0pAAAAAN0KvN3w6Dt3EGLHPSZKjhKvy_k0"
    }
  },
  methods: {
    async login()
    {
      try
      {
        const formData = {
          email: this.email,
          cpf: this.cpf,
          password: this.password
        };
        const response = await axios.post("http://localhost:3000/api/users/signin", formData);
        alert("Login successful: " + JSON.stringify(response));
        response.data.id ? this.$router.push(`/profile/${response.data.id}`) : 
        this.$router.push("/");
      }
      catch (error)
      {
        console.error("Error:", error);
        alert("An error occurred during login: " + error);
      }
    }
  }
});
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
</style>
