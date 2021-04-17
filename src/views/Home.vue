<template>
  <div class="home">
<h2>  <i class="fas fa-graduation-cap size: 27x"></i> </h2>
  <h1>  Welcome! </h1>

<div class="home">
<router-link :to="{ name: 'courses_index' }">  <b-card img-src="https://cdn.dribbble.com/users/1751513/screenshots/10568622/media/09ce5727adfb5fd8f0a41527737204b6.png?compress=1&resize=800x600" img-alt="Card image" img-right>
      <b-card-text>
         <h2>Courses</h2>
      </b-card-text>
    </b-card></router-link>
</div>

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

.circle{
  position: absolute;
  border-radius: 50%;
  background: #3399ff;
  animation: ripple 15s infinite;
  box-shadow: 0px 0px 1px 0px #3399ff;
}

.small{
  width: 200px;
  height: 200px;
  left: -100px;
  bottom: -100px;
}

.medium{
  width: 400px;
  height: 400px;
  left: -200px;
  bottom: -200px;
}

.large{
  width: 600px;
  height: 600px;
  left: -300px;
  bottom: -300px;
}

.xlarge{
  width: 800px;
  height: 800px;
  left: -400px;
  bottom: -400px;
}

.xxlarge{
  width: 1000px;
  height: 1000px;
  left: -500px;
  bottom: -500px;
}

.shade1{
  opacity: 0.2;
}
.shade2{
  opacity: 0.5;
}

.shade3{
  opacity: 0.7;
}

.shade4{
  opacity: 0.8;
}

.shade5{
  opacity: 0.9;
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

</style>
