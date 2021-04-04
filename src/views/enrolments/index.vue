<template>
  <div>
    This is the Enrolments Index page

    <br>

    <router-link :to="{ name: 'enrolments_create'}">Create</router-link>

    <br><br>
    <b-table striped hover :items="enrolments" :fields="fields">
      <template #cell(date)="data">
        <router-link :to="{ name: 'enrolments_show', params: { id: data.item.id }}">{{data.item.date }}</router-link>
      </template>
      <template #cell(actions)="data">
        <router-link :to="{ name: 'enrolments_edit', params: { id: data.item.id }}">edit</router-link>
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
      enrolments: []
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
    getEnrolments(){
      let token = localStorage.getItem('token');
      axios.get('https://college-api-viv.herokuapp.com/api/enrolments', {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.enrolments = response.data.data;
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
