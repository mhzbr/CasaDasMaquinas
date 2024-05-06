<template>
    <div class="container" @click="addMidia" v-if="isCurrentUser">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z"/></svg>
        <h1>Adicionar Mídia</h1>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            isCurrentUser: false,
            dataSend: {
                photo: null,
                video: null
            }
        };
    },
    methods: {
        async addMidia() {
            try {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*, video/*';
                fileInput.click();
                
                fileInput.addEventListener('change', async () => {
                    const file = fileInput.files[0];
                    if (file.type.includes('image')) {
                        this.dataSend.photo = file;
                    } else if (file.type.includes('video')) {
                        this.dataSend.video = file;
                    } else {
                        throw new Error('Tipo de mídia não suportado');
                    }
                    const response = await axios.post('http://localhost:3000/api/users/upload', this.dataSend, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (response.status === 201) {
                        alert('Mídia enviada com sucesso!');
                    } else {
                        throw new Error('Falha no upload');
                    }
                });
            } catch (error) {
                console.error('Erro ao fazer upload da mídia:', error.message);
            }
        },
        async checkCurrentUser() {
            try {
                const response = await axios.get('http://localhost:3000/api/users/currentuser');
                const id = response.data.id;
                if (!id) {
                    console.error('Error: ID not found in the response data');
                    return;
                }
                const siteURL = window.location.href;
                const list = siteURL.split('/');
                const userIdFromURL = list[list.length - 1];
                this.isCurrentUser = userIdFromURL === id;
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        },
    },
    mounted() {
        this.checkCurrentUser();
    }
};
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        height: 400px;
        background-color: #D9D9D9;
        max-width: 600px;
        margin: 20px auto;
        border-radius: 30px;
        width: 80%;
        cursor: pointer;
    }
    .container:hover {
        background-color: #C9C9C9;
    }
    svg {
        width: 3rem;
        height: 3rem;
        fill: #868484;
    }
    h1 {
        font-size: 2rem;
        color: #868484;
    }
</style>