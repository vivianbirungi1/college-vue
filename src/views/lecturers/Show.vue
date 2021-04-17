<template>
  <div>

    <div class="home">
      <h1>Lecturer {{ lecturer.name}}</h1>
    </div>

    <hr class="show">

    <div>
      <b-card>

        <b-card-text>
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
