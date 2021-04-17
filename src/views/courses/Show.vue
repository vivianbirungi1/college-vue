<template>
  <div>

    <div class="home">
      <h1> Course {{ course.title }}</h1>
    </div>

    <hr class="show">

    <div>
      <b-card>

        <b-card-text>
    <h4>Code: </h4>
    <p> {{ course.code }}</p>
    <br>
    <h4>Description: </h4>
    <p> {{ course.description }}</p>
    <br>
    <h4>Points: </h4>
    <p> {{ course.points }}</p>
    <br>
    <h4>Level: </h4>
    <p> {{ course.level }}</p>
  </b-card-text>

  </b-card>
  </div>

    <br>

    <b-button pill variant="dark" :to="{ name: 'courses_index' }">Back</b-button>
    <b-button pill variant="danger" @click="deleteCourse()">Delete</b-button>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CourseShow',
  components: {
  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return{
      course: []
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`https://college-api-viv.herokuapp.com/api/courses/${this.$route.params.id}`, {
      headers: {Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data);
      this.course = response.data.data;
    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
    })
  },
  methods:{
    deleteCourse(){
      let token = localStorage.getItem('token');

      axios.delete(`https://college-api-viv.herokuapp.com/api/courses/${this.$route.params.id}`, {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.replace({
          name: "courses_index"
        })
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },

  },
}
</script>

<style>
.home{
  text-align: center;
}

hr.show {
  border: 1px solid #FFC107;
}
</style>
