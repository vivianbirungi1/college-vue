<template>
  <div>

    <!-- home styling element used to center text and animation applied on text using AOS library -->
    <div class="home">
    <h1 data-aos="zoom-in">Create a Lecturer</h1>
  </div>

  <hr class="show">

  <!-- dark theme applied to card to allow text and background to change -->
  <!-- form placed within a card, animation applied using AOS library -->
  <!-- errors displayed in span tag underneath each field if field is left empty or information is entered wrong -->
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

<!-- buttons centered -->
<!-- submit listens for click and executes createLecturer method -->
<div class="home">
  <b-button pill variant="dark" :to="{ name: 'lecturers_index' }">Back</b-button>
  <b-button pill variant="outline-success" @click="createLecturer()">Submit</b-button>
</div>

  </div>
</template>

<!-- import axios from axios library -->
<!-- loggedIn boolean passed through to check whether loggedin is true or false -->
<!-- data for from fields is stored below -->
<!-- errors array passed outsdie form but within data -->
<!-- createLecturer method executed when submit is clicked. token stored from localStorage is passed through. -->
<!-- post request is sent to api to send data inputted from fields in form -->
<!-- Bearer token is passed in for authorization -->
<!-- if successful, user is pushed to lecturers index. if unsuccessful error repsonse is returned in the console. -->
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
