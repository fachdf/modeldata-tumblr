<template>
 <nav>
    <v-toolbar color="#001935" height="50px">
     <v-toolbar-title class="text-uppercase grey--text">
      <v-btn @click="toHome()" color="transparent" ><v-img
          :src="require('../assets/logo.png')"
          width = "30"
          height = "40"
          
        />
      </v-btn>
     </v-toolbar-title>
     <div class="search">
     <v-text-field 
        solo
        hide-details
        prepend-inner-icon="mdi-magnify"
        v-model="value"
        dense
        @change="retrieveUser()"
        @keydown.native.enter="toProfile()"
      ></v-text-field>
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="toBeranda()">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon dark @click="Explore()">
        <v-icon>mdi-compass-outline</v-icon>
      </v-btn>
     <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          
          dark
          v-bind="attrs"
          v-on="on"
          @click="fetchNotifikasi()"
        >
          <v-icon>mdi-lightning-bolt</v-icon>
        </v-btn>
      </template>
      <v-list >
        <v-list-item
          v-for="(item,index) in this.notifikasi" :key="index">
          <v-list-item-title>{{item.keterangan}}</v-list-item-title>
        </v-list-item>
        <v-list-item
          link color="#FFFFFF">
          <v-list-item-title @click="deleteUserNotification()">Hapus Semua</v-list-item-title>
        </v-list-item>
      </v-list>
      
    </v-menu>
     <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          link @click="toProfile()">
          <v-list-item-title>My Profile</v-list-item-title>
        </v-list-item>

        <v-list-item
          link @click="EditProfile()">
          <v-list-item-title>Edit Profile</v-list-item-title>
        </v-list-item>

        <v-list-item
          link @click="Logout()">
          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-toolbar>

 </nav>
</template>

<script>
import User from '../repository/interactor/user'
import Notifikasi from '../repository/interactor/notifikasi'
export default {
  
    data() {
        return {
            value : [],
            user : [],
            logged : false,
            notifikasi : []
        }
    },
    methods : {
      deleteUserNotification(){
        Notifikasi.deleteUserNotification(this.user)
        .then((result)=>{
          console.log(result)
          this.notifikasi = []
        })
      },
      fetchNotifikasi(){
        Notifikasi.getUserNotification(this.user)
        .then((result)=>{
          console.log(result)
          this.notifikasi = result
        })
      },
        retrieveUser(){
          //
          User.getUserByUsername(this.value)
          .then((response) => {
            if(typeof response[0] !== "undefined"){
              this.user = response[0];
              console.log(this.user)
            }
          })
          .catch((err) => {
            console.log(err);
          });
        },
        toProfile(){
          if(localStorage.getItem('logged') === 'false'){
            this.$router.push({ path: "/" });
          }else{
              this.$router.push({ path: `/profile/${this.user}` });
          }
        },
        toBeranda(){
          
          if(localStorage.getItem('logged') === 'false'){
            this.$router.push({ path: "/" });
          }else{
            this.$router.push({ path: "/beranda" });
          }
          

        },
        toHome(){
          if(localStorage.getItem('logged') === 'false'){
            this.$router.push({ path: "/" });
          }else{
            this.$router.push({ path: "/beranda" });
          }
        },
        Logout(){
          localStorage.clear();
          localStorage.setItem('logged', 'false');
          this.$router.push({ path: "/" });
        },
        EditProfile(){
          if(localStorage.getItem('logged') === 'false'){
            this.$router.push({ path: "/" });
          }else{
            this.$router.push({ path: "/sunting-profile" });
          }
        },
        Explore(){
          if(localStorage.getItem('logged') === 'false'){
            this.$router.push({ path: "/" });
          }else{
            this.$router.push({ path: "/explore" });
          }
        },

        getSessionUser(){
          //var token = localStorage.getItem('token')
          User.getSessionUser({ headers: { token: localStorage.getItem('token')}}).then(res => {
            this.user = res.user.username;
            this.email = res.user.email;
          })
        }
    },
    mounted(){
      this.getSessionUser();
    }
    
}
</script>

<style >
 .search{
   margin-left: 2rem;
   width: 500px;
 }
</style>