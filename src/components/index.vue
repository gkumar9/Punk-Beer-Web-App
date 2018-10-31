<template>
   <div>
      <div class="field">
         <div class="columns">
            <div class="column is-1 is-offset-2"></div>
            <div class="column">
               <input v-on:keypress.enter="apisearch()" class="input is-medium" v-model="search" type="text" placeholder="Search for beer name...">
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
            <div class="column is-4" v-for="(i, inx) in allbeers">
               <div class="card">
                  <div class="card-content">
                     <span style="float:right"  class="change-icon">
                     <i :id="'star-'+ inx" @click="fav(i,'star-'+ inx)" class="far fa-star"></i>
                     <!-- <i class="fas fa-star"></i> -->
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
               </div>
            </div>
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
  methods: {
        bottomVisible() {
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },
        clearapisearch() {
            axios.get('https://api.punkapi.com/v2/beers')
                .then((res) => {
                    this.allbeers = res.data
                    this.search = ''
                    this.noresult = false
                })
        },
        apisearch() {
            if (this.search != '') {
                axios.get('https://api.punkapi.com/v2/beers?beer_name=' + this.search)
                    .then((res) => {
                        this.allbeers = res.data
                        if (res.data.length == 0) {
                            this.noresult = true;
                        }
                    })
            }

        },
        fav(item, id) {

            let temp = false;
            for (let i = 0; i < this.$store.state.favourite.length; i++) {
                if (item.id == this.$store.state.favourite[i].id) {
                    temp = true;
                    document.getElementById(id).classList.remove('fas')
                    document.getElementById(id).classList.add('far')
                    this.$store.state.favourite.splice(i, 1)
                    break;
                }
            }
            if (!temp) {

                this.$store.state.favourite.push(item)
                document.getElementById(id).classList.remove('far')
                document.getElementById(id).classList.add('fas')
            }
        },
        checkfav() {
            for (let i = 0; i < this.allbeers.length; i++) {
                for (let j = 0; j < this.$store.state.favourite.length; j++) {
                    if (this.allbeers[i].id == this.$store.state.favourite[j].id) {
                        document.getElementById('star-' + i).classList.remove('far')
                        document.getElementById('star-' + i).classList.add('fas')
                    }
                }
            }
        }
  },
  watch: {
      bottom(bottom) {
          if (bottom) {
              this.page++;
              axios.get('https://api.punkapi.com/v2/beers?page=' + this.page)
                  .then((res) => {
                      this.allbeers = this.allbeers.concat(res.data)
                  })
          }
      }
  },
  async created() {
          await axios.get('https://api.punkapi.com/v2/beers')
              .then((res) => {
                  this.noresult = false
                  this.page = 1;
                  this.allbeers = res.data
              })
          this.checkfav()
          window.addEventListener('scroll', () => {
              this.bottom = this.bottomVisible()
          })
  },
  filters: {
      trimDescription(value) {
          if (value.length >= 100) {
              return value = value.substr(0, 100) + '...'
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
h1{
  font-size: x-large;
 }
</style>
