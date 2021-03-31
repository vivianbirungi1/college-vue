<template>
  <div>

    <h4>Date: </h4> {{ enrolment.date }}<br>
    <h4>Time: </h4> {{ enrolment.time }}<br>
    <h4>Status: </h4> {{ enrolment.status }}<br>
    <h4>Course ID: </h4> {{ enrolment.course_id }}<br>
    <h4>Lecturer ID: </h4> {{ enrolment.lecturer_id }}<br>

    <b-table striped hover :item="enrolment.enrolments">
      <!-- <template #cell(title)="data">
        <router-link :to="{ name: 'enrolments_show', params: { id: data.item.id }}">{{data.item.title }}</router-link>
      </template> -->
    </b-table>

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

  },
}
</script>

<style>
.home{
  text-align: center;
}
</style>
