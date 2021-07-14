<template>
  <div style="margin-top:2rem;">
      <h1 class="white--text display-4" ><b>tumblr</b></h1>
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
      <v-btn  style="width:300px;margin-top:0.5rem;" color="blue lighten-2" @click="login()">Login</v-btn>
      <v-spacer></v-spacer>
      <v-btn  style="width:300px;margin-top:0.5rem;" color="blue lighten-2" @click="SignUp()">Dont Have Account? Sign Up</v-btn>
  </div>
</template>

<script>
import User from '../repository/interactor/user'

export default({
  data() {
    return {
      email : "",
      password : "",
      data : {}
    }
  },
  methods : {
    login(){
      this.data.email = this.email;
      this.data.password = this.password;
      User.userLogin(this.data)
        .then(response=>{
          console.log(response)
          localStorage.setItem('token', response.token);
          localStorage.setItem('logged', 'true');
          this.$router.push({ path: "/beranda" });
        })
        .catch(err=>{
          console.log(err)
        })

      
    },

    SignUp(){
       this.$router.push({ path: "/signup" });
    }
  }
})
</script>

