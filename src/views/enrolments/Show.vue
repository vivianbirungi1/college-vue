<template>
  <div>

    <div class="home">
      <h1> Enrolment</h1>
    </div>

    <hr class="show">


    <div>
      <b-card class="darktheme">

        <b-card-text class="darktheme">
    <h4>Date: </h4>
    <p>{{ enrolment.date }}</p>
    <br>
    <h4>Time: </h4>
    <p>{{ enrolment.time }}</p>
    <br>
    <h4>Status: </h4>
    <p>{{ enrolment.status }}</p>
    <br>
    <h4>Course ID: </h4>
    <p> {{ enrolment.course_id }}</p>
    <br>
    <h4>Lecturer ID: </h4>
    <p>{{ enrolment.lecturer_id }}</p>

  </b-card-text>

  </b-card>
  </div>

  <br>

    <b-button pill variant="dark" :to="{ name: 'enrolments_index' }">Back</b-button>
    <b-button pill variant="danger" @click="deleteEnrolment()">Delete</b-button>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EnrolmentShow',
  components: {
  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return{
      enrolment: []
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`https://college-api-viv.herokuapp.com/api/enrolments/${this.$route.params.id}`, {
      headers: {Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data);
      this.enrolment = response.data.data;
    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
    })
  },
  methods:{
    deleteEnrolment(){
      let token = localStorage.getItem('token');

      axios.delete(`https://college-api-viv.herokuapp.com/api/enrolments/${this.$route.params.id}`, {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.replace({
          name: "enrolments_index"
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
