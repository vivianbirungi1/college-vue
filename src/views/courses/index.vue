<template>
  <div>

    <div class="home">
      <h1 data-aos="zoom-in">  Courses </h1>
    </div>

    <hr class="show">


    <router-link :to="{ name: 'courses_create'}"><b-button class="float-right" pill variant="warning">Add a Course</b-button></router-link>

    <br>

    <input class="border" type="text" placeholder="Search" v-model="term" />
    <span @click="searchCourse()"></span>


    <br><br>


    <br>
    <b-table class="darktheme" striped hover :items="filteredCourses" :fields="fields" :busy="isBusy">
      <template #table-busy>
        <div class="text-center">
          <b-spinner class="align-middle m-5" style="width: 4rem; height: 4rem;" variant="danger"></b-spinner>
        </div>
      </template>

      <template #cell(actions)="data">
        <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}"><b-button class="float-right" pill variant="outline-primary"><i class="fas fa-eye"></i></b-button></router-link>
        <router-link :to="{ name: 'courses_edit', params: { id: data.item.id }}"><b-button class="float-right" pill variant="outline-warning"><i class="fas fa-edit"></i></b-button></router-link>
        <!-- <b-button @click="deleteCourse(data.item.id)" class="float-right" pill variant="outline-danger"><i class="fas fa-trash"></i></b-button> -->
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
      lecturers: [],
      term: "",
      filteredCourses: [],
      selectedCourse: "",
      selectedLecturer: "",
      isBusy: false 
    }
  },
  watch: {
    term: function () {
      this.searchCourse();
    }
  },
  created(){
  //  console.log("testing")
    if(this.loggedIn){
    this.getCourses();
    this.getLecturers();
  }
  else{
    this.$router.push({name: 'home'});
  }
  },
  methods:{
    deleteCourse(id){
      let token = localStorage.getItem('token');
      // const course = this.courses.indexOf(id);
      // this.courses.splice(course, 1);

      axios.delete(`https://college-api-viv.herokuapp.com/api/courses/${id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
          console.log(response.data);
          // this.course = response.data.data;
        })
        .catch(error => {
          console.log(error)
          console.log(error.response.data)
        })
    },
    searchCourse(){
      this.filteredCourses = this.courses.filter(course => {
      if(course.title.toLowerCase().includes(this.term.toLowerCase())){
        return true
      }

      if(course.code.toLowerCase().includes(this.term.toLowerCase())){
        return true
      }

      });
    },
    getCourses(){
      let token = localStorage.getItem('token');
      this.isBusy = true;

      axios.get('https://college-api-viv.herokuapp.com/api/courses', {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.courses = response.data.data;
        this.filteredCourses = this.courses;
        this.isBusy = false;
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },

    getLecturers(){
      let token = localStorage.getItem('token');
      axios.get('https://college-api-viv.herokuapp.com/api/lecturers', {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.lecturers = response.data.data;
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

.border{
  border-radius: 30px;
}

</style>
