<template>
 <v-container>

   <v-card elevation="2"
         outlined
         style="margin-top:1rem;"
         v-for="item in this.postingan" :key="item.id"
         width="500px"
         align="left">
            <v-card-title>{{ item.username }}</v-card-title>
            <v-card-text>{{ item.caption }}</v-card-text>
            <v-card-actions>
      
            <v-spacer></v-spacer>
            <v-dialog
        transition="dialog-top-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="blue white--text"
            v-bind="attrs"
            v-on="on"
            @click="getComment()"
          >{{item.jumlah_comment}}<v-spacer></v-spacer><v-icon>mdi-comment</v-icon></v-btn>
        </template>
        <template v-slot:default="dialog">
        <v-card>  <v-toolbar
              color="primary"
              dark
            >Comments</v-toolbar>
            <v-card elevation="2"
                    outlined
                    style="margin-top:1rem;" v-for="komentar in item.comment" :key="komentar.id">
              <v-card-title>{{komentar.username}}</v-card-title>
              <v-card-text>{{komentar.komentar}}</v-card-text>
            </v-card>
        <v-card
     elevation="2"
     outlined
     

   >
    <v-card-title>Comment this post as {{ session_user.username }}.</v-card-title>
    <v-textarea solo color="teal" style="margin:1rem;" v-model="comment_caption">
      <template v-slot:label >
        <div>Comment</div>
      </template>
    </v-textarea>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue white--text" depressed
               @click="postComment(item._id)"
               >Post</v-btn>
      </v-card-actions>
        </v-card>
          <!-- end of comment-->
        <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
            </v-card>
        </template>
      </v-dialog>

      <v-btn class="pink white--text"   depressed
                  @click="likePostingan(item)"
                  >{{item.jumlah_like}} <v-spacer></v-spacer><v-icon>mdi-cards-heart</v-icon></v-btn>
      </v-card-actions>
 </v-card>

 </v-container>
</template>
<script>
import User from '../repository/interactor/user'
import Postingan from '../repository/interactor/postingan'
import Comment from '../repository/interactor/comment'
import Respon from '../repository/interactor/respon'
export default {
    name: 'App',
    components:{},
    data() {
        return {
            postingan : [],
            username : "",
            caption : "",
            data : {},
            session_user : "",
            bio : "",
            blog_name : "",
            jumlah_postingan : "",
            jumlah_diikuti : "",
            jumlah_mengikuti : ""
        }
    },
    methods : {
      iLikedThisPost(likers, myusername){
          for(let i = 0; i< likers.length;i++){
            if(likers[i] == myusername){
              return true;
            }
          }
          return false;
        },
        likePostingan(postingan){
          var responID = postingan.respon
          this.data.postID = postingan._id;
          this.data.username = this.session_user.username;
          Respon.getPostinganLikers(responID)
          .then((likers)=>{
            console.log("likers")
            console.log(likers)
            if(this.iLikedThisPost(likers,this.session_user.username)){
              Respon.deleteLike(this.data)
              .then(()=>{
                console.log("Unlike berhasil")
              })
            }else{
              Respon.likePostingan(this.data)
              .then(()=>{
                console.log("Like berhasil")
              })
            }
          })
        },
        getAllPostingan(){
          this.postingan = [];
          Postingan.getAllPostingan()
          .then((response)=>{
            if(typeof response[0] !== "undefined"){
              for (let i = 0; i < response.length; i++) {
                if(!this.comparer(this.postingan, response[i])){
                  this.postingan.unshift(response[i])
                }
                 //console.log(response[i]._id)
              }
              
            }
          })
        },
        comparer(postingan, respon){
          for (let i = 0; i < postingan.length; i++) {
                   if(postingan[i]._id == respon._id){
                     return true
                   }
                // }
          } 
          return false;
        },
        getComment(){
            for(let i = 0; i < this.postingan.length; i++){
              console.log("masuk get comment")
              Comment.getCommentByResponID(this.postingan[i].respon)
            .then((respon)=>{
              //this.comment = respon.data
              //console.log("this.comment")
              this.postingan[i].comment = respon.data
              console.log("this.postingan[i].comment")
              console.log(this.postingan[i].comment)
            })
            }
            
        },
        getSessionUser(){
          
          User.getSessionUser({ headers: { token: localStorage.getItem('token')}}).then(res => {
            this.session_user = res.user;
            
          })
        }

        
    },
    beforeMount(){
      this.getSessionUser();
     
    },
    mounted(){
      this.getAllPostingan();
    },

    
}

</script>