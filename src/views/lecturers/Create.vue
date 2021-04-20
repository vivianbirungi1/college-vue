<template>
  <div>

    <div class="home">
    <h1 data-aos="zoom-in">Create a Lecturer</h1>
  </div>

  <hr class="show">

<b-card class="darktheme" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="300">
  <b-form-group class="textbox"  label="Name" label-for="input-1">
     <b-form-input type="text" v-model="form.name" ></b-form-input>
     <span class="red" v-if="errors.name"> {{errors.name}} </span>
   </b-form-group>
   <br>
   <b-form-group class="textbox"  label="Address" label-for="input-1">
      <b-form-input type="text" v-model="form.address" ></b-form-input>
      <span class="red" v-if="errors.address"> {{errors.address}} </span>
    </b-form-group>
    <br>
    <b-form-group class="textbox"  label="Email" label-for="input-1">
       <b-form-input type="text" v-model="form.email" ></b-form-input>
       <span class="red" v-if="errors.email"> {{errors.email}} </span>
     </b-form-group>
     <br>
     <b-form-group class="textbox"  label="Phone" label-for="input-1">
        <b-form-input type="text" v-model="form.phone" ></b-form-input>
        <span class="red" v-if="errors.phone"> {{errors.phone}} </span>
      </b-form-group>
</b-card>

<br>


<div class="home">
  <b-button pill variant="dark" :to="{ name: 'lecturers_index' }">Back</b-button>
  <b-button pill variant="outline-success" @click="createLecturer()">Submit</b-button>
</div>

  </div>
</template>

<script>
import axios from 'axios';

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
  },
  methods:{
    createLecturer() {
      let token = localStorage.getItem('token');

      axios.post('https://college-api-viv.herokuapp.com/api/lecturers', {
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
