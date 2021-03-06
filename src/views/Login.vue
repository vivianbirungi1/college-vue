<template>
  <div class="login">
    Login

    <br>
    <br>
<!-- data below is bound to these input fields -->
<b-form-group class="textbox" id="input-group-1" label="Email" label-for="input-1">
   <b-form-input type="email" v-model="form.email" ></b-form-input>
 </b-form-group>
  <br>
  <b-form-group class="textbox" id="input-group-1" label="Password:" label-for="input-1">
   <b-form-input type="password" v-model="form.password" ></b-form-input>
 </b-form-group>
  <br>
    <b-button pill variant="dark" @click="login()">Login</b-button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  components: {
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
      axios.post('http://college.api:8000/api/login', {
        email: this.form.email,
        password: this.form.password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$emit('login');
        this.$router.replace({ name: 'courses_index' });
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
