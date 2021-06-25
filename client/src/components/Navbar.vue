<template>
 <nav>
    <v-toolbar color="#001935" >
     <v-toolbar-title class="text-uppercase grey--text">
      <v-img
          :src="require('../assets/logo.png')"
          width = "30"
          height = "40"
        />
     </v-toolbar-title>
     <div class="search">
     <v-text-field 
        solo
        hide-details
        prepend-inner-icon="mdi-magnify"
        v-model="value"
        @change="retrieveUser()"
      ></v-text-field>
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn icon dark>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon dark>
        <v-icon>mdi-compass-outline</v-icon>
      </v-btn>

      <v-btn icon dark>
        <v-icon>mdi-email</v-icon>
      </v-btn>

      <v-btn icon dark>
        <v-icon>mdi-chat</v-icon>
      </v-btn>

      <v-btn icon dark>
        <v-icon>mdi-lightning-bolt</v-icon>
      </v-btn>

      <v-btn icon dark>
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </v-toolbar>

 </nav>
</template>

<script>
import User from '../repository/interactor/user'
export default {
  
    data() {
        return {
            value : [],
            user : []
        }
    },
    methods : {
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
        }
    }
    
}
</script>

<style >
 .search{
   margin-left: 2rem;
   width: 500px;
 }
</style>