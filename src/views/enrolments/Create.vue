<template>
  <div>

  date:  <input type="date" v-model="form.date" /><br>
  time:  <input type="time" v-model="form.time" /> <span v-if="errors.time"> {{errors.time}} </span> <br>
  status:  <input type="text" v-model="form.status" /><br>
  course_id:  <input type="text" v-model="form.course_id" />  <span v-if="errors.course_id"> {{errors.course_id}} </span> <br>
  lecturer_id:  <input type="text" v-model="form.lecturer_id" />  <span v-if="errors.lecturer_id"> {{errors.lecturer_id}} </span> <br>

  <button @click="createEnrolment()">Submit</button>

  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'EnrolmentCreate',
  components: {
  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return{
      form: {
        date: "",
        time: "",
        status: "",
        course_id: "",
        lecturer_id: "",
      },
      errors: []
    }
  },
  mounted(){
  },
  methods:{
    createEnrolment() {
      let token = localStorage.getItem('token');

      axios.post('https://college-api-viv.herokuapp.com/api/enrolments', {
        date: this.form.date,
        time: this.form.time,
        status: this.form.status,
        course_id: this.form.course_id,
        lecturer_id: this.form.lecturer_id,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
          this.$router.push({ name: 'enrolments_index' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
      })

    }
  },
}
</script>

<style>
.home{
  text-align: center;
}
</style>
