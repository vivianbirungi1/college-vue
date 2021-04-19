<template>
  <div class="login">
    <h1 data-aos="zoom-in">Login</h1>

    <hr class="show">

    <br>
    <br>

    <b-card
    img-src="https://cdn.dribbble.com/users/1751513/screenshots/11220196/media/73356b2cdb13689a754b511cb447278d.png?compress=1&resize=800x600"
    img-alt="Card image"
    img-left class="mb-3 darktheme"
    data-aos="fade-down">
<!-- data below is bound to these input fields -->
<b-form-group class="textbox" id="input-group-1" label="Email" label-for="input-1">
   <b-form-input type="email" v-model="form.email" ></b-form-input>
 </b-form-group>
  <br>
  <b-form-group class="textbox" id="input-group-1" label="Password" label-for="input-1">
   <b-form-input type="password" v-model="form.password" ></b-form-input>
 </b-form-group>
 <router-link :to=" { name: 'register'}">New to the site? Click here to register.</router-link>

  <br>
  <br>
    <b-button pill variant="dark" @click="login()">Login</b-button>


</b-card>


  </div>
</template>

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
      }
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
      })
    }
  },
}
</script>

<style>
.login{
  text-align: center;
}
</style>
