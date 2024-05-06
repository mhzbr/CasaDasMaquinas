<!-- ProfileEditBtn.vue -->
<template>
  <div class="content">
    <button @click="toggleForm">Editar Perfil</button>
    <ProfileForm v-if="isFormVisible"  @closeForm="toggleForm"/>
  </div>
</template>

<script>
import ProfileForm from "./ProfileForm.vue";

export default {
  components: {
    ProfileForm
  },
  data() {
    return {
      isFormVisible: false
    };
  },
  methods: {
    toggleForm() {
      this.isFormVisible = !this.isFormVisible;
    }
  }
};
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
  background-color: #481222;
  color:white;
  font-size: 1.5em;
  cursor: pointer;
  direction: ltr;
  border: 1px solid white;
}
</style>
