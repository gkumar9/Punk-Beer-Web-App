<template>
   <div id="app">
      <nav class="navbar" role="navigation" aria-label="main navigation">
         <a class="navbar-item" @click="route('/')">
            <h1>Punk Beer Web App</h1>
         </a>
         <div class="navbar-end">
            <div class="navbar-item">
               <a @click="route('/')"><span>Home</span></a>
            </div>
            <div class="navbar-item">
               <a @click="route('/favourite')" ><span>Favourite</span></a>
            </div>
         </div>
      </nav>
      <router-view/>
   </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods:{
    route(rot){
      this.$router.push(rot)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
 .navbar{
    background-color: #00d1b2;
  }
  h1{
  font-size: x-large;
 }
</style>
