<template>
  <div>
    <NavBar :loggedIn="loggedIn" v-on:logout="setLoggedOut"/>
    <b-container>
    <router-view :loggedIn="loggedIn" v-on:login="setLoggedIn" />
  </b-container>

  <b-button class="float-right" pill variant="outline-primary" @click="darkThemeSwitch">Switch Theme</b-button>


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
      loggedIn: false,
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
    },

    _addDarkTheme() {
      let darkThemeLinkEl = document.createElement("link");
      darkThemeLinkEl.setAttribute("rel", "stylesheet");
      darkThemeLinkEl.setAttribute("href", "/css/darktheme.css");
      darkThemeLinkEl.setAttribute("id", "dark-theme-style");

      let docHead = document.querySelector("head");
      docHead.append(darkThemeLinkEl);
    },
    _removeDarkTheme() {
      let darkThemeLinkEl = document.querySelector("#dark-theme-style");
      let parentNode = darkThemeLinkEl.parentNode;
      parentNode.removeChild(darkThemeLinkEl);
    },
    darkThemeSwitch() {
      let darkThemeLinkEl = document.querySelector("#dark-theme-style");
      if (!darkThemeLinkEl) {
        this._addDarkTheme()
      } else {
        this._removeDarkTheme()
      }
    }

  }
}
</script>

<style>

</style>
