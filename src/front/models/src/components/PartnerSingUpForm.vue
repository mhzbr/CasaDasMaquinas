<template>
    <div>
        <form class="form-container" @submit.prevent="signUp">
            <input type="text" id="name" placeholder="Nome" v-model="name" required>
            <input type="text" id="lastName" placeholder="Sobrenome" v-model="lastName" required>
            <input type="email" id="email" placeholder="E-mail" v-model="email" required>
            <input type="text" id="cpf" placeholder="CPF" v-model="cpf" required>
            <input type="password" id="password" placeholder="Senha" v-model="password" required>
            <input type="password" id="confirm-password" placeholder="Confirme sua senha" v-model="confirmPassword" required>
            <div class="remember-me-container">
                <input type="checkbox" id="rememberMe" v-model="rememberMe">
                <label for="rememberMe">Remember Me</label>
            </div>
            <button type="submit">Logar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            lastName: '', 
            email: '',
            cpf: '',
            password: '',
            confirmPassword: '',
            rememberMe: false
        };
    },
    methods: {
        signUp() {
            if (this.password !== this.confirmPassword) {
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
                .then(response => {
                    // Handle successful response
                    console.log('Form submitted successfully:', response.data);
                    this.$router.push('/confirmation');
                })
                .catch(error => {
                    
                    console.error('Error submitting form:', error);
                    alert('An error occurred. Please try again later. ERROR'+ error.message);
                });
        }
    }
};
</script>


<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding-bottom: 100px;
}

input {
    border: 2px solid white;
    border-radius: 5px;
    width: 100%;
    font-size: 1.2em;
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