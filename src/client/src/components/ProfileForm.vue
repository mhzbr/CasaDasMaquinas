<template>
  <div>
    <div class="edit-form-overlay">
      <div class="edit-form-container">
        <div class="top">
          <h2>Edição de Perfil</h2>
          <button class="close-btn" @click="closeForm">&times;</button>
        </div>
        <form class="edit-form" @submit.prevent="submitForm" enctype="multipart/form-data">
          <div class="form-inputs">
            <div class="campo">
              <label for="firstName">Primeiro Nome:</label>
              <input type="text" id="firstName" v-model="dataform.firstName" maxlength="15">
            </div>
            <div class="campo">
              <label for="lastName">Último Nome:</label>
              <input type="text" id="lastName" v-model="dataform.lastName" maxlength="15">
            </div>
            <div class="campo">
              <label for="footLength">Comprimento do Pé (cm):</label>
              <input type="number" id="footLength" v-model="dataform.profile.footLength" min="0">
            </div>
            <div class="campo">
              <label for="birthDate">Data de Nascimento:</label>
              <input type="date" id="birthDate" v-model="dataform.profile.birthDate" :max="maxDate" :min="minDate">
            </div>
            <div class="campo">
              <label for="sexuality">Sexualidade:</label>
              <input type="text" id="sexuality" v-model="dataform.profile.sexuality" maxlength="15">
            </div>
            <div class="campo">
              <label for="genre">Gênero:</label>
              <select id="genre" v-model="dataform.profile.genre">
                <option value="man">Homem</option>
                <option value="woman">Mulher</option>
                <option value="trans">Trans</option>
              </select>
            </div>
            <div class="campo">
              <label for="height">Altura (cm):</label>
              <input type="number" id="height" v-model="dataform.profile.height" min="90" max="250">
            </div>
            <div class="campo">
              <label for="weight">Peso (kg):</label>
              <input type="number" id="weight" v-model="dataform.profile.weight" min="40" max="250">
            </div>
            <div class="campo">
              <label for="region">Região:</label>
              <input type="text" id="region" v-model="dataform.profile.region" maxlength="50">
            </div>
            <div class="campo">
              <label for="startTime">Hora de Início:</label>
              <input type="time" id="startTime" v-model="dataform.profile.startTime">
            </div>
            <div class="campo">
              <label for="endTime">Hora de Término:</label>
              <input type="time" id="endTime" v-model="dataform.profile.endTime">
            </div>
            <div class="campo">
              <label for="local">Local:</label>
              <input type="text" id="local" v-model="dataform.profile.local" maxlength="120">
            </div>
            <div class="campo">
              <label for="description">Descrição:</label>
              <textarea id="description" v-model="dataform.profile.description" maxlength="120"></textarea>
            </div>
            <div class="campo">
              <label for="valuePerHour">Valor por Hora:</label>
              <input type="number" id="valuePerHour" v-model="dataform.profile.valuePerHour" min="0" max="5000">
            </div>
            <div class="campo">
              <label for="about">Sobre:</label>
              <textarea id="about" v-model="dataform.profile.about" maxlength="400"></textarea>
            </div>
            <div class="campo">
              <label for="photo">Foto:</label>
              <label class="custom-file-upload">
                Escolher arquivo
                <input type="file" id="photo" name="photo" accept="image/*" @change="handlePhotoChange">
              </label>
            </div>
            <div class="campo">
              <label for="video">Vídeo:</label>
              <label class="custom-file-upload">
                Escolher arquivo
                <input type="file" id="video" name="video" accept="video/mp4" @change="handleVideoChange">
              </label>
            </div>
            <button type="submit" class="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dataform: {
        firstName: undefined,
        lastName: undefined,
        profile: {
          footLength: undefined,
          birthDate: undefined,
          sexuality: undefined,
          genre: undefined,
          height: undefined,
          weight: undefined,
          region: undefined,
          startTime: undefined,
          endTime: undefined,
          local: undefined,
          description: undefined,
          valuePerHour: undefined,
          about: undefined,
        },
        photo: null,
        video: null,
      },
    };
  },
  computed: {
    maxDate() {
      const today = new Date();
      const maxYear = today.getFullYear() - 18;
      const maxMonth = today.getMonth() + 1;
      const maxDay = today.getDate();
      return `${maxYear}-${maxMonth < 10 ? '0' + maxMonth : maxMonth}-${maxDay}`;
    },
    minDate() {
      const today = new Date();
      const minYear = today.getFullYear() - 100;
      const minMonth = today.getMonth() + 1;
      const minDay = today.getDate();
      return `${minYear}-${minMonth < 10 ? '0' + minMonth : minMonth}-${minDay}`;
    },
  },
  // Dentro do bloco de métodos do seu componente Vue.js
