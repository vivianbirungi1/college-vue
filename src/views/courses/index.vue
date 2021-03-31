<template>
  <div>
    This is the Courses Index page

    <br>

    <!-- <button @click="getCourses()">Get Courses</button>

    <button @click="logout()">Logout</button> -->

    <router-link :to="{ name: 'courses_create'}">Create</router-link>

    <br><br>
    <!-- {{ courses[0].title}} -->
    <b-table striped hover :items="courses" :fields="fields">
      <template #cell(title)="data">
        <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{data.item.title }}</router-link>
      </template>
    </b-table>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CoursesIndex',
  components: {

  },
  props: {
    loggedIn: Boolean
  },
  data() {
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
  },
  created(){
    console.log("testing")
    if(this.loggedIn){
    this.getCourses();
  }
  else{
    this.$router.push({name: 'home'});
  }
  },
  methods:{
    getCourses(){
      let token = localStorage.getItem('token');
      axios.get('https://college-api-viv.herokuapp.com/api/courses', {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.courses = response.data.data;
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },
    logout(){
      let token = localStorage.getItem('token');

      axios.get('https://college-api-viv.herokuapp.com/api/logout', {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        console.log("LOGGED OUT");
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
.home{
  text-align: center;
}
</style>
