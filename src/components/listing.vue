<template>
   <div>
      <h1>Listing Favourite's</h1>
      <div class="container">
         <div class="columns is-multiline">
            <div class="column is-4" v-for="(i,inx) in allbeers">
               <div class="card">
                  <div class="card-content">
                     <span style="float:right" class="change-icon">
                        <!-- <i class="fas fa-star"></i> -->
                         <i :id="'star-'+ inx" @click="fav(i,'star-'+ inx)" class="fas fa-star"></i>
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
import swal from 'sweetalert'
export default {
  name: 'listing',
  data () {
    return {
      allbeers:[]
    }
  },
  methods: {
        fav(item, id) {
            for (let i = 0; i < this.$store.state.favourite.length; i++) {
                if (item.id == this.$store.state.favourite[i].id) {
                    this.$store.state.favourite.splice(i, 1)
                    break;
                }
            }
            if (this.$store.state.favourite.length == 0) {
                swal('No favourite Found !!! Routing to search Page')
                    .then(() => {
                        this.$router.push('/')
                    })
            }


        }
    },
  created() {
      if (this.$store.state.favourite.length == 0) {
          swal('No favourite Found !!! Routing to search Page')
              .then(() => {
                  this.$router.push('/')
              })
      }
      this.allbeers = this.$store.state.favourite
  },
  filters: {
      trimDescription(value) {
          if (value.length >= 150) {
              return value = value.substr(0, 150) + '...'
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
