<template>
  <div class="home">

    <h2>  <i class="fas fa-graduation-cap size: 27x"></i> </h2>
      <h1>  Welcome! </h1>

      <hr class="show">


      <h6>  What's available on the site...  </h6>



      <b-card-group deck>

      <b-card
   overlay
   img-src="https://cdn.dribbble.com/users/1751513/screenshots/10568622/media/09ce5727adfb5fd8f0a41527737204b6.png?compress=1&resize=800x600"
   img-alt="Card Image"
   text-variant="white"
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
 >
   <b-card-text>
      <b-button class="spaceBtn" pill variant="warning" :to="{ name: 'lecturers_index' }">Lecturers</b-button>
   </b-card-text>
 </b-card>

</b-card-group>

 <br>
 <br>



<!-- creating ripple effect in background -->
  <div class='ripple-background'>
  <div class='circle xxlarge shade1'></div>
  <div class='circle xlarge shade2'></div>
  <div class='circle large shade3'></div>
  <div class='circle mediun shade4'></div>
  <div class='circle small shade5'></div>
</div>



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

.spaceBtn{
  margin-top: 100px;
}


.circle{
  position: absolute;
  border-radius: 50%;
  background: #3399ff;
  animation: ripple 15s infinite;
  box-shadow: 0px 0px 1px 0px #3399ff;
}

.small{
  width: 50px;
  height: 50px;
  left: -30px;
  bottom: -30px;
}

.medium{
  width: 200px;
  height: 200px;
  left: -100px;
  bottom: -100px;
}

.large{
  width: 400px;
  height: 400px;
  left: -200px;
  bottom: -200px;
}

.xlarge{
  width: 600px;
  height: 600px;
  left: -300px;
  bottom: -300px;
}

.xxlarge{
  width: 800px;
  height: 800px;
  left: -400px;
  bottom: -400px;
}

.shade1{
  opacity: 0.1;
}
.shade2{
  opacity: 0.2;
}

.shade3{
  opacity: 0.3;
}

.shade4{
  opacity: 0.4;
}

.shade5{
  opacity: 0.6;
}

@keyframes ripple{
  0%{
    transform: scale(0.8);
  }

  50%{
    transform: scale(1.2);
  }

  100%{
    transform: scale(0.8);
  }
}

h1,h2,h3,h4,h5,h6 {
    color: #000000;
    font-family: 'Lora', serif;
}

p{
  color: #000000;
  font-family: 'Roboto', sans-serif;
}

.darktheme{
  background-color: #ffffff;
  color: #000000;
}

</style>
