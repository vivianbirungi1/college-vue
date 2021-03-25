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
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">CollegeVue</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item v-if="loggedIn" :to="{ name: 'courses_index' }">Courses</b-nav-item>
        <b-nav-item v-if="loggedIn" :to="{ name: 'enrolments_index' }">Enrolments</b-nav-item>
        <b-nav-item v-if="loggedIn" :to="{ name: 'lecturers_index' }">Lecturers</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item to="/login" right>Login</b-nav-item>
        <b-nav-item to="/register" right>Register</b-nav-item>

        <b-nav-item v-if="loggedIn" @click="logout()" right>Logout</b-nav-item>

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
  methods:{
    logout(){
      let token = localStorage.getItem('token');

      axios.get('http://college.api:8000/api/logout', {
        headers: {Authorization: "Bearer" + token}
      })
      .then(response => {
        console.log(response.data);
        this.$emit('logout');
        this.$router.push({ name: 'home' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })

      localStorage.removeItem('token');
    }
  },
  data(){
    return{
      fields: [
        {
          key: 'title',
          sortable: true,
        },
        'code',
        'points',
        {
          key: 'level',
          sortable: true,
        }
      ],
      courses: []
    }
  }

}
</script>

<style>
.navbar{
  margin-bottom: 40px;
}

</style>
