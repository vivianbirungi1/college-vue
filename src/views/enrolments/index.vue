<template>
  <div>

    <!-- home styling element used to center text and animation applied on text using AOS library -->
    <div class="home">
      <h1 data-aos="zoom-in">  Enrolments </h1>
    </div>

    <hr class="show">

<!-- button for Adding a enrolment -->
    <router-link :to="{ name: 'enrolments_create'}"><b-button class="float-right" pill variant="warning">Add an Enrolment</b-button></router-link>

    <br>
<!-- search bar which listens for searchEnrolment method as user types -->
    <input class="border" type="text" placeholder="Search" v-model="term" />
    <span @click="searchEnrolment()"></span>


    <!-- table created using bootstrap table -->
    <!-- filteredEnrolments array passed into items. -->
    <!-- isBusy triggers loading circle from Bootstrap -->
    <!-- actions cell containing edit and view icons to re-route to relevant pages. delete method not used here, rather used in Show -->
    <br><br>
    <b-table class="darktheme" striped hover :items="filteredEnrolments" :fields="fields" :busy="isBusy">
      <template #table-busy>
        <div class="text-center">
          <b-spinner class="align-middle m-5" style="width: 4rem; height: 4rem;" variant="danger"></b-spinner>
        </div>
      </template>

      <template #cell(actions)="data">
        <router-link :to="{ name: 'enrolments_show', params: { id: data.item.id }}"><b-button class="float-right" pill variant="outline-primary"><i class="fas fa-eye"></i></b-button></router-link>
        <router-link :to="{ name: 'enrolments_edit', params: { id: data.item.id }}"><b-button class="float-right" pill variant="outline-warning"><i class="fas fa-edit"></i></b-button></router-link>
      </template>
    </b-table>

  </div>
</template>


<!-- fields defined in data. Sortable added to fields to allow user to sort by clicking arrows. -->
<!-- date and time are sortable fields -->
<!-- enrolments array passed in and filteredEnrolments array passed in -->
<!-- isBusy set to false if tabls has loaded. otherwise is true and spinner circle displays -->
<!-- checking for term entered in search bar to filter through enrolments -->
<!-- within created we run an if statement, if user is loggedin, then display methods other re-route to home as they are not authenticated to view data. -->
<!-- deleteCourse method attempt unsuccessful, implemented within Show -->
<!-- searchEnrolment goes through filteredEnrolments and returns the enrolment matching the term inserted. Can be lower or upper case. Currenlty user can search through enrolments date and time -->
<!-- getEnrolment method used with get request retrieving enrolments from the API -->
<script>
import axios from 'axios';
export default {
  name: 'EnrolmentsIndex',
  components: {

  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return{
      fields: [
    {
      key: 'date',
      sortable: true,
    },
    {
      key: 'time',
      sortable: true,
    },
    'actions'
  ],
      enrolments: [],
      term: "",
      filteredEnrolments: [],
      isBusy: false
    }
  },
  watch: {
    term: function () {
      this.searchEnrolment();
    }
  },
  created(){
  //  console.log("testing")
    if(this.loggedIn){
    this.getEnrolments();
  }
  else{
    this.$router.push({name: 'home'});
  }
  },
  methods:{
    searchEnrolment(){
      this.filteredEnrolments = this.enrolments.filter(enrolment => {
      if(enrolment.date.toLowerCase().includes(this.term.toLowerCase())){
        return true
      }

      if(enrolment.time.toLowerCase().includes(this.term.toLowerCase())){
        return true
      }

      });
    },
    getEnrolments(){
      let token = localStorage.getItem('token');
      this.isBusy = true;

      axios.get('https://college-api-viv.herokuapp.com/api/enrolments', {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.enrolments = response.data.data;
        this.filteredEnrolments = this.enrolments;
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
