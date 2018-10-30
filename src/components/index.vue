<template>
<div>
    <div class="field">
    <div class="columns">
      <div class="column is-1 is-offset-2"></div>
      <div class="column">
        <input class="input is-medium" v-model="search" type="text" placeholder="Search for beer name...">
      </div>
      <div class="column">
        <button style="float: left;" @click="apisearch()" class="button is-medium is-info">Search</button>
        <button style="float: left;margin-left: 10px" @click="clearapisearch()" class="button is-medium is-danger">Clear</button>
      </div>
    </div>
    </div>
    <div class="container">
    <div v-if="noresult">
      <h1>No Results Found ...</h1>
    </div>
    <div class="columns is-multiline">

      <div class="column is-4" v-for="i in allbeers">
      <div class="card">
      <div class="card-content">
      <span style="float:right" @click="fav(i,$event)" class="change-icon">
        <i class="far fa-star"></i>
        <i class="fas fa-star"></i>
      </span>
        <div class="content">
          <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img  style="width: 100%;" :src="i.image_url" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{i.name}}</p>
            <p class="media-content1">{{i.description | trimDescription}}</p>
          </div>
        </div>
        </div>
      </div>
    </div></div>

    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'index',
  data () {
    return {
      allbeers:[],
      search:'',
      noresult:false,
      page:'',
      bottom:false
    }
  },
  methods:{
    bottomVisible() {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    clearapisearch(){
      axios.get('https://api.punkapi.com/v2/beers')
    .then((res)=>{
      this.allbeers=res.data
      this.search=''
      this.noresult=false
    })
    },
    apisearch(){
      if(this.search!=''){
        axios.get('https://api.punkapi.com/v2/beers?beer_name='+this.search)
        .then((res)=>{
          this.allbeers=res.data
          if(res.data.length==0){
            this.noresult=true;
          }
        })
      }
      
    },
    fav(item){
      let temp=false;
      for(let i=0;i<this.$store.state.favourite.length;i++){
        if(item.id==this.$store.state.favourite[i].id){
          temp=true;
          break;
        }
      }
      if(!temp){
        
      this.$store.state.favourite.push(item)
      }
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.page++;
        axios.get('https://api.punkapi.com/v2/beers?page='+this.page)
        .then((res)=>{
          this.allbeers=this.allbeers.concat(res.data)
        })
      }
    }
  },
  created(){
    axios.get('https://api.punkapi.com/v2/beers')
    .then((res)=>{
      this.noresult=false
      this.page=1;
      this.allbeers=res.data
    })
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  },
  filters: {
    trimDescription(value) {
      if(value.length>=150){
        return value=value.substr(0,150)+'...'
      } else {
        return value
      }
    }
  }
}
</script>
<style scoped>
 .field{
  margin: 20px;
 }
 .card{
  width: 100%;
  height: 250px;
 }
.change-icon > .far + .fas,
.change-icon:hover > .far {
  display: none;
}
.change-icon:hover > .far + .fas {
  display: inherit;
}
h1{
  font-size: x-large;
 }
</style>
