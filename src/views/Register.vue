<template>
  <!-- using register styling to center content. Creating large header for page with AOS zoom in animation with yellow break line to separate form -->
  <div class="register">
  <h1 data-aos="zoom-in">  Register </h1>

  <hr class="show">

    <br>
    <br>

<!-- putting form within a bootstrap card -->
<!-- image within card placed on the left side, image address from Dribbble. -->
<!-- on the right side is the register form with fields -->
    <b-card
    img-src="https://cdn.dribbble.com/users/1751513/screenshots/14617095/media/16a993561b0cb2b99abf0cc94c08bc77.png?compress=1&resize=800x600"
    img-alt="Card image"
    img-left class="mb-3 darktheme"
    data-aos="fade-down">
<!-- data below is bound to these input fields -->
<b-form>
  <b-form-group class="textbox" label="Name" label-for="input-1">
    <b-form-input v-model="form.name" type="text" placeholder="Enter name" required></b-form-input>
     <span class="red" v-if="errors.name"> {{errors.name}} </span>
    </b-form-group>

    <b-form-group class="textbox" label="Email" label-for="input-1">
      <b-form-input v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
       <span class="red" v-if="errors.email"> {{errors.emaol}} </span>
      </b-form-group>

      <b-form-group class="textbox" label="Password" label-for="input-1">
        <b-form-input v-model="form.password" type="password" placeholder="Enter password" required></b-form-input>
         <span class="red" v-if="errors.password"> {{errors.password}} </span>
        </b-form-group>
        <router-link :to=" { name: 'login'}">Already have an account? Login</router-link>

        <br>
        <br>
<!-- submit button that will carry out register method once clicked -->
        <b-button pill variant="dark" class="submit" @click="register()">Submit</b-button>
</b-form>
<!-- closing b form -->

</b-card>
<!-- closing b card -->


  </div>
</template>
<!-- closing template -->


<!-- open script tag -->
<!-- importing axios from axios library -->
<!-- form stored within data field -->
<!-- errors array stored within data, outside of form -->
<!-- register method carries out a post request to the api to validate the form when fields have been filled and submit button has been clicked -->
<!-- if there is an error in the fields, an error respnse is returned in the console. -->
<script>
import axios from 'axios';
export default {
  name: 'Register',
  components: {
  },
  data() {
    return{
      form: {
         name: "",
        email: "",
        password: ""
      },
      errors: []
    }
  },
  methods:{
    register(){
      axios.post('https://college-api-viv.herokuapp.com/api/register', {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$router.replace({ name: 'home' });
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
<!-- closing script tag -->

<!-- styling -->
<style>
.register{
  text-align: center;
}


</style>
