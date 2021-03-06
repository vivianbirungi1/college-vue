<template>
  <div>
    <NavBar :loggedIn="loggedIn" v-on:logout="setLoggedOut"/>
    <b-container>
    <router-view :loggedIn="loggedIn" v-on:login="setLoggedIn" />
  </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data(){
    return{
      loggedIn: false
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.loggedIn = true;
      console.log("APP: ",this.loggedIn);
    }
    else{
      this.loggedIn = false;
    }
  },
  methods:{
    setLoggedIn(){
      this.loggedIn = true;
      //can store  the token in localStorage
    },
    setLoggedOut(){
      this.loggedOut = false;
      //can trigger log out process here
    }
  }
}
</script>

<style>

</style>
