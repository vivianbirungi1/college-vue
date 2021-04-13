<template>
  <div class="register">
    Register

    <br>
    <br>
<!-- data below is bound to these input fields -->
<b-form>
  <b-form-group class="textbox" label="Name:" label-for="input-1">
    <b-form-input v-model="form.name" type="text" placeholder="Enter name" required></b-form-input>
    </b-form-group>

    <b-form-group class="textbox" label="Email:" label-for="input-1">
      <b-form-input v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group class="textbox" label="Password:" label-for="input-1">
        <b-form-input v-model="form.password" type="password" placeholder="Enter password" required></b-form-input>
        </b-form-group>

        <b-button pill variant="dark" class="submit" @click="register()">Submit</b-button>
</b-form>
  </div>
</template>

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
      }
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
.register{
  text-align: center;
}
</style>
