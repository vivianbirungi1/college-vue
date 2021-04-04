<template>
  <div>
    This is the Courses Index page

    <br>

    <!-- <button @click="getCourses()">Get Courses</button>

    <button @click="logout()">Logout</button> -->

    <router-link :to="{ name: 'courses_create'}">Create</router-link>

    <br>
    <input type="text" v-model="term" />
    <b-button @click="searchCourse()">Search</b-button>

    <br><br>
    <!-- {{ courses[0].title}} -->
    <b-table striped hover :items="filteredCourses" :fields="fields">
      <template #cell(title)="data">
        <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{data.item.title }}</router-link>
      </template>
      <template #cell(actions)="data">
        <router-link :to="{ name: 'courses_edit', params: { id: data.item.id }}">edit</router-link>
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
    },
    'actions'
  ],
      courses: [],
      term: "",
      filteredCourses: []
    }
  },
  watch: {
    term: function () {
    //  console.log('New: ', newTerm);
    //  console.log('Old: ', oldTerm);
      this.searchCourse();
    }
  },
  created(){
  //  console.log("testing")
    if(this.loggedIn){
    this.getCourses();
  }
  else{
    this.$router.push({name: 'home'});
  }
  },
  methods:{
    searchCourse(){
      this.filteredCourses = this.courses.filter(course => {
      if(course.title.toLowerCase().includes(this.term.toLowerCase())){
        return true
      }

      if(course.code.toLowerCase().includes(this.term.toLowerCase())){
        return true
      }

      // if(course.points.toLowerCase().includes(this.term.toLowerCase())){
      //   return true
      // }
      //
      // if(course.level.toLowerCase().includes(this.term.toLowerCase())){
      //   return true
      // }
      });
    },
    getCourses(){
      let token = localStorage.getItem('token');
      axios.get('https://college-api-viv.herokuapp.com/api/courses', {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.courses = response.data.data;
        this.filteredCourses = this.courses;
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
