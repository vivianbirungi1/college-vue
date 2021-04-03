<template>
  <div>

  name:  <input type="text" v-model="form.name" /><br>
  address:  <input type="text" v-model="form.address" /> <span v-if="errors.address"> {{errors.address}} </span> <br>
  email:  <input type="text" v-model="form.email" /><br>
  phone:  <input type="text" v-model="form.phone" />  <span v-if="errors.phone"> {{errors.phone}} </span> <br>

  <button @click="editLecturer()">Submit</button>

  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'LecturerCreate',
  components: {
  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return{
      form: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      errors: []
    }
  },
  mounted(){
    this.getLecturer()
  },
  methods:{
    getLecturer(){
      let token = localStorage.getItem('token');

      axios.get(`https://college-api-viv.herokuapp.com/api/lecturers/${this.$route.params.id}`, {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.form.name = response.data.data.name
        this.form.address = response.data.data.address
        this.form.email = response.data.data.email
        this.form.phone = response.data.data.phone
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },
    editLecturer() {
      let token = localStorage.getItem('token');

      axios.put(`https://college-api-viv.herokuapp.com/api/lecturers/${this.$route.params.id}`, {
        name: this.form.name,
        address: this.form.address,
        email: this.form.email,
        phone: this.form.phone,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
          this.$router.push({ name: 'lecturers_index' });
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
