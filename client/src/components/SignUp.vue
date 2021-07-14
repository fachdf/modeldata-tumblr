<template>
  <div style="margin-top:2rem;" align="center" 
      class="home">
      <h1 class="white--text display-4" ><b>tumblr</b></h1>
      <v-text-field 
        solo
        hide-details
        style="width:300px;margin-top:1rem;"
        placeholder="Nama"
        label="Nama"
        v-model="nama"
      ></v-text-field>
      <v-text-field 
        solo
        hide-details
        style="width:300px;margin-top:0.5rem;"
        placeholder="Nama Blog"
        label="Nama Blog"
        v-model="nama_blog"
      ></v-text-field>
      <v-text-field 
        solo
        hide-details
        style="width:300px;margin-top:0.5rem;"
        placeholder="Username"
        label="Username"
        v-model="username"
      ></v-text-field>
      <v-text-field 
        solo
        hide-details
        style="width:300px;margin-top:0.5rem;"
        placeholder="Email"
        label="Email"
        v-model="email"
      ></v-text-field>
      <v-text-field 
        solo
        hide-details
        style="width:300px;margin-top:0.5rem;"
        placeholder="Password"
        label="Password"
        v-model="password"
      ></v-text-field>
      <v-btn  style="width:300px;margin-top:0.5rem;" color="blue lighten-2" @click="createUser()">Sign Up</v-btn>
      <v-spacer></v-spacer>
      <v-btn  style="width:300px;margin-top:0.5rem;" color="blue lighten-2 " @click="Login()">Already have account? Login</v-btn>
  </div>
</template>

<script>
import User from '../repository/interactor/user'

export default({
  data() {
    return {
      username : "",
      nama : "",
      email : "",
      password : "",
      nama_blog: "",
      data : {}
    }
  },
  methods : {
    createUser(){
      this.data.username = this.username;
      this.data.nama = this.nama;
      this.data.email = this.email;
      this.data.password = this.password;
      this.data.nama_blog = this.nama_blog;
      User.createUser(this.data)
        .then(response =>{
          console.log(response.message)
        })
        .catch(err => {
          console.log(err)
        })
       this.$router.push({ path: "/" });
    },
    Login(){
       this.$router.push({ path: "/" });
    }
  }
})
</script>

