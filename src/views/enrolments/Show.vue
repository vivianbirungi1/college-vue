<template>
  <div>

    <!-- home styling element used to center text and animation applied on text using AOS library. -->

    <div class="home">
      <h1 data-aos="zoom-in"> Enrolment</h1>
    </div>

    <hr class="show">

    <!-- info put within bootstrap card with image on the right and info on the left. image from Dribbble -->
    <div data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">
      <b-card img-src="https://cdn.dribbble.com/users/62696/screenshots/6515630/_render_dirbol.gif" img-width="550" img-alt="Card gif" width="290" img-right class="darktheme">

        <!-- displaying info relevant to enrolment from database using ID. -->
        <!-- darktheme used to change text and background color to be redeable when darktheme is trieggered -->
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

<!-- when Delete button is clicked, deleteEnrolment method is carried out -->
    <b-button pill variant="dark" :to="{ name: 'enrolments_index' }">Back</b-button>
    <b-button pill variant="danger" @click="deleteEnrolment()">Delete</b-button>

  </div>
</template>

<!-- enrolment array is passed into data -->
<!-- get request used to get enrolment by ID from API -->
<!-- if enrolmentis gptten successfully, data response from enrolment is returned. -->
<!-- simple deleteEnrolment method. axios.delete request sent to api to delete specific enrolment by id -->
<!-- if successful, user is re-routed to enrolments_index and enrolment is deleted from table and database. -->
<!-- if unsuccessful, error response messages are returned in the console. -->
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
