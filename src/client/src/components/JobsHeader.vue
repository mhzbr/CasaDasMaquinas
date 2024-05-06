<template>
  <div class="jobs-header">
    <div class="buttons-container">
      <button
        class="btn rounded"
        :class="{ active: genre === 'man' }"
        @click="setGenre('man')"
      >
        Homem
      </button>
      <button
        class="btn rounded"
        :class="{ active: genre === 'woman' }"
        @click="setGenre('woman')"
      >
        Mulher
      </button>
      <button
        class="btn rounded"
        :class="{ active: genre === 'trans' }"
        @click="setGenre('trans')"
      >
        Trans
      </button>
    </div>
    <div class="filter-container">
      <!-- Options for sorting -->
      <select @change="orderBy($event.target.value)" class="btn rounded">
        <option value="default">Padrão</option>
        <option value="online">Online</option>
        <option value="rating">Pontuação</option>
      </select>
      <button class="btn filter-btn rounded" @click="toggleFilter">Filtros</button>
      <FilterForm v-if="isFormVisible" @toggleFilter="toggleFilter" @update="update" />
    </div>
  </div>
</template>

<script>
import FilterForm from "./FilterForm.vue";
import { useUserFilterStore } from "@/stores/userFilter";
import { ref, onMounted, getCurrentInstance } from "vue";

export default {
  name: "JobsHeader",
  components: {
    FilterForm,
  },
  setup() {
    const userFilterStore = useUserFilterStore();
    const { emit } = getCurrentInstance(); // Obtém a função emit do componente atual
    const isFormVisible = ref(false);
    const genre = ref("woman");

    const toggleFilter = () => {
      isFormVisible.value = !isFormVisible.value;
    };

    const update = () => {
      // Emit the 'update' event
      emit("update");
    };

    const setGenre = (criteria) => {
      if (!["woman", "man", "trans"].includes(criteria)) {
        alert("Invalid genre value");
      } else {
        userFilterStore.updateGenre(criteria);
        genre.value = criteria;
      }
      update();
    };

    const orderBy = (option) => {
      userFilterStore.updateOrderBy(option);
      update();
    };

    // Emit the 'update' event on component mount
    onMounted(() => {
      update();
    });

    return {
      isFormVisible,
      genre,
      toggleFilter,
      update,
      setGenre,
      orderBy,
    };
  },
};
</script>

<style scoped>
.jobs-header {
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
  border-bottom: 1px solid #cc7f0c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 3vh;
}

.buttons-container {
  width: 350px;
  justify-content: space-between;
  margin: 4vh;
  display: flex;
}

.btn {
  padding: 0.5rem 1rem;
  margin-right: 10px;
  background-color: white;
  border: none;
  border-radius: 25px;
  height: 40px;
  font-size: 1em;
  color: #481222;
  font-weight: normal;
  border: 2px solid #481222;
  cursor: pointer;
}

.filter-container {
  width: 350px;
  justify-content: space-between;
  display: flex;
}

.filter-btn {
  background-color: #481222;
  color: white;
  border-color: #481222;
}

.active {
  background-color: #481222;
  color: white;
}

@media (min-width: 600px) {
  .jobs-header {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .filter-container {
    justify-content: space-around;
  }
}
</style>
