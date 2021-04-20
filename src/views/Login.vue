<template>
  <!-- using login styling to center text content. Large Login header created with AOS zoom in animation -->
  <div class="login">
    <h1 data-aos="zoom-in">Login</h1>

    <hr class="show">

    <br>
    <br>

<!-- putting form within a card -->
<!-- using a card image on the left. Image source from Dribbble -->
<!-- register form fields on the right handside -->
    <b-card
    img-src="https://cdn.dribbble.com/users/1751513/screenshots/11220196/media/73356b2cdb13689a754b511cb447278d.png?compress=1&resize=800x600"
    img-alt="Card image"
    img-left class="mb-3 darktheme"
    data-aos="fade-down">
<!-- data below is bound to these input fields -->
<b-form-group class="textbox" id="input-group-1" label="Email" label-for="input-1">
   <b-form-input type="email" v-model="form.email" ></b-form-input>
   <span class="red" v-if="errors.email"> {{errors.email}} </span>
 </b-form-group>
  <br>
  <b-form-group class="textbox" id="input-group-1" label="Password" label-for="input-1">
   <b-form-input type="password" v-model="form.password" ></b-form-input>
   <span class="red" v-if="errors.password"> {{errors.password}} </span>
 </b-form-group>
 <router-link :to=" { name: 'register'}">New to the site? Click here to register.</router-link>

  <br>
  <br>
  <!-- submit button listnes for click and executes login method below -->
    <b-button pill variant="dark" @click="login()">Login</b-button>


</b-card>


  </div>
</template>
<!-- closing template -->

<!-- open script tag -->
<!-- importing axios from axios library -->
<!-- passing in a loggedIn boolean varibale to store the toekn when user logs in -->
<!-- form stored in data -->
<!-- errors array passed in outside form but within data -->
<!-- login method sends a post request when user clicks submit button. if fields are empty or incorrect, an error response is returned in the console. -->
<!-- token is stored within the localStorage if login method is emitted successful and router pushes user to home page. -->
<script>
import axios from 'axios';
export default {
  name: 'Login',
  components: {
  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return{
      form: {
        email: "",
        password: ""
      },
      errors: []
    }
  },
  methods:{
    login(){
      axios.post('https://college-api-viv.herokuapp.com/api/login', {
        email: this.form.email,
        password: this.form.password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$emit('login');
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

<!-- styling for centering text -->
<style>
.login{
  text-align: center;
}
</style>
