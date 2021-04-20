<template>
  <div>

    <div class="home">
      <h1 data-aos="zoom-in">Create a Course</h1>
    </div>

    <hr class="show">
  <!-- title:  <input type="text" v-model="form.title" /><br>
  code:  <input type="text" v-model="form.code" /> <span v-if="errors.code"> {{errors.code}} </span> <br>
  description:  <input type="text" v-model="form.description" /><br>
  points:  <input type="text" v-model="form.points" />  <span v-if="errors.points"> {{errors.points}} </span> <br>
  level:  <input type="text" v-model="form.level" />  <span v-if="errors.level"> {{errors.level}} </span> <br> -->

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
       <br>

     </b-card>

     <br>

<div class="home">
  <b-button pill variant="dark" :to="{ name: 'courses_index' }">Back</b-button>
  <b-button pill variant="outline-success" @click="createCourse()">Submit</b-button>
</div>

  </div>
</template>

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

<style>
.home{
  text-align: center;
}

.red{
  color: red;
  font-size: 0.9em;
}
</style>
