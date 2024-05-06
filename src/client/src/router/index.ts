import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import PartnerLogin from '../views/PartnerLogin.vue';
import PartnerSignUp from '../views/PartnerSignUp.vue';
import Confirmation from '../views/Confirmation.vue';
import Profile from '../views/Profile.vue'; // Importe o componente de perfil
import Jobs from '../views/Jobs.vue';
import pinia from "@/store.js";
import { useUserFilterStore } from '@/stores/userFilter';
import Home from "@/views/Home.vue";
import ConfirmationClient from '@/views/ConfirmationClient.vue';
import FourZeroFour from '@/views/FourZeroFour.vue';
// Define routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/partnersignup',
    name: 'PartnerSignUp',
    component: PartnerSignUp
  },
  {
    path: '/partnerlogin',
    name: 'PartnerLogin',
    component: PartnerLogin
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: Confirmation
  },
  {
    path: '/confirmationclient',
    name: 'ConfirmationClient',
    component: ConfirmationClient
  },
  {
    path: '/profile/:id', // Adicione um segmento dinâmico para o ID do perfil
    name: 'Profile',
    component: Profile,
    props: true
  },
  {
    path: '/job',
    name: 'Jobs', // Corrected the name to 'Jobs'
    component: Jobs,
    beforeEnter: () =>{
      const userFilterStore = useUserFilterStore(pinia);
    }
  }
  ,
  {
    path: '/404',
    name: 'FourZeroFour',
    component: FourZeroFour
  }
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes // Pass the defined routes to the router
});

export default router; // Export the router instance
