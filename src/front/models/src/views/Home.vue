<template>
    <div>
        <h1>Welcome to the Home Page</h1>
        <p>Click the links below to navigate:</p>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
    </div>
</template>

<script>
export default {
    name: 'Home',
}
</script>

<style scoped>
h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

p {
    font-size: 16px;
    margin-bottom: 20px;
}

router-link {
    display: block;
    margin-bottom: 10px;
    color: blue;
    text-decoration: underline;
}
</style>