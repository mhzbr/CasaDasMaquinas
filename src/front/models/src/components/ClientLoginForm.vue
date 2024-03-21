<template>
    <div>
        <form class="form-container" @submit.prevent="login">
            <input type="email" id="email" placeholder="E-mail" v-model="email" required>
            <input type="password" id="password" placeholder="Senha" v-model="password" required>
            <div class="remember-me-container">
                <input type="checkbox" id="rememberMe" v-model="rememberMe">
                <label for="rememberMe">Remember Me</label>
            </div>
            <button type="submit">Logar</button>
            
            <ClientLogintext :linkProp="'/signup'"/>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios'; 
import ClientLogintext from './ClientLogintext.vue';

export default defineComponent({
    name: 'ClientLoginForm',
    components: {
        ClientLogintext
    },
    data() {
        return {
            email: '',
            password: '',
            rememberMe: false,
        }
    },
    methods: {
        login() {
            // Create an object with form data
            const formData = {
                email: this.email,
                password: this.password
            };

            // Make AJAX request to API
            axios.post('http://localhost:3000/api/users/signin?type=consumer', formData)
                .then(response => {
                    console.log('Response:', response.data);
                    alert('Login successful'+ response.data.message);
                })
                .catch(error => {
                    alert('An error occurred during login: '+ error);

                });
        }
    }
});
</script>


<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding-bottom: 150px;
}

input {
    border: 2px solid white;
    border-radius: 5px;
    width: 70%;
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
    border: 1px solid black;
    border-radius: 10px;
    padding: 0 20px;
    background-color: white;
    margin-top: 10px;
    margin-bottom: 15px;
}
</style>
