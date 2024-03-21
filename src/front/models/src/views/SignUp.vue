<template>
    <div class="login-background">
        <img class="background-image" src="../assets/login-background.png" alt="Login Background">
        <div class="login-container">
            <div class="floating-menu">
                <ClientLoginMenu :parceiro="'/partnersignup'" :cliente="'/signup'" :isClient="true"/>
                <ClientSignUpForm />
            </div>
        </div>
    </div>
</template>

<script>
import ClientSignUpForm from '@/components/ClientSignUpForm.vue';
import ClientLoginMenu from '@/components/ClientLoginMenu.vue';

export default {
    name: 'Login',
    components: {
        ClientSignUpForm,
        ClientLoginMenu
    },
}
</script>

<style scoped>
.login-background {
    position: relative;
    background-color: #CD4364;/* Ajuste a altura conforme necessário */
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:100vh;
    object-fit: none;
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
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.529);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    width: 400px;
    height: 80%;
}

@media (max-width: 768px){
    .floating-menu {
        width: 80%;
    }
}
</style>