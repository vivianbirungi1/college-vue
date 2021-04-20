<template>
  <div>

    <div class="home">
      <h1 data-aos="zoom-in"> Course {{ course.title }}</h1>
    </div>

    <hr class="show">

    <div data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">

      <b-card img-src="https://cdn.dribbble.com/users/1761051/screenshots/14866725/media/09d01ec2ceb691bffd8e952571ff633a.gif" img-width="500" img-alt="Card gif" img-right class="darktheme">

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

    <b-button pill variant="dark" :to="{ name: 'courses_index' }">Back</b-button>
    <b-button pill variant="danger" @click="showModal">Delete</b-button>

    <b-modal ref="my-modal" hide-footer title="Deleting Course">
      <div class="d-block text-center">
        <h4>Are you sure you want to delete this course?</h4>
      </div>
      <b-button class="mt-3" pill variant="outline-danger" block @click="hideModal">No, nevermind</b-button>
      <b-button class="mt-2" pill variant="outline-warning" block @click="deleteCourse()">Yes, I am sure</b-button>
    </b-modal>

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
