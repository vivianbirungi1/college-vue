<template>
  <div>

    <!-- home styling element used to center text and animation applied on text using AOS library -->
    <div class="home">
      <h1 data-aos="zoom-in">  Lecturers </h1>
    </div>

    <hr class="show">

<!-- button for Adding a lecturer -->
    <router-link :to="{ name: 'lecturers_create'}"><b-button class="float-right" pill variant="warning">Add a Lecturer</b-button></router-link>

<!-- search bar which listens for searchLecturer method as user types -->
    <br>
    <input class="border" type="text" placeholder="Search" v-model="term" />
    <span @click="searchLecturer()"></span>

    <br><br>

    <!-- table created using bootstrap table -->
    <!-- filteredLecturers array passed into items. -->
    <!-- isBusy triggers loading circle from Bootstrap -->
    <!-- actions cell containing edit and view icons to re-route to relevant pages. delete method not used here, rather used in Show -->
    <b-table class="darktheme" striped hover :items="filteredLecturers" :fields="fields" :busy="isBusy">
      <template #table-busy>
        <div class="text-center">
          <b-spinner class="align-middle m-5" style="width: 4rem; height: 4rem;" variant="danger"></b-spinner>
        </div>
      </template>

      <template #cell(actions)="data">
        <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}"><b-button class="float-right" pill variant="outline-primary"><i class="fas fa-eye"></i></b-button></router-link>
        <router-link :to="{ name: 'lecturers_edit', params: { id: data.item.id }}"><b-button class="float-right" pill variant="outline-warning"><i class="fas fa-edit"></i></b-button></router-link>
      </template>
    </b-table>

  </div>
</template>


<!-- fields defined in data. Sortable added to fields to allow user to sort by clicking arrows. -->
<!-- name and email are sortable fields -->
<!-- lecturers array passed in and filteredLecturers array passed in -->
<!-- isBusy set to false if tabls has loaded. otherwise is true and spinner circle displays -->
<!-- checking for term entered in search bar to filter through lecturers -->
<!-- within created we run an if statement, if user is loggedin, then display methods other re-route to home as they are not authenticated to view data. -->
<!-- deleteCourse method attempt unsuccessful, implemented within Show -->
<!-- searchLecturer goes through filteredLecturers and returns the lecturers matching the term inserted. Can be lower or upper case. Currenlty user can search through name,address,phone,email -->
<!-- getLecturer method used with get request retrieving lecturers from the API -->
<script>
import axios from 'axios';
export default {
  name: 'LecturersIndex',
  components: {

  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return{
      fields: [
    {
      key: 'name',
      sortable: true,
    },
    'address',
    'phone',
    {
      key: 'email',
      sortable: true,
    },
    'actions'
  ],
      lecturers: [],
      term: "",
      filteredLecturers: [],
      isBusy: false
    }
  },
  watch: {
    term: function () {
    //  console.log('New: ', newTerm);
    //  console.log('Old: ', oldTerm);
      this.searchLecturer();
    }
  },
  created(){
  //  console.log("testing")
    if(this.loggedIn){
    this.getLecturers();
  }
  else{
    this.$router.push({name: 'home'});
  }
  },
  methods:{
    searchLecturer(){
      this.filteredLecturers = this.lecturers.filter(lecturer => {
      if(lecturer.name.toLowerCase().includes(this.term.toLowerCase())){
        return true
      }

      if(lecturer.address.toLowerCase().includes(this.term.toLowerCase())){
        return true
      }

      if(lecturer.phone.toLowerCase().includes(this.term.toLowerCase())){
        return true
      }

      if(lecturer.email.toLowerCase().includes(this.term.toLowerCase())){
        return true
      }

      });
    },
    getLecturers(){
      let token = localStorage.getItem('token');
      this.isBusy = true;

      axios.get('https://college-api-viv.herokuapp.com/api/lecturers', {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.lecturers = response.data.data;
        this.filteredLecturers = this.lecturers;
        this.isBusy = false;
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
