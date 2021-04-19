<template>
  <div>

    <div class="home">
      <h1 data-aos="zoom-in">Lecturer {{ lecturer.name}}</h1>
    </div>

    <hr class="show">

    <div data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">
      <b-card img-src="https://cdn.dribbble.com/users/1761051/screenshots/14866682/media/cce6682c41c0b250dc637ca14c039e4e.gif" img-alt="Card gif" img-height="400" img-right class="darktheme">

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

    <!-- <b-table striped hover :item="lecturer.enrolments"> -->

    <!-- </b-table> -->

    <b-button pill variant="dark" :to="{ name: 'lecturers_index' }">Back</b-button>
    <b-button pill variant="danger" @click="deleteLecturer()">Delete</b-button>

  </div>
</template>

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

    deleteLecturer(){
      let token = localStorage.getItem('token');

      axios.delete(`https://college-api-viv.herokuapp.com/api/lecturers/${this.$route.params.id}`, {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.replace({
          name: "lecturers_index"
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
