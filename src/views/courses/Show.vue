<template>
  <div>

    <h4>Title: </h4> {{ course.title }}<br>
    <h4>Code: </h4> {{ course.code }}<br>
    <h4>Description: </h4> {{ course.description }}<br>
    <h4>Points: </h4> {{ course.points }}<br>
    <h4>Level: </h4> {{ course.level }}<br>

    <b-table striped hover :item="course.enrolments">
      <!-- <template #cell(title)="data">
        <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{data.item.title }}</router-link>
      </template> -->
    </b-table>

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
</style>
