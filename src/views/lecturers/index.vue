<template>
  <div>
    This is the Lecturers Index page

    <br>


    <router-link :to="{ name: 'lecturers_create'}">Create</router-link>

    <br><br>

    <b-table striped hover :items="lecturers" :fields="fields">
      <template #cell(name)="data">
        <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}">{{data.item.name }}</router-link>
      </template>
      <template #cell(actions)="data">
        <router-link :to="{ name: 'lecturers_edit', params: { id: data.item.id }}">edit</router-link>
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
      lecturers: []
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
</style>
