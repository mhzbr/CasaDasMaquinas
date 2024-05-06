<template>
    <div class="content">
        <button @click="logout" :style="`color: ${color}`">Sair</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: {
        color: String
    },
    methods: {
        async logout() {
            // logout route Api/users/logout
            axios.post('http://localhost:3000/api/users/signout')
                .then((response) => {
                    // redirect to login page
                    this.$router.push('/login')
                })
                .catch((error) => {
                    console.error('Error logging out:', error)
                    console.error(error)
                })
        }
    }
}
</script>

<style scoped>
.content {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0;
  }
button {
    padding: 10px;
    border-radius: 10px;
    background-color:rgba(255, 255, 255, 0);
    font-size: 1.5em;
    cursor: pointer;
    direction: ltr;
    border: 2px solid #481222;
  }
button:hover {
    background-color: #481222;
    color: white;
  }
</style>