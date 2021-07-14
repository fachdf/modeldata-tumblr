import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Beranda from '../views/Beranda.vue'
import SignUp from '../components/SignUp.vue'
import EditProfile from '../components/EditProfile.vue'
import Explore from '../components/Explore.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/beranda',
    name: 'Beranda',
    component: Beranda
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: SignUp
  },
  { 
    path: '/profile/:username',
    name: 'Profile',
    component: Profile 
  },
  {
    path: '/sunting-profile',
    name: 'Edit Profile',
    component : EditProfile
  },
  {
    path: '/explore',
    name: 'Explore',
    component : Explore
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
