<template>
  <div>

<!-- home styling element used to center text and animation applied on text using AOS library -->
    <div class="home">
      <h1 data-aos="zoom-in">Create a Course</h1>
    </div>

    <hr class="show">

<!-- dark theme applied to card to allow text and background to change -->
<!-- form placed within a card, animation applied using AOS library -->
<!-- errors displayed in span tag underneath each field if field is left empty or information is entered wrong -->
<b-card class="darktheme" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="300">
  <b-form-group class="textbox"  label="Title" label-for="input-1">
     <b-form-input type="text" v-model="form.title" ></b-form-input>
     <span class="red" v-if="errors.title"> {{errors.title}} </span>
   </b-form-group>
   <br>
   <b-form-group class="textbox"  label="Code" label-for="input-1">
      <b-form-input type="text" v-model="form.code" ></b-form-input>
      <span class="red" v-if="errors.code"> {{errors.code}} </span>
    </b-form-group>
    <br>
    <b-form-group class="textbox"  label="Description" label-for="input-1">
       <b-form-input type="text" v-model="form.description" ></b-form-input>
       <span class="red" v-if="errors.description"> {{errors.description}} </span>
     </b-form-group>
     <br>
     <b-form-group class="textbox"  label="Points" label-for="input-1" >
        <b-form-input type="text" v-model="form.points" ></b-form-input>
         <span class="red" v-if="errors.points"> {{errors.points}} </span>
      </b-form-group>
      <br>
      <b-form-group class="textbox"  label="Level" label-for="input-1">
         <b-form-input type="text" v-model="form.level" ></b-form-input>
         <span class="red" v-if="errors.level"> {{errors.level}} </span>
       </b-form-group>

     </b-card>

     <br>

<!-- buttons centered -->
<!-- submit listens for click and executes createCourse method -->
<div class="home">
  <b-button pill variant="dark" :to="{ name: 'courses_index' }">Back</b-button>
  <b-button pill variant="outline-success" @click="createCourse()">Submit</b-button>
</div>

  </div>
</template>

<!-- import axios from axios library -->
<!-- loggedIn boolean passed through to check whether loggedin is true or false -->
<!-- data for from fields is stored below -->
<!-- errors array passed outsdie form but within data -->
<!-- createCourse method executed when submit is clicked. token stored from localStorage is passed through. -->
<!-- post request is sent to api to send data inputted from fields in form -->
<!-- Bearer token is passed in for authorization -->
<!-- if successful, user is pushed to courses index. if unsuccessful error repsonse is returned in the console. -->
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
  },
  methods:{
    createCourse() {
      let token = localStorage.getItem('token');

      axios.post('https://college-api-viv.herokuapp.com/api/courses', {
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

<!-- setting styling for centering content and for error messages below form fields. -->
<style>
.home{
  text-align: center;
}

.red{
  color: red;
  font-size: 0.9em;
}
</style>
