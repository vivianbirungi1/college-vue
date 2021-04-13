<template>
  <div>
  


    <router-link :to="{ name: 'lecturers_create'}"><b-button class="float-right" pill variant="warning">Add a Lecturer</b-button></router-link>

    <br>
    <input type="text" v-model="term" />
    <b-button @click="searchLecturer()">Search</b-button>

    <br><br>

    <b-table striped hover :items="filteredLecturers" :fields="fields" :busy="isBusy">
      <template #table-busy>
        <div class="text-center">
          <b-spinner class="align-middle m-5" style="width: 4rem; height: 4rem;" variant="danger"></b-spinner>
        </div>
      </template>

      <template #cell(actions)="data">
        <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}"><b-button class="float-right" pill variant="outline-primary">&#128065;</b-button></router-link>
        <router-link :to="{ name: 'lecturers_edit', params: { id: data.item.id }}"><b-button class="float-right" pill variant="outline-warning">&#128394;</b-button></router-link>
      </template>
    </b-table>

  </div>
</template>

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
