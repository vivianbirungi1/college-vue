<template>
  <div>

  <!-- home styling element used to center text and animation applied on text using AOS library -->
    <div class="home">
    <h1 data-aos="zoom-in"> Edit Course </h1>
  </div>

    <hr class="show">

    <!-- dark theme applied to card to allow text and background to change -->
    <!-- form placed within a card, animation applied using AOS library -->
    <!-- errors displayed in span tag underneath each field if field is left empty or information is entered wrong -->
<b-card class="darktheme" data-aos="fade-up"
     data-aos-easing="linear"
     data-aos-duration="300">
  <b-form-group class="textbox"  label="Title" label-for="input-1">
     <b-form-input type="text" v-model="form.title" ></b-form-input>
   </b-form-group>
   <br>
   <b-form-group class="textbox"  label="Code" label-for="input-1">
      <b-form-input type="text" v-model="form.code" ></b-form-input>
    </b-form-group>
    <br>
    <b-form-group class="textbox"  label="Description" label-for="input-1">
       <b-form-input type="text" v-model="form.description" ></b-form-input>
     </b-form-group>
     <br>
     <b-form-group class="textbox"  label="Points" label-for="input-1">
        <b-form-input type="text" v-model="form.points" ></b-form-input>
      </b-form-group>
      <br>
      <b-form-group class="textbox"  label="Level" label-for="input-1">
         <b-form-input type="text" v-model="form.level" ></b-form-input>
       </b-form-group>
     </b-card>

     <br>

     <!-- buttons centered -->
     <!-- submit listens for click and executes editCourse method -->
<div class="home">
  <b-button pill variant="dark" :to="{ name: 'courses_index' }">Back</b-button>
  <b-button pill variant="outline-success" @click="editCourse()">Submit</b-button>
</div>
  </div>
</template>

<!-- getCourses method with id retrievedd using get request -->
<!-- editCourse method uses axios.put request to update fields changed -->
<!-- getCourse method passed in through mounted to load when page laods -->
<script>
import axios from '@/config/api';

export default {
  name: 'CourseCreate',
  components: {
  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return{
      form: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: "",
      },
      errors: []
    }
  },
  mounted(){
    this.getCourse()
  },
  methods:{
    getCourse(){
      let token = localStorage.getItem('token');

      axios.get(`https://college-api-viv.herokuapp.com/api/courses/${this.$route.params.id}`, {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.form.title = response.data.data.title
        this.form.code = response.data.data.code
        this.form.description = response.data.data.description
        this.form.points = response.data.data.points
        this.form.level = response.data.data.level
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },
    editCourse() {
      let token = localStorage.getItem('token');

      axios.put(`https://college-api-viv.herokuapp.com/api/courses/${this.$route.params.id}`, {
        title: this.form.title,
        code: this.form.code,
        description: this.form.description,
        points: this.form.points,
        level: this.form.level,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
          this.$router.push({ name: 'courses_index' });
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
