<template>
  <div>
  

    <router-link :to="{ name: 'enrolments_create'}"><b-button class="float-right" pill variant="warning">Add an Enrolment</b-button></router-link>

    <br>
    <input type="text" v-model="term" />
    <b-button @click="searchEnrolment()">Search</b-button>

    <br><br>
    <b-table striped hover :items="filteredEnrolments" :fields="fields" :busy="isBusy">
      <template #table-busy>
        <div class="text-center">
          <b-spinner class="align-middle m-5" style="width: 4rem; height: 4rem;" variant="danger"></b-spinner>
        </div>
      </template>

      <template #cell(actions)="data">
        <router-link :to="{ name: 'enrolments_show', params: { id: data.item.id }}"><b-button class="float-right" pill variant="outline-primary">&#128065;</b-button></router-link>
        <router-link :to="{ name: 'enrolments_edit', params: { id: data.item.id }}"><b-button class="float-right" pill variant="outline-warning">&#128394;</b-button></router-link>
      </template>
    </b-table>

  </div>
</template>

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
