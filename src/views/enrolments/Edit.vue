<template>
  <div>

    <!-- home styling element used to center text and animation applied on text using AOS library -->
    <div class="home">
      <h1 data-aos="zoom-in"> Edit Enrolment</h1>
    </div>

    <hr class="show">

    <!-- dark theme applied to card to allow text and background to change -->
    <!-- form placed within a card, animation applied using AOS library -->
    <!-- errors displayed in span tag underneath each field if field is left empty or information is entered wrong -->
    <!-- radio buttons used for status of enrolment being created and status chosen displayed in field below -->
<b-card class="darktheme" data-aos="fade-up"
     data-aos-easing="linear"
     data-aos-duration="300">
  <b-form-group class="textbox"  label="Date" label-for="input-1">
     <b-form-input type="date" v-model="form.date" ></b-form-input>
   </b-form-group>
   <br>
   <b-form-group class="textbox"  label="Time" label-for="input-1">
      <b-form-input type="time" v-model="form.time" ></b-form-input>
    </b-form-group>
    <br>

    <b-form-group label="Status">
              <b-row>
                <b-col md="12">
                    <b-button class="ml-2" pill variant="light" size="sm" name="radio-validation">
                      <b-form-radio v-model="form.status" value="assigned">Assigned</b-form-radio>
                      <b-form-invalid-feedback>Please choose one</b-form-invalid-feedback>
                      <b-form-valid-feedback>Looks good</b-form-valid-feedback>
                    </b-button>

                    <b-button class="ml-2" pill variant="light" size="sm" name="radio-validation">
                      <b-form-radio v-model="form.status" value="associate">Associate</b-form-radio>
                      <b-form-invalid-feedback>Please choose one</b-form-invalid-feedback>
                      <b-form-valid-feedback>Looks good</b-form-valid-feedback>
                    </b-button>

                    <b-button class="ml-2" pill variant="light" size="sm" name="radio-validation">
                      <b-form-radio v-model="form.status" value="career_break">Career Break</b-form-radio>
                      <b-form-invalid-feedback>Please choose one</b-form-invalid-feedback>
                      <b-form-valid-feedback>Looks good</b-form-valid-feedback>
                    </b-button>

                    <b-button class="ml-2" pill variant="light" size="sm" name="radio-validation">
                      <b-form-radio v-model="form.status" value="interested">Interested</b-form-radio>
                      <b-form-invalid-feedback>Please choose one</b-form-invalid-feedback>
                      <b-form-valid-feedback>Looks good</b-form-valid-feedback>
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
  </b-form-group>

    <br><br>

    <!-- looping through courses array to display lecturers in dropdown option -->
    <b-form-group label="Course Name">
              <b-form-select v-model="form.course_id">
                <option v-for="course in courses" :value="course.id" :key="course.id">
                  {{ course.title }}
                </option>
              </b-form-select>
            </b-form-group>


</b-card>

<br>

<!-- buttons centered -->
<!-- submit listens for click and executes editEnrolment method -->
<div class="home">
  <b-button pill variant="dark" :to="{ name: 'enrolments_index' }">Back</b-button>
  <b-button pill variant="outline-success" @click="editEnrolment()">Submit</b-button>
</div>

  </div>
</template>


<!-- getEnrolments, getCourse and getLecturers method with id retrievedd using get request -->
<!-- editEnrolments method use axios.put request to update fields changed -->
<!-- getEnrolments, getCourse and getLecturers method passed in through mounted to load when page laods -->
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
      errors: [],
      lecturers: [],
      courses: []
    }
  },
  mounted(){
    this.getEnrolment();
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
    getEnrolment(){
      let token = localStorage.getItem('token');

      axios.get(`https://college-api-viv.herokuapp.com/api/enrolments/${this.$route.params.id}`, {
        headers: {Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.form.date = response.data.data.date
        this.form.time = response.data.data.time
        this.form.status = response.data.data.status
        this.form.course_id = response.data.data.course_id
        this.form.lecturer_id = response.data.data.lecturer_id
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },
    editEnrolment() {
      let token = localStorage.getItem('token');

      axios.put(`https://college-api-viv.herokuapp.com/api/enrolments/${this.$route.params.id}`, {
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
          this.$router.push({ name: 'enrolments_index' });
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
