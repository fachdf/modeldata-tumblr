<template>
 <div align="center">
 <div  align="center">
         
         <v-card width="250px">
           <v-card-title class="text-uppercase justify-center" >{{blog_name}}</v-card-title>
           <v-card-text>{{nama}}</v-card-text>
           </v-card>
         <v-card width="250px" style="margin-top:1rem;">
           <v-card-text>{{bio}}</v-card-text>
           </v-card>
         <v-card width="750px" style="margin-top:1rem;" class="d-flex justify-center mb-6" color="transparent">
             <v-card width="250px" style="margin-top:1rem;">{{jumlah_postingan}} Postingan</v-card>
             <v-card width="250px" style="margin-top:1rem;">{{jumlah_diikuti}} Pengikut, {{jumlah_mengikuti}} Mengikuti</v-card>
             
    
         </v-card> <v-btn class="blue white--text" depressed style="margin-left:2 rem;"
              @click="followUnfollow()"    >Follow</v-btn>
     </div>
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
     
 </div>
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
            jumlah_mengikuti : "",
            comment : [],
            comment_caption : "",
            nama : ""
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
          this.data.username = this.username; 
          Postingan.createPostingan(this.data)
            .then(response => {
              console.log(response.message)
            })
            .catch( e => {
              console.log(e)
            })
        },
        getUserData(){
            User.getUserByUsername(this.$route.params.username)
            .then((response)=>{
              this.bio = response.data.bio
              this.blog_name = response.data.blog_name
              this.nama = response.data.nama
              this.jumlah_postingan = response.data.jumlah_postingan
              this.jumlah_mengikuti = response.data.jumlah_mengikuti
              this.jumlah_diikuti = response.data.jumlah_diikuti
              /* retrieve postingan */
              var postIDs = response.data.postingan
                for (let i = 0; i < postIDs.length; i++) {
                  Postingan.getPostinganById(postIDs[i])
                  .then((resPostingan)=>{
                    //console.log(resPostingan)
                    if(typeof resPostingan !== "undefined"){
                         this.postingan.unshift(resPostingan)
                         
                     //console.log(this.postingan)
                      //console.log(resPostingan)
                    }
                  })
                  
                  
                }
                this.getComment()
                console.log("this.postingan")
                console.log(this.postingan)
              /** done retrieve postingan */
                
              
            })
        },
        getSessionUser(){
          
          User.getSessionUser({ headers: { token: localStorage.getItem('token')}}).then(res => {
            this.session_user = res.user;
            
          })
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
        followUnfollow(){
          var myArray = this.session_user.mengikuti;
          var boolean = false;
          var myUsername = this.session_user.username;
          var targetUsername = this.$route.params.username;
          for (let i = 0 ; i < myArray.length; i ++){
            if(myArray[i] == this.$route.params.username){
              boolean = true;
              console.log(myArray[i])
            }
          }
          if(this.$route.params.username == this.session_user.username){
            console.log("Tdk bisa folow diri sendiri")
          }else if(!boolean){
            //follow
            User.follow(myUsername, targetUsername)
            .then((resPostingan)=>{
              console.log(resPostingan)
            })
           console.log("followed")
          }
          else{
            //unfollow
            User.unfollow(myUsername, targetUsername)
            .then((resPostingan)=>{
              console.log(resPostingan)
            })
            console.log("unfollowed")
          }
          console.log(myUsername)
          console.log(targetUsername)
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
      
     
    },
    mounted(){
      this.getSessionUser();
       this.getUserData();
    },

    
}

</script>