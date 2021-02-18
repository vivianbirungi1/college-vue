<template>
  <div>
    This is the Courses Index page

    <br>

    <button @click="getCourses()">Get Courses</button>

    <button @click="logout()">Logout</button>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CoursesIndex',
  components: {
  },
  data() {
    return{

    }
  },
  method:{
    getCourses(){
      let token = localStorage.getItem('token');
      axios.get('http://college.api:8000/api/login', {
        headers: {Authorization: "Bearer" + token}
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

      axios.get('http://college.api:8000/api/login', {
        headers: {Authorization: "Bearer" + token}
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
