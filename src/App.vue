<!-- defining the template of the page.  -->
<!-- passing in loggedIn varibale to child components -->
<!-- darktheme button carried across to other components. -->
<template>
  <div>
    <NavBar :loggedIn="loggedIn" v-on:logout="setLoggedOut"/>
    <b-container>
    <router-view :loggedIn="loggedIn" v-on:login="setLoggedIn" />
  </b-container>

  <b-button class="float-right" pill variant="outline-primary" @click="darkThemeSwitch">Switch Theme</b-button>


  </div>


</template>

<!-- line 23: importing NavBar child component and defining under components-->
<!-- line 32: loggedIn boolean passed in as false. Communicates to other components unless variable is changed -->
<!-- line 35 onwards: storing the token when loggedIn boolean is set to true and writing to the console. -->
<!-- line 44 onwards: methods where we store what processes we want carried out after listening for an action. -->
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
      //stores  the token in localStorage
    },
    setLoggedOut(){
      this.loggedOut = false;
      //triggers log out process
    },
    //adding darktheme to allow for theme to switch when user clicks button.
    //when button is clicked once, darktheme is added using styles from the darktheme.css stylesheet
    //when button is clicked again, dark theme is removed
    //dark them switch creates an if else statement on if the button is clicked carry out _addDarkTheme function, else carry out _removeDarkTheme. By default site starts with no darktheme.
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
