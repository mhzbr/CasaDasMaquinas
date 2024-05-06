<template>
  <div>
    <form @submit.prevent="login">
      <div class="fm">
        <input id="email" v-model="email" placeholder="E-mail" required type="email">
        <input id="password" v-model="password" placeholder="Senha" required type="password">
        <button type="submit">Logar</button>
        <ClientLogintext :linkProp="'/signup'"/>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import ClientLogintext from "./ClientLogintext.vue";

export default defineComponent({
  name: "ClientLoginForm",
  components: {
    ClientLogintext
  },
  data()
  {
    return {
      email: "",
      password: "",
      rememberMe: false,
      sitekey: "6LeqcL0pAAAAAN0KvN3w6Dt3EGLHPSZKjhKvy_k0"
    }
  },
  methods: {
    login()
    {
      // Create an object with form data
      const formData = {
        email: this.email,
        password: this.password
      };

      // Make AJAX request to API
      axios.post("http://localhost:3000/api/users/signin?type=consumer", formData)
  .then(response => {
    // Handle successful response
    alert("Login successful" + response.data);
    // Redirect to jobs
    this.$router.push("/job");
  })
  .catch(error => {
    // Handle error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      alert("An error occurred during login: " + error.response.status);
      // You can also access error response data if available
      alert("Error data: " + JSON.stringify(error.response.data));
    } else if (error.request) {
      // The request was made but no response was received
      alert("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      alert("Error occurred before sending the request: " + error.message);
    }
  });

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
