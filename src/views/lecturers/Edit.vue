<template>
  <div>

    <!-- home styling element used to center text and animation applied on text using AOS library -->
    <div class="home">
      <h1 data-aos="zoom-in"> Edit Lecturer </h1>
    </div>

    <hr class="show">

    <!-- dark theme applied to card to allow text and background to change -->
    <!-- form placed within a card, animation applied using AOS library -->
    <!-- errors displayed in span tag underneath each field if field is left empty or information is entered wrong -->

<b-card class="darktheme" data-aos="fade-up"
     data-aos-easing="linear"
     data-aos-duration="300">
  <b-form-group class="textbox"  label="Name" label-for="input-1">
     <b-form-input type="text" v-model="form.name" ></b-form-input>
   </b-form-group>
   <br>
   <b-form-group class="textbox"  label="Address" label-for="input-1">
      <b-form-input type="text" v-model="form.address" ></b-form-input>
    </b-form-group>
    <br>
    <b-form-group class="textbox"  label="Email" label-for="input-1">
       <b-form-input type="text" v-model="form.email" ></b-form-input>
     </b-form-group>
     <br>
     <b-form-group class="textbox"  label="Phone" label-for="input-1">
        <b-form-input type="text" v-model="form.phone" ></b-form-input>
      </b-form-group>
</b-card>

<br>

<!-- buttons centered -->
<!-- submit listens for click and executes editLecturer method -->
<div class="home">
  <b-button pill variant="dark" :to="{ name: 'lecturers_index' }">Back</b-button>
  <b-button pill variant="outline-success" @click="editLecturer()">Submit</b-button>
</div>

  </div>
</template>

<!-- getLecturer method with id retrievedd using get request -->
<!-- editLecturer method uses axios.put request to update fields changed -->
<!-- getLecturermethod passed in through mounted to load when page laods -->
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
