<template>
  <div>

    <div class="home">
      <h1> Edit Lecturer </h1>
    </div>

    <hr class="show">

  <!-- name:  <input type="text" v-model="form.name" /><br>
  address:  <input type="text" v-model="form.address" /> <span v-if="errors.address"> {{errors.address}} </span> <br>
  email:  <input type="text" v-model="form.email" /><br>
  phone:  <input type="text" v-model="form.phone" />  <span v-if="errors.phone"> {{errors.phone}} </span> <br> -->
<b-card class="darktheme">
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
  <br>
</b-card>


<div class="home">
  <b-button pill variant="dark" :to="{ name: 'lecturers_index' }">Back</b-button>
  <b-button pill variant="outline-success" @click="editLecturer()">Submit</b-button>
</div>

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
