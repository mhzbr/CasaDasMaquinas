<!-- ProfileBody.vue -->
<template>
  <div class="profile-body">
    <video-player
      class="video-container"
      ref="videoPlayer"
      :src="videoSource"
      controls
      :loop="true"
      :volume="0.6"
      crossorigin="anonymous"
      playsinline
      :height="250"
      :playback-rates="[0.7, 1.0, 1.5, 2.0]"
      @mounted="handleMounted"
      @ready="handleEvent($event)"
      @play="handleEvent($event)"
      @pause="handleEvent($event)"
      @ended="handleEvent($event)"
      @loadeddata="handleEvent($event)"
      @waiting="handleEvent($event)"
      @playing="handleEvent($event)"
      @canplay="handleEvent($event)"
      @canplaythrough="handleEvent($event)"
      @timeupdate="handleEvent(player?.currentTime())"
    />

    <div class="profile-details">
      <p><strong>Sexualidade:</strong> {{ sexuality }}</p>
      <p><strong>Altura:</strong> {{ height }}</p>
      <p><strong>Peso:</strong> {{ weight }}</p>
      <p><strong>Tamanho do pé:</strong> {{ footSize }}</p>
      <p><strong>Região:</strong> {{ region }}</p>
      <p><strong>Horário:</strong> {{ schedule }}</p>
      <p><strong>Local:</strong> {{ location }}</p>
      <p><strong>Gênero:</strong> {{ genre }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

type VideoJsPlayer = ReturnType<typeof videojs>

export default defineComponent({
  name: 'ProfileBody',
  components: {
    VideoPlayer
  },
  props: {
    sexuality: String,
    height: String,
    weight: String,
    footSize: String,
    region: String,
    schedule: String,
    location: String,
    genre: String,
    videoSource: String
  },
  setup() {
    const player = shallowRef<VideoJsPlayer>()
    const videoPlayer = shallowRef<InstanceType<typeof VideoPlayer>>()

    const handleMounted = (payload: any) => {
      player.value = payload.videoPlayer
    }

    const handleEvent = (log: any) => {
      return 0;
    }

    return { player, videoPlayer, handleMounted, handleEvent }
  }
})
</script>

<style scoped>
.profile-body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.video-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  margin: 10px;
  width: 50%;
  max-width: 700px;
  height: 50vh;
}

.video-container p {
  text-align: center;
}

.video-container svg {
  width: 40%;
  height: 40%;
  fill: white;
}

.profile-details {
  background-color: rgb(143, 143, 143);
  font-size: 15px;
  padding: 40px 20px;
  margin-left: 20px;
  color: black;
  font-weight: bold;
  width: 50%;
  max-width: 300px;
  height: 50vh;
}

strong {
  font-weight: bold;
  color: black;
}
@media (max-width: 768px) {
  .profile-body {
    flex-direction: column;
  }
  .profile-details {
    margin-left: 0;
    margin-top: 20px;
    width: 100%;
  }
  .video-container {
    width: 90%;
  }
}
</style>