<template>
    <div id="listing" class="spacex-flights container">
            <filtering :getDataFiltered="myFun"/>

<div v-if="filteredList.length == 0 || filteredList === undifined"><p> No flights found </p></div>
    
     <div else>
        <ul>
          <!-- IDEA: add diffrent color to not launched one  -->
         <li class="my-4" v-for="flight in filteredList" :key="flight.id" >
           <div class="d-flex">
             <!-- Backup img for if api can't find one -->
             <img :src="flight.links.patch.small ? flight.links.patch.small : '/spaceX.jpeg' " :alt="flight.name" />
              
              <div>
                <p>Name Rocket: {{flight.name}}</p>
                <p>Flight time {{ dataTime(flight.date_utc) }}</p>
                <!-- IDEA: Add collapse with more information -->
                <p>Information: {{flight.details || " No information"}}</p>
              </div>

            </div>
            </li>
       </ul>
     </div>

    </div>
</template>

<script>
import filtering from "./Filtering.vue"


export default {
  name: 'Flights',
  data(){
    return {
       filteredList: []
     }
    },
  methods: {
    //Formatting data to look readable for visiters
    dataTime(data){
      var day = data.split("T")
      var time = day[1].substring(0, 5)
      return day[0] + " -  UTC: " + time 
    },
    // Get data from filtered.vue and store in new local variable
    myFun(dat){
      this.filteredList = dat
    }
  },
  components : { 
        filtering 
    },
}
</script>

<style>
 /* Simple styling. TODO: Add style to global style list  */
  .spacex-flights li {
    background-color: #eee;
  }
  .spacex-flights ul {
    list-style-type: none;
  }
  .spacex-flights img {
    max-width: 200px;
    height: fit-content;
  }
  /* TODO: Better styling, looks like 90s website*/ 
</style>