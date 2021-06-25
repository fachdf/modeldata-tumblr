<template>
 <v-container>
   <v-card
     elevation="2"
     outlined
     style="width: 500px;margin-left:2rem;"
     
   >
    <v-card-title>What's on your mind?</v-card-title>
    <v-text-field 
        solo
        hide-details
        style="width: 150px;margin:1rem;"
        v-model="username"
      ><template v-slot:label>
        <div>username</div>
      </template></v-text-field>
    <v-textarea solo color="teal" style="margin:1rem;">
      <template v-slot:label>
        <div>Share your thought!</div>
      </template>
    </v-textarea>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue white--text" depressed
               v-model="caption"
               >Post</v-btn>
      </v-card-actions>
   </v-card>
   <!--<v-text-field 
        solo
        hide-details
        prepend-inner-icon="mdi-magnify"
        style="width: 500px; margin-left: 3rem;"
      ></v-text-field> -->
 </v-container>
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
              this.user = response[0].username;
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
