<template>
  <!-- using home styling method to center content -->
  <div class="home">
<!-- using AOS library to create animation on welcome and icon -->
    <h2 data-aos="zoom-in">  <i class="fas fa-graduation-cap size: 27x"></i> </h2>
      <h1 data-aos="zoom-in">  Welcome! </h1>

<!-- yellow line -->
      <hr class="show">

<!-- sub header for content below -->
      <h6>  What's available on the site...  </h6>

<!-- card deck to store three cards for courses, lecturers and enrolments -->
<!-- card images used from Dribbble. Using bootstrap text card overlay -->
<!-- bootstrap button in center linking to pages -->
      <b-card-group deck>

      <b-card
   overlay
   img-src="https://cdn.dribbble.com/users/1751513/screenshots/10568622/media/09ce5727adfb5fd8f0a41527737204b6.png?compress=1&resize=800x600"
   img-alt="Card Image"
   text-variant="white"
   data-aos="zoom-in"
   data-aos-duration="500"
 >
   <b-card-text>
     <b-button class="spaceBtn" pill variant="warning" :to="{ name: 'courses_index' }">Courses</b-button>
   </b-card-text>
 </b-card>

 <br>
 <br>


 <b-card
   overlay
   img-src="https://cdn.dribbble.com/users/1312595/screenshots/14042476/media/7df309763fe4ddbbc9a25a6b2fdc592b.png?compress=1&resize=800x600"
   img-alt="Card Image"
   text-variant="white"
   data-aos="zoom-in"
   data-aos-duration="700"
 >
   <b-card-text>
     <b-button class="spaceBtn" pill variant="warning" :to="{ name: 'enrolments_index' }">Enrolments</b-button>
   </b-card-text>
 </b-card>

 <br>
 <br>

 <b-card
   overlay
   img-src="https://cdn.dribbble.com/users/1751513/screenshots/14597180/media/faaeed34f5aa9a29fc94b972c255ab1e.png?compress=1&resize=800x600"
   img-alt="Card Image"
   text-variant="white"
   data-aos="zoom-in"
   data-aos-duration="900"
 >
   <b-card-text>
      <b-button class="spaceBtn" pill variant="warning" :to="{ name: 'lecturers_index' }">Lecturers</b-button>
   </b-card-text>
 </b-card>

</b-card-group>



 <br>
 <br>



  </div>
</template>

<script>
// import axios from 'axios';
export default {

  name: 'Home',
  components: {
  },

  data() {
    return{

    }
  },
  methods:{

  },
}
</script>

<style>
.home{
  text-align: center;
}
/* centering text */

.spaceBtn{
  margin-top: 100px;
}
/* centering button in cards */


h1,h2,h3,h4,h5,h6 {
    color: #000000;
    font-family: 'Lora', serif;
}
/* declaring font famly for headers and text color OUTSIDE of dark theme */

p{
  color: #000000;
  font-family: 'Roboto', sans-serif;
}
/* declaring font family for p tag and color outside of dark theme */

/* reversing dark theme from white text and dark background to dark text and light background */
.darktheme{
  background-color: #f1f0ff;
  color: #000000;
}

</style>
<!-- closing styling tag -->
