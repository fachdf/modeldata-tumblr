<template>
  <div div align="center" 
      class="home" style="margin-top:2rem;">
      <h1 class="white--text display-2" ><b>Sunting Profile</b></h1>
      <v-row align="center"
      justify="center" style="width: 800px; align:center;">
      <v-col class="white--text" style="margin-top:3rem;"><p>Nama</p></v-col>
      <v-col >
      <v-text-field 
        solo
        hide-details
        style="width:300px;margin-top:2rem;"
        placeholder="Nama"
        label="Nama"
        v-model="nama"
      ></v-text-field>
      </v-col>
      <v-col>
          <v-btn @click="changeNama()" style="width:100px;margin-top:2rem;" color="blue lighten-2" >Change</v-btn>
      </v-col>
      </v-row>
      <v-row align="center"
      justify="center" style="width: 800px; align:center;">
      <v-col class="white--text" style="margin-top:3rem;"><p>Email</p></v-col>
      <v-col >
      <v-text-field 
        solo
        hide-details
        style="width:300px;margin-top:2rem;"
        placeholder="Email"
        label="Email"
        v-model="email"
      ></v-text-field>
      </v-col>
      <v-col>
          <v-btn @click="changeEmail()" style="width:100px;margin-top:2rem;" color="blue lighten-2" >Change</v-btn>
      </v-col>
      </v-row>
      <v-row align="center"
      justify="center" style="width: 800px; align:center;">
      <v-col class="white--text" style="margin-top:3rem;">
          <p>Password</p>
      </v-col>
      <v-col >
        <v-text-field 
            solo
            hide-details
            style="width:300px;margin-top:2rem;"
            placeholder="Password"
            label="Password"
            v-model="password"
        ></v-text-field>
      </v-col>
      <v-col>
          <v-btn @click="changePassword()" style="width:100px;margin-top:2rem;" color="blue lighten-2" >Change</v-btn>
      </v-col>
      </v-row>
      <v-row align="center"
      justify="center" style="width: 800px; align:center;">
      <v-col class="white--text" style="margin-top:3rem;">
          <p>Bio</p>
      </v-col>
      <v-col >
        <v-text-field 
            solo
            hide-details
            style="width:300px;margin-top:2rem;"
            placeholder="Bio"
            label="Bio"
            v-model="bio"
        ></v-text-field>
      </v-col>
      <v-col>
          <v-btn  style="width:100px;margin-top:2rem;" color="blue lighten-2" @click="changeBio()" >Change</v-btn>
      </v-col>
      </v-row>
      <v-row align="center"
      justify="center" style="width: 800px; align:center;">
      <v-col class="white--text" style="margin-top:3rem;">
          <p>Nama Blog</p>
      </v-col>
      <v-col >
        <v-text-field 
            solo
            hide-details
            style="width:300px;margin-top:2rem;"
            placeholder="Nama Blog"
            label="Nama Blog"
            v-model="nama_blog"
        ></v-text-field>
      </v-col>
      <v-col>
          <v-btn  style="width:100px;margin-top:2rem;" color="blue lighten-2" @change="changeNamaBlog()">Change</v-btn>
      </v-col>
      </v-row>
      <v-btn  style="width:150px;margin-top:2rem;" color="red" @click="deleteUser()" >Delete User</v-btn>
  </div>
</template>

<script>
import User from '../repository/interactor/user'

export default({
  data() {
    return {
      nama : "",
      email :  "",
      password : "",
      bio : "",
      nama_blog : "",
      session_user : ""
    }
  },
  methods : {
    changeNama(){
      User.updateNamaUser(this.session_user._id, this.nama)
      .then((result)=>{
        console.log(result)
      })

    },
    changeEmail(){
      User.updateEmailUser(this.session_user._id, this.email)
      .then((result)=>{
        console.log(result)
      })
    },
    changePassword(){
      User.updatePasswordUser(this.session_user._id, this.password)
      .then((result)=>{
        console.log(result)
      })
    },
    changeBio(){
      User.updateBioUser(this.session_user._id, this.bio)
      .then((result)=>{
        console.log(result)
      })
    },
    changeNamaBlog(){
      User.updateBlogNameUser(this.session_user._id, this.nama_blog)
      .then((result)=>{
        console.log(result)
      })
    },
    deleteUser(){
      User.deleteUser(this.session_user._id)
      .then((result)=>{
        console.log(result)
      })
      localStorage.clear();
      localStorage.setItem('logged', 'false');
      this.$router.push({ path: "/" });
    },
    getSessionUser(){
          
          User.getSessionUser({ headers: { token: localStorage.getItem('token')}}).then(res => {
            this.session_user = res.user;
            console.log(this.session_user)
            
          })
        }
  },
  mounted(){
      this.getSessionUser();
    }
})
</script>

