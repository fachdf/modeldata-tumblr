<template>
 <v-container>
  <v-row align="center"
      justify="center" >
      <v-col style="width: 500px; align:center;">
        <v-card
     elevation="2"
     outlined
     

   >
    <v-card-title>What's on your mind {{ session_user.username }} ?</v-card-title>
    <v-textarea solo color="teal" style="margin:1rem;" v-model="caption">
      <template v-slot:label >
        <div>Share your thought!</div>
      </template>
    </v-textarea>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue white--text" depressed
               @click="postPostingan()"
               >Post</v-btn>
      </v-card-actions>
        </v-card>
        
      </v-col>
      <v-col style="width: 500px; align:center;">
      </v-col>
  </v-row>

  <v-row align="center"
      justify="center" v-for="(item,index) in this.postingan" :key="index">
      <v-col style="width: 500px; align:center;">
         <v-card elevation="2"
         outlined
         style="margin-top:1rem;"
         
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
        
      </v-col>
      <v-col style="width: 500px; align:center;">
        
      </v-col>
  </v-row>
 </v-container>
</template>

<script>
import Postingan from '../repository/interactor/postingan'
import Respon from '../repository/interactor/respon'
import User from '../repository/interactor/user'
import Beranda from '../repository/interactor/beranda'
import Comment from '../repository/interactor/comment'
export default {
  
    data() {
        return {
            postingan : [],
            username : "",
            caption : "",
            data : {},
            user : "",
            postinganIDs :[],
            comment_caption : "",
            session_user : ""
            
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
        postPostingan () {
          this.data.caption = this.caption;
          this.data.username = this.session_user; 
          Postingan.createPostingan(this.data)
            .then(response => {
              console.log(response.message)
            })
            .catch( e => {
              console.log(e)
            })
          this.getAllPostingan();
        },

        getBerandaPostingan(){
          for(let i = 0 ; i < this.postingan.length ; i ++){
            Postingan.getPostinganById(this.postinganIDs[i])
            .then((result)=>{
              this.postingan.unshift(result)
            })
          }
          console.log(this.postingan)
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
          //var token = localStorage.getItem('token')
          User.getSessionUser({ headers: { token: localStorage.getItem('token')}}).then(res => {
            this.session_user = res.user;
           Beranda.fetchPost(this.session_user.username).then(()=>{
            Beranda.getBerandaByID(this.session_user.beranda)
            .then((response)=>{
              //console.log(response.data.postingan)
              this.postinganIDs = response.data.postingan
              console.log(this.postinganIDs)
              for(let i = 0 ; i < this.postinganIDs.length ; i ++){
              Postingan.getPostinganById(this.postinganIDs[i])
              .then((result)=>{
                this.postingan.unshift(result)
              // console.log(result)
                  })
                }
              console.log(this.postingan)
              })
           })
           
          })
        },
        postComment(postID){
          var data = {}
          data.postID = postID
          data.comment = {}
          data.comment.username = this.session_user.username
          data.comment.komentar = this.comment_caption
          Comment.createComment(data)
          .then(()=>{
            console.log("Comment created")
          })
        }
    },
    
    beforeMount(){
      this.getSessionUser();
      
      
    },
    mounted(){
      //this.getBerandaPostingan();
    }
    
}
</script>
