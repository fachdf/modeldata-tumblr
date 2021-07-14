<template >
 <div align="center" 
      class="home">
 <!--<SignUp/>-->
 <Login/>
     
 </div>
</template>

<script>
//import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
export default {
    name: 'App',
    components:{ Login},
    data() {
        return {
            postingan : [],
            username : "",
            caption : "",
            data : {}
        }
    }
    
}

</script>

<style>

</style>