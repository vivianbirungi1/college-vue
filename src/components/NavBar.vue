<template>
  <!-- <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item :to="{name: 'courses_index'}">Courses</b-nav-item>

        <b-nav-item to="/" right>Login</b-nav-item>
        <b-nav-item to="/" right>Register</b-nav-item>


      </b-navbar-nav>
    </b-navbar>
  </div> -->

  <div>
  <b-navbar toggleable="lg" type="light" variant="warning">
    <b-navbar-brand to="/">CollegeVue</b-navbar-brand>

    <b-navbar-nav>
    <b-nav-item to="/">Home</b-nav-item>
  </b-navbar-nav>

      <b-navbar-nav v-if="loggedIn">
        <b-nav-item :to="{ name: 'courses_index' }">Courses</b-nav-item>
        <b-nav-item :to="{ name: 'enrolments_index' }">Enrolments</b-nav-item>
        <b-nav-item :to="{ name: 'lecturers_index' }">Lecturers</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-if="loggedIn" class="ml-auto">
          <b-nav-item @click="logout()" right>Logout</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav v-else class="ml-auto">

        <b-nav-item to="/login" right>Login</b-nav-item>
        <b-nav-item to="/register" right>Register</b-nav-item>

      </b-navbar-nav>
  </b-navbar>
</div>

</template>

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
