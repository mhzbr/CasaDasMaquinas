<template>
    <div>
        <form class="form-container" @submit.prevent="signUp">
            <input type="text" id="name" placeholder="Nome" v-model="name" required>
            <input type="text" id="lastName" placeholder="Sobrenome" v-model="lastName" required>
            <input type="email" id="email" placeholder="E-mail" v-model="email" required>
            <input type="password" id="password" placeholder="Senha" v-model="password" required>
            <input type="password" id="confirm-password" placeholder="Confirme sua senha" v-model="confirmPassword" required>
            <div class="remember-me-container">
                <input type="checkbox" id="rememberMe" v-model="rememberMe">
                <label for="rememberMe">Lembrar-me</label>
            </div>
            <button type="submit">Cadastrar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ClientSignUpForm',
    data() {
        return {
            name: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            rememberMe: false
        };
    },
    methods: {
        signUp() {
            // Verifica se as senhas coincidem
            if (this.password !== this.confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }
            
            // Cria um objeto de dados com os valores do formulário
            const data = {
                firstName: this.name,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
            };
            axios.post('http://localhost:3000/api/users/signup?type=consumer', data)
                .then(response => {
                    // Manipula a resposta bem-sucedida
                    console.log('Formulário enviado com sucesso:', response.data);
                    this.$router.push('/confirmation');
                })
                .catch(error => {
                    // Manipula erro
                    console.error('Erro ao enviar o formulário:', error);
                    alert('Ocorreu um erro. Por favor, tente novamente mais tarde.');
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