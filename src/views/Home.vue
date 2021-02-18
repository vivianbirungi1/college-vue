<template>
  <div class="home">
    This is the Home page

    <br>
<!-- data below is bound to these input fields -->
    <input type="email" v-model="form.email" />
    <input type="password" v-model="form.password" />
    <button @click="login()">Submit</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
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
  method:{
    login(){
      axios.post('http://college.api:8000/api/login', {
        email: this.form.email,
        password: this.form.password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
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
.home{
  text-align: center;
}
</style>
