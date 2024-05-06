<template>
  <div class="profile-container">
    <ProfileHeader
      :profileImage="profileData.profile.photoPath"
      :name="fullName"
      :age="age"
      :price="profileData.profile.valuePerHour"
      :description="profileData.profile.description"
      :stars="profileData.profile.stars"
      :verifiedProfile="profileData.profile.verifiedProfile"
      :user="profileData"
    />
    <ProfileBody
      :videoSource="profileData.profile.videoPath"
      :sexuality="profileData.profile.sexuality"
      :height="profileData.profile.height"
      :weight="profileData.profile.weight"
      :footSize="profileData.profile.footLength"
      :region="profileData.profile.region"
      :schedule="time"
      :location="profileData.profile.local"
      :genre="profileData.profile.genre"
    />
    <ProfileAbout :aboutText="profileData.profile.about" />
    <ProfileAddMidia/>
    <ProfileMidia :mediaList="profileData.media" />
  </div>
</template>

<script>
import ProfileHeader from '../components/ProfileHeader.vue';
import ProfileBody from '../components/ProfileBody.vue';
import ProfileAbout from '../components/ProfileAbout.vue';
import ProfileMidia from '../components/ProfileMidia.vue';
import ProfileAddMidia from '../components/ProfileAddMidia.vue';
import axios from 'axios';

export default {
  components: {
    ProfileHeader,
    ProfileAddMidia,
    ProfileBody,
    ProfileAbout,
    ProfileMidia
  },
  data() {
    return {
      profileData: {
        id: undefined,
        email: "Carregando...",
        firstName: "Carregando...",
        lastName: "Carregando...",
        media: undefined,
        profile: {
          footLength: 0,
          birthDate: 0,
          sexuality: "Carregando...",
          genre: "Carregando...",
          height: 0,
          weight: 0,
          region: "Carregando...",
          startTime: "Carregando...",
          endTime: "Carregando...",
          local: "Carregando...",
          description: "Carregando...",
          valuePerHour: 0,
          about: "Carregando...",
          verifiedProfile: false,
          stars: 0,
          videoPath: null,
          photoPath: null
        },
      }
    };
  },
  computed: {
    fullName() {
      return `${this.profileData.firstName} ${this.profileData.lastName}`;
    },
    age() {
      if (!this.profileData.profile.birthDate) return '';
      const birthYear = new Date(this.profileData.profile.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      return currentYear - birthYear;
    },
    time() {
      return `${this.formatTimeFromDate(this.profileData.profile.startTime)} - ${this.formatTimeFromDate(this.profileData.profile.endTime)}`;
    },
  },
  mounted() {
    const profileId = this.getProfileIdFromUrl();
    this.fetchProfileData(profileId);
  },
  methods: {
    getProfileIdFromUrl() {
      const url = window.location.href;
      const segments = url.split('/');
      return segments[segments.length - 1];
    },
    formatTimeFromDate(timeString) {
      if (typeof timeString === 'string') {
        const [hours, minutes] = timeString.split(':').map(Number);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      } else {
        console.error('O objeto fornecido não é uma string:', timeString);
        return 'Horário Inválido';
      }
    },
    async fetchProfileData(profileId) {
      const domain = 'http://localhost:3000/';
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${profileId}`);
        const acompanhante = response.data;

        // Verifica se cada campo existe na resposta e atualiza apenas se existir
        if (acompanhante.id) this.profileData.id = acompanhante.id;
        if (acompanhante.email) this.profileData.email = acompanhante.email;
        if (acompanhante.firstName) this.profileData.firstName = acompanhante.firstName;
        if (acompanhante.lastName) this.profileData.lastName = acompanhante.lastName;
        if (acompanhante.media) {
          this.profileData.media = acompanhante.media;
          for (const media of this.profileData.media) {
            media.url = domain + media.url;
          }
        }
        if (acompanhante.profile) {
          const profile = acompanhante.profile;
          this.profileData.profile.footLength = profile.footLength || 0;
          this.profileData.profile.birthDate = profile.birthDate || 0;
          this.profileData.profile.sexuality = profile.sexuality || "Carregando...";
          this.profileData.profile.height = profile.height || 0;
          this.profileData.profile.weight = profile.weight || 0;
          this.profileData.profile.region = profile.region || "Carregando...";
          this.profileData.profile.startTime = profile.startTime || "Carregando...";
          this.profileData.profile.endTime = profile.endTime || "Carregando...";
          this.profileData.profile.local = profile.local || "Carregando...";
          this.profileData.profile.description = profile.description || "Carregando...";
          this.profileData.profile.valuePerHour = profile.valuePerHour || 0;
          this.profileData.profile.about = profile.about || "Carregando...";
          this.profileData.profile.genre = profile.genre || "Carregando...";
          this.profileData.profile.verifiedProfile = profile.verifiedProfile || false;
          this.profileData.profile.stars = profile.stars || 0;
          this.profileData.profile.videoPath = domain + profile.videoPath || null;
          this.profileData.profile.photoPath = domain + profile.photoPath || null;
        }

      } catch (error) {
        console.error('Error fetching profile data:', error);
        // redireciona para 404
        this.$router.push('/404');
      }
    }
  }
};
</script>

<style scoped>
.profile-container {
  height: 100%;
  overflow: auto;
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
}
</style>