methods: {
    handlePhotoChange(event) {
      this.dataform.photo = event.target.files[0];
    },
    handleVideoChange(event) {
      this.dataform.video = event.target.files[0];
    },
    async submitForm() {
  try {
    if (this.dataform.profile.startTime) {
      const startHours = parseInt(this.dataform.profile.startTime.split(':')[0]);
      const startMinutes = parseInt(this.dataform.profile.startTime.split(':')[1]);
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHours, startMinutes);
      this.dataform.profile.startTime = startDate.toISOString(); // Convertendo para formato ISO
    }

    if (this.dataform.profile.endTime) {
      const endHours = parseInt(this.dataform.profile.endTime.split(':')[0]);
      const endMinutes = parseInt(this.dataform.profile.endTime.split(':')[1]);
      const today = new Date();
      let endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endHours, endMinutes);
      this.dataform.profile.endTime = endDate.toISOString(); // Convertendo para formato ISO
    }

    if (this.dataform.profile.startTime && this.dataform.profile.endTime) {
      // Verificando se a hora de término é antes da hora de início e ajustando para o próximo dia, se necessário
      const startDate = new Date(this.dataform.profile.startTime);
      const endDate = new Date(this.dataform.profile.endTime);
      if (endDate < startDate) {
        endDate.setDate(endDate.getDate() + 1);
        this.dataform.profile.endTime = endDate.toISOString(); // Atualizando endTime no formato ISO
      }
    }
    const response = await axios.put('http://localhost:3000/api/users/currentuser', this.dataform, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    this.$emit('closeForm');
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
},


    closeForm() {
      this.$emit('closeForm');
    },
},
};
</script>

<style scoped>
.edit-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with 50% opacity */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Set a high z-index value */
}

.edit-form-container {
  background-color: rgb(230, 230, 230); /* White background for the form container */
  padding: 0 20px 20px 20px;
  width: 360px;
  border-radius: 10px;
  color: black;
  position: relative;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: flex;
  max-height: 50vh;
  flex-direction: column;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2em;
  background: none;
  color: white;
  border: none;
  cursor: pointer;
}
.top{
  background-color: #481222;
  color : white;
  text-align: center;
  justify-content:center;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 10px 10px 0 0;
  width: 360px;
  height: 70px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}


input, textarea {
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  color: black;
  fill: white;
  border: none;
  width: 100%;
  background-color: rgb(255, 255, 255);
  border: 2px solid white;
}
::placeholder {
  color: black;
}
input[type="file"] {
  display: none;
}

input[type="file"] {
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  color: white;
  fill: white;
  border: none;
  width: 100%;
  background-color: #481222;
  border: 2px solid white;
}

.custom-file-upload, .submit{
  padding: 10px;
  border-radius: 10px;
  background-color: #481222;
  color:white;
  font-size: 1em;
  cursor: pointer;
  text-align: center;
  margin: 10px auto;
  width: 200px;
  direction: ltr;
  border: none;
}

.form-inputs {
  width: 360px;
  max-height: 40vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 20px;
}

/* Style the label to mimic a button */
.custom-file-upload:hover {
  background-color: rgb(65, 65, 65);
}

/* Scrollbar Track */
.form-inputs::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Color of the track */
}

/* Scrollbar Handle */
.form-inputs::-webkit-scrollbar-thumb {
  background-color: red; /* Color of the handle (set to red) */
  border-radius: 5px; /* Roundness of the handle */
}

/* Change scrollbar handle on hover */
.form-inputs::-webkit-scrollbar-thumb:hover {
  background-color: #cc0000; /* Color of the handle on hover */
}
.campo{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

</style>
