<template>
  <div class="profile-page">
    <!-- Anúncios -->
    <div class="anuncio">
      <!-- Seus anúncios aqui -->
    </div>

    <!-- Espaço em branco -->
    <div class="header">
      <JobsHeader @update="fetchData" />
    </div>
    <div class="spacer">
      <!-- Verifica se existem perfis -->
      <template v-if="profiles.length === 0">
        <div class="zero-profiles">
          <br>
          <h1>Nenhum perfil encontrado na região.</h1>
        </div>
      </template>

      <!-- Renderiza os perfis se existirem -->
      <template v-else>
        <div class="profile-cards-container">
          <ProfileCard
            v-for="(profile, index) in profiles"
            :key="index"
            :name="profile.name"
            :age="profile.age"
            :value="profile.value"
            :stars="Math.round(profile.stars)"
            :photo="profile.photo"
            :id="profile.id"
          />
        </div>
      </template>

      <!-- Espaço em branco até o final da página -->
      <div class="text-center pager">
        <v-pagination
          @update:model-value="updatePage"
          v-model:model-value="page"
          :length="pageNumbers"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProfileCard from '@/components/ProfileCard.vue';
import JobsHeader from '@/components/JobsHeader.vue';
import { useUserFilterStore } from '@/stores/userFilter';
import { ref, onMounted, watch } from 'vue';

export default {
  name: 'Jobs',
  components: {
    ProfileCard,
    JobsHeader
  },

  setup() {
    const userFilterStore = useUserFilterStore();
    const profiles = ref([]);
    const pageNumbers = ref(1);
    const page = ref(1); // Começa na página 1

    const fetchData = () => {
      const { filter, orderBy } = userFilterStore;
      axios.get('http://localhost:3000/api/users', {
        params: {
          filter,
          orderBy,
          page: page.value,
          limit: 15
        }
      })
      .then(response => {
        profiles.value = response.data.users.map(acompanhante => ({
          name: `${acompanhante.firstName}`,
          age: calculateAge(acompanhante.profile.birthDate),
          value: acompanhante.profile.valuePerHour || 0,
          stars: acompanhante.profile.stars || 0,
          photo: 'http://localhost:3000/'+acompanhante.profile.photoPath || '',
          id: acompanhante.id
        }));
        pageNumbers.value = response.data.totalPages;
      })
      .catch(error => {
        console.error('Erro ao buscar os dados:', error);
      });
    };

    const calculateAge = (birthDate) => {
      if (!birthDate) return null;
      const diff = Date.now() - new Date(birthDate).getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const updatePage = (newPage) => {
      page.value = newPage;
      fetchData();
    };

    onMounted(() => {
      fetchData();
    });

    watch(page, () => {
      fetchData();
    });

    return {
      profiles,
      pageNumbers,
      page,
      fetchData,
      updatePage
    };
  }
};
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  align-self: start;
  background-color: white;
  height: 100%;
  width: 100%;
  text-align: center;
  align-content: center;
  align-items: center;
  overflow: auto;
}

.profile-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.header {
  background-color: green;
  width: 100%;
}

.spacer {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pager {
  color: black;
}
</style>
