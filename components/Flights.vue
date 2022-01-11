<template>
    <div class="spacex-flights container">
     
     <!--TODO: Make a Filter Component -->
      <div class="text-center">
        <!-- TODO: Better Explanation text to display-->
        <span class=""> Welcome to the SpaceX flights, Here you can find out which flight was when</span>
        <br>
        <span> Enter name or date to get specific information: </span>
        <br>
        <input type="text"  v-model="search" />
      </div>

      <div v-if="filteredList.length == 0"><p> No flights found </p></div>
    
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
export default {
  name: 'Flights',
  props: ['Flights_filtered'],
  data(){
    return {
      flights: [],
      search: ''
    }
  },
  created() { //When document is creating call api. 
    this.getSpaceXdata()
  },
  methods: {
    //add all flights to variable from newest to oldest
    //TODO: Add Api call to diffrent component with error checks.
    async getSpaceXdata(){
          this.flights = await fetch('https://api.spacexdata.com/v4/launches/').then(res => res.json())
          this.flights.reverse()
    },
    //Formatting data to look readable for visiters
    dataTime(data){
      var day = data.split("T")
      var time = day[1].substring(0, 5)
      return day[0] + " -  UTC: " + time 
    },
  },
  computed: {
    //search function for flight and date. IDEA: Filter with checkboxes 
      filteredList() {
        return this.flights.filter(flight => {
          return (
            flight.name.toLowerCase().includes(this.search.toLowerCase()) || 
            flight.date_utc.toLowerCase().includes(this.search.toLowerCase())
          )
        })
      }
    }
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