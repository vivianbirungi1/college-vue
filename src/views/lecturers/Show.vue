<template>
  <div>

    <!-- home styling element used to center text and animation applied on text using AOS library and displays titie of lecturer -->

    <div class="home">
      <h1 data-aos="zoom-in">Lecturer {{ lecturer.name}}</h1>
    </div>

    <hr class="show">

    <!-- info put within bootstrap card with image on the right and info on the left. image from Dribbble -->
    <div data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">
      <b-card img-src="https://cdn.dribbble.com/users/1761051/screenshots/14866682/media/cce6682c41c0b250dc637ca14c039e4e.gif" img-alt="Card gif" img-height="400" img-right class="darktheme">

        <!-- displaying info relevant to lecturer from database using ID. -->
        <b-card-text class="darktheme">
    <h4>Address: </h4>
    <p>{{ lecturer.address }}</p>
    <br>
    <h4>Email: </h4>
    <p>{{ lecturer.email }}</p>
    <br>
    <h4>Phone: </h4>
    <p>{{ lecturer.phone }}</p>
        </b-card-text>
      </b-card>
  </div>

  <br>

  <!-- when Delete button is clicked it triggers the showModal method -->
    <b-button pill variant="dark" :to="{ name: 'lecturers_index' }">Back</b-button>
    <b-button pill variant="danger" @click="showModal">Delete</b-button>

    <!-- modal appears and asks if user is sure they want to delete lecturer -->
    <!-- if yes, the deleteLecturer method is carried out. Enrolments for exisitng lecturer are also deleted -->
    <!-- if no, hideModal is triggered and modal disappears, lecturer is not deleted. -->
    <b-modal ref="my-modal" hide-footer title="Deleting Lecturer">
      <div class="d-block text-center">
        <h4>Are you sure you want to delete this lecturer?</h4>
      </div>
      <b-button class="mt-3" pill variant="outline-danger" block @click="hideModal">No, nevermind</b-button>
      <b-button class="mt-2" pill variant="outline-warning" block @click="deleteLecturer()">Yes, I am sure</b-button>
    </b-modal>

  </div>
</template>


<!-- lecturer array passed into data -->
<!-- get request sent to api to retried lecturer by ID -->
<!-- if lecturer is successfully retrieved, data for that lecturer is returned. -->
<!-- showModal and hideModal methods pass in modal reference and either show or hide the modal -->
<!-- deleteLecturer method maps the lecturers to the enrolments and deletes any enrolments tied to the lecturer as well as the lecturer itself. -->
<!-- if successful page re-routes to lecturers_index and lecturer along with its enrolments are deleted from the database. -->
<script>
import axios from 'axios';
export default {
  name: 'LecturerShow',
  components: {
  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return{
      lecturer: []
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`https://college-api-viv.herokuapp.com/api/lecturers/${this.$route.params.id}`, {
      headers: {Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data);
      this.lecturer = response.data.data;
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

    deleteLecturer(){
      let token = localStorage.getItem('token');

      let listOfDeleteRequests = this.lecturer.enrolments.map((current) => axios.delete("https://college-api-viv.herokuapp.com/api/enrolments/" +
      current.id, {headers: { Authorization: "Bearer " + token }}
    ));
// log the contents of listOfDeleteRequests
      axios.all(listOfDeleteRequests)
      .then((response) => {
        console.log(response);
        axios.delete("https://college-api-viv.herokuapp.com/api/lecturers/" + this.lecturer.id, {
          headers: { Authorization: "Bearer " + token }
        })
        .then((response) => {
          console.log(response.data);
          this.$router.replace({
              name: "lecturers_index"
            })
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data)
        });
      });


// old deleteLecturer method
    // deleteLecturer(){
    //   let token = localStorage.getItem('token');
    //
    //   axios.delete(`https://college-api-viv.herokuapp.com/api/lecturers/${this.$route.params.id}`, {
    //     headers: {Authorization: "Bearer " + token}
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //     this.$router.replace({
    //       name: "lecturers_index"
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     console.log(error.response.data)
    //   })


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
