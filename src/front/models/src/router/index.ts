import { createRouter, createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import PartnerLogin from '../views/PartnerLogin.vue'
import PartnerSignUp from '../views/PartnerSignUp.vue'
import Confirmation from '../views/Confirmation.vue'
import Home from '../views/Home.vue'

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
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes // Pass the defined routes to the router
})

export default router // Export the router instance
