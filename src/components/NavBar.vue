<template>

<!-- setting up navbar component with nav items -->
<!-- title of navbar set to CollegeVue -->
  <div>
  <b-navbar toggleable="lg" type="light" variant="warning">
    <b-navbar-brand to="/">CollegeVue</b-navbar-brand>

<!-- navbar nav item linking to home, always displays -->
    <b-navbar-nav>
    <b-nav-item to="/">Home</b-nav-item>
  </b-navbar-nav>

<!-- only displays when user is logged in as pages are only accessible by authenticated users using v-if statement -->
      <b-navbar-nav v-if="loggedIn">
        <b-nav-item :to="{ name: 'courses_index' }">Courses</b-nav-item>
        <b-nav-item :to="{ name: 'enrolments_index' }">Enrolments</b-nav-item>
        <b-nav-item :to="{ name: 'lecturers_index' }">Lecturers</b-nav-item>
      </b-navbar-nav>

<!-- displays when user is logged in using v-if statement -->
<!-- when button is clicked, logout method below is executed -->
      <b-navbar-nav v-if="loggedIn" class="ml-auto">
          <b-nav-item @click="logout()" right>Logout</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <!-- displays when user is logged out using v-ele statement -->
      <b-navbar-nav v-else class="ml-auto">

        <b-nav-item to="/login" right>Login</b-nav-item>
        <b-nav-item to="/register" right>Register</b-nav-item>

      </b-navbar-nav>
  </b-navbar>
</div>

</template>


<!-- importung axios from axios -->
<!-- passing in loggedIn varibale to check whether loggedIn method is true or false -->
<!-- passing in form elements in data -->
<!-- logout method sends a get request to the api to allow user to logout -->
<!-- when logged out, a message is written to the console, and page redirects back to login page -->
<!-- when logout successful also token is removed from localStorage so user no longer has access to certain pages i.e courses, enrolmenets, lecturers -->
<script>
import axios from 'axios';

export default{
  name: 'NavBar',
  props: {
    loggedIn: Boolean,
  },
  components:{
  },
  data(){
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods:{
    logout(){
      let token = localStorage.getItem('token');

      axios.get('https://college-api-viv.herokuapp.com/api/logout', {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$emit('logout');
        console.log("Logged Out");
        this.$router.replace({ name: 'login' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })

      localStorage.removeItem('token');
    }
  },

}
</script>

<style>
.navbar{
  margin-bottom: 40px;
}

</style>
