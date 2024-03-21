<template>
    <form class="form-container" @submit.prevent="submitCode">
        <input type="text" v-model="confirmationCode" placeholder="Enter code" />
        <button  type="submit">Criar Conta</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            confirmationCode: ""
        };
    },
    methods: {
        submitCode() {
            // Check if the confirmation code is correct
            if (this.confirmationCode === "your-confirmation-code") {
                // Redirect to "/"
                this.$router.push("/");
            } else {
                // Show an error message or handle invalid code
            }
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

button {
    border: 1px solid black;
    border-radius: 10px;
    padding: 0 20px;
    background-color: white;
    margin-top: 250px;
    margin-bottom: 15px;
}
</style>
