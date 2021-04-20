<template>
  <div>

    <!-- home styling element used to center text and animation applied on text using AOS library -->
    <div class="home">
      <h1 data-aos="zoom-in"> Create an Enrolment</h1>
    </div>

    <hr class="show">

    <!-- dark theme applied to card to allow text and background to change -->
    <!-- form placed within a card, animation applied using AOS library -->
    <!-- errors displayed in span tag underneath each field if field is left empty or information is entered wrong -->
    <!-- radio buttons used for status of enrolment being created and status chosen displayed in field below -->
<b-card class="darktheme" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="300">
  <b-form-group class="textbox"  label="Date" label-for="input-1">
     <b-form-input type="date" v-model="form.date" ></b-form-input>
     <span class="red" v-if="errors.date"> {{errors.date}} </span>
   </b-form-group>
   <br>
   <b-form-group class="textbox"  label="Time" label-for="input-1">
      <b-form-input type="time" v-model="form.time" ></b-form-input>
      <span class="red" v-if="errors.date"> {{errors.date}} </span>
    </b-form-group>
    <br>

  <b-form-group label="Status">
            <b-row>
              <b-col md="12">
                  <b-button class="ml-2" pill variant="light" size="sm">
                    <b-form-radio v-model="form.status" value="assigned">Assigned</b-form-radio>
                    <span class="red" v-if="errors.status"> {{errors.status}} </span>
                  </b-button>

                  <b-button class="ml-2" pill variant="light" size="sm" >
                    <b-form-radio v-model="form.status" value="associate">Associate</b-form-radio>
                    <span class="red" v-if="errors.status"> {{errors.status}} </span>
                  </b-button>

                  <b-button class="ml-2" pill variant="light" size="sm" >
                    <b-form-radio v-model="form.status" value="career_break">Career Break</b-form-radio>
                    <span class="red" v-if="errors.status"> {{errors.status}} </span>
                  </b-button>

                  <b-button class="ml-2" pill variant="light" size="sm">
                    <b-form-radio v-model="form.status" value="interested">Interested</b-form-radio>
                    <span class="red" v-if="errors.status"> {{errors.status}} </span>
                  </b-button>
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group class="textbox"  label="Status" label-for="input-1">
             <b-form-input type="text" v-model="form.status" ></b-form-input>
           </b-form-group>

           <br>
<!-- looping through lecturers array to display lecturers in dropdown option -->
<b-form-group label="Lecturer Name">
  <b-form-select v-model="form.lecturer_id">
    <option v-for="lecturer in lecturers" :value="lecturer.id" :key="lecturer.id">
      {{ lecturer.name }}
    </option>
  </b-form-select>
  <span class="red" v-if="errors.lecturer_id"> {{errors.lecturer_id}} </span>
</b-form-group>

  <br><br>

  <!-- looping through courses array to display lecturers in dropdown option -->
  <b-form-group label="Course Name">
            <b-form-select v-model="form.course_id">
              <option v-for="course in courses" :value="course.id" :key="course.id">
                {{ course.title }}
              </option>
            </b-form-select>
            <span class="red" v-if="errors.course_id"> {{errors.course_id}} </span>
          </b-form-group>

</b-card>

<br>

<!-- buttons centered -->
<!-- submit listens for click and executes createEnrolment method -->
<div class="home">
  <b-button pill variant="dark" :to="{ name: 'enrolments_index' }">Back</b-button>
  <b-button pill variant="outline-success" @click="createEnrolment()">Submit</b-button>
</div>

  </div>
</template>


<!-- import axios from axios library -->
<!-- loggedIn boolean passed through to check whether loggedin is true or false -->
<!-- data for from fields is stored below -->
<!-- errors array passed outsdie form but within data -->
<!-- createEnrolment method executed when submit is clicked. token stored from localStorage is passed through. -->
<!-- post request is sent to api to send data inputted from fields in form -->
<!-- Bearer token is passed in for authorization -->
<!-- if successful, user is pushed to enrolments index. if unsuccessful error repsonse is returned in the console. -->

<!-- lecturer and course array being passed in within data for dropdowns in form -->
<!-- sending a get method to retrieve the lecturers and courses within methods -->
<!-- getCourses and getLecturers passed into mounted as app changes state, will render courses and lecturers in form -->
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
        lecturer_id: ""
      },
      courses: [],
      lecturers: [],
      selectedCourse: "",
      selectedLecturer: "",
      errors: []
    }
  },
  mounted(){
    this.getCourses();
    this.getLecturers();
  },
  methods:{
    getCourses(){
      let token = localStorage.getItem('token');

      axios.get('https://college-api-viv.herokuapp.com/api/courses', {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.courses = response.data.data;
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },

    getLecturers(){
      let token = localStorage.getItem('token');
      axios.get('https://college-api-viv.herokuapp.com/api/lecturers', {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.lecturers = response.data.data;
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },
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
      //  console.log("this is a response");
          this.$router.push({ name: 'enrolments_index' });
      })
      .catch(error => {
      //  console.log("this is an error");
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
