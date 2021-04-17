<template>
  <div>

    <div class="home">
    <h1> Edit Course </h1>
  </div>

    <hr class="show">

  <!-- title:  <input type="text" v-model="form.title" /><br>
  code:  <input type="text" v-model="form.code" /> <span v-if="errors.code"> {{errors.code}} </span> <br>
  description:  <input type="text" v-model="form.description" /><br>
  points:  <input type="text" v-model="form.points" />  <span v-if="errors.points"> {{errors.points}} </span> <br>
  level:  <input type="text" v-model="form.level" />  <span v-if="errors.level"> {{errors.level}} </span> <br> -->
<b-card class="darktheme">
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
       <br>
     </b-card>

<div class="home">
  <b-button pill variant="dark" :to="{ name: 'courses_index' }">Back</b-button>
  <b-button pill variant="outline-success" @click="editCourse()">Submit</b-button>
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
