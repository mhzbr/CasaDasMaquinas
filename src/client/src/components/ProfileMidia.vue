<template>
    <div class="container">
        <ProfileSwitcher @click="toggleView" />

        <div v-if="showImages" class="content" v-viewer="{ movable: true }">
            <div class="media-item" v-for="media in mediaList" :key="media.id">
                <div v-if="media.type === 'IMAGE'" class="image-wrapper">
                    <button @click="deleteMedia(media.id)" class="delete-button" v-if="isCurrentUser">Deletar</button>
                    <img :src="media.url" :alt="media.id" />
                </div>
            </div>
        </div>

        <div v-else class="content">
            <div v-for="media in mediaList" :key="media.id" class="media-item">
                <div v-if="media.type === 'VIDEO'" class="video-container">
                    <button @click="deleteMedia(media.id)" class="delete-button" v-if="isCurrentUser">Deletar</button>
                    <video-player
                        :src="media.url"
                        controls
                        :loop="true"
                        :volume="0.6"
                        crossorigin="anonymous"
                        playsinline
                        :height="320"
                        :width="300"
                        :playback-rates="[0.7, 1.0, 1.5, 2.0]"
                        @ready="handleEvent"
                        @play="handleEvent"
                        @pause="handleEvent"
                        @ended="handleEvent"
                        @loadeddata="handleEvent"
                        @waiting="handleEvent"
                        @playing="handleEvent"
                        @canplay="handleEvent"
                        @canplaythrough="handleEvent"
                        @timeupdate="handleEvent"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, shallowRef } from 'vue';
    import ProfileSwitcher from './ProfileSwitcher.vue';
    import { VideoPlayer } from '@videojs-player/vue';
    import axios from 'axios';

    interface Media {
        url: string;
        type: 'VIDEO' | 'IMAGE';
        id: string;
    }

    export default defineComponent({
        data() {
            return {
                isCurrentUser: false,
            };
        },
        components: {
            ProfileSwitcher,
            VideoPlayer
        },
        props: {
            mediaList: {
                type: Array as () => Media[],
                default: () => []
            }
        },
        setup(props) {
            const showImages = shallowRef(true);

            const handleEvent = (event: Event) => {
            }

            const deleteMedia = async (id: string) => {
                try {
                    const media = props.mediaList.find(media => media.id === id);
                    if (!media) return; // Return if media not found
                    const response = await axios.delete(`http://localhost:3000/api/users/delete/${id}`);
                    // Remove media from the list after successful deletion
                    props.mediaList.splice(props.mediaList.indexOf(media), 1);
                } catch (error) {
                    console.error('Error deleting media:', error);
                }
            }

            const toggleView = () => {
                showImages.value = !showImages.value;
            }

            return { showImages, handleEvent, deleteMedia, toggleView };
        },
        methods: {
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
    });
</script>

<style>
.container {
    padding: 20px;
}

.content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
}

.media-item {
    position: relative;
    margin-right: 10px; /* Distância entre os itens */
    margin-bottom: 10px; /* Distância entre as linhas */
}

.delete-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    width: 100%;
    background-color: rgba(255, 0, 0, 0.473);
    color: white;
    border: none;
    cursor: pointer;
    z-index: 10000;
}
.delete-button:hover {
    background-color: rgba(255, 0, 0, 0.792);
}

.image-wrapper {
    width: 300px;
    height: 320px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
}

.image-wrapper img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
</style>