<template>
  <form @submit.prevent="submitCode">
    <div class="fm">
      <v-otp-input
      v-model="confirmationCode"
      :length="4"
      variant="solo-filled"
      ></v-otp-input>
      <button type="submit">Criar Conta</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  data()
  {
    return {
      confirmationCode: ""
    };
  },
  methods: {
    submitCode() {
  axios.get("http://localhost:3000/api/users/currentuser")
      .then(response => {
        const userid = response.data.id;
        // Check if the confirmation code is correct
        if (this.confirmationCode === "4694") {
          // Redirect to "/"
          this.$router.push(`/`);
        } else {
          alert("Código de confirmação inválido");
        }
      })
      .catch(error => {
        console.error("Erro ao obter o usuário atual:", error);
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
  padding-top: 35%;
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
