<template>
  <div>

    <!-- home styling element used to center text and animation applied on text using AOS library and displays titie of course -->

    <div class="home">
      <h1 data-aos="zoom-in"> Course {{ course.title }}</h1>
    </div>

    <hr class="show">

<!-- info put within bootstrap card with image on the right and info on the left. image from Dribbble -->
    <div data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">

      <b-card img-src="https://cdn.dribbble.com/users/1761051/screenshots/14866725/media/09d01ec2ceb691bffd8e952571ff633a.gif" img-width="500" img-alt="Card gif" img-right class="darktheme">
<!-- displaying info relevant to course from database using ID. -->
        <b-card-text class="darktheme">
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

<!-- when Delete button is clicked it triggers the showModal method -->
    <b-button pill variant="dark" :to="{ name: 'courses_index' }">Back</b-button>
    <b-button pill variant="danger" @click="showModal">Delete</b-button>

<!-- modal appears and asks if user is sure they want to delete course -->
<!-- if yes, the deleteCourse method is carried out. Enrolments for exisitng course are also deleted -->
<!-- if no, hideModal is triggered and modal disappears, course is not deleted. -->
    <b-modal ref="my-modal" hide-footer title="Deleting Course">
      <div class="d-block text-center">
        <h4>Are you sure you want to delete this course?</h4>
      </div>
      <b-button class="mt-3" pill variant="outline-danger" block @click="hideModal">No, nevermind</b-button>
      <b-button class="mt-2" pill variant="outline-warning" block @click="deleteCourse()">Yes, I am sure</b-button>
    </b-modal>


  </div>
</template>

<!-- course array passed into data -->
<!-- get request sent to api to retried course by ID -->
<!-- if course is successfully retrieved, data for that course is returned. -->
<!-- showModal and hideModal methods pass in modal reference and either show or hide the modal -->
<!-- deleteCourse method maps the courses to the enrolments and deletes any enrolments tied to the course as well as the course itself. -->
<!-- if successful page re-routes to courses_index and course along with its enrolments are deleted from the database. -->
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
    showModal(){
      this.$refs['my-modal'].show()
    },
    hideModal(){
      this.$refs['my-modal'].hide()
    },
    deleteCourse(){
      let token = localStorage.getItem('token');

      let listOfDeleteRequests = this.course.enrolments.map((current) => axios.delete("https://college-api-viv.herokuapp.com/api/enrolments/" +
      current.id, {headers: { Authorization: "Bearer " + token }}
    ));
// log the contents of listOfDeleteRequests
      axios.all(listOfDeleteRequests)
      .then((response) => {
        console.log(response);
        axios.delete("https://college-api-viv.herokuapp.com/api/courses/" + this.course.id, {
          headers: { Authorization: "Bearer " + token }
        })
        .then((response) => {
          console.log(response.data);
          this.$router.replace({
              name: "courses_index"
            })
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data)
        });
      });

// old deleteCourse method
      // axios.delete(`https://college-api-viv.herokuapp.com/api/courses/${this.$route.params.id}`, {
      //   headers: {Authorization: "Bearer " + token}
      // })
      // .then(response => {
      //   console.log(response.data);
      //   this.$router.replace({
      //     name: "courses_index"
      //   })
      // })
      // .catch(error => {
      //   console.log(error)
      //   console.log(error.response.data)
      // })



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
