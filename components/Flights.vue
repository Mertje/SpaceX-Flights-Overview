<template>
  <div id="listing" class="spacex-flights container">
    <ul id="flights" >
      <li class="my-4" v-for="flight in this.$store.state.apiCall.filteredList" :key="flight.id">
        <div :class="(flight.upcoming) ? 'd-flex':'d-none older'">
          <!-- Backup img for if api can't find one -->
          <img :src="flight.links.patch.small ? flight.links.patch.small: '/spaceX.jpeg'" :alt="flight.name" />
          <div class="pl-3 pt-2">
            <p> 
              <span> Name flight: {{ flight.name }} </span>
              <br>
              <span> Name Rocket: {{ flight.rocket }} </span>
              <br>
              <span> Launch time {{ dataTime(flight.date_utc) }} </span>
            </p>
            <div>
              <b-button v-b-toggle="flight.id" variant="primary">Get more information</b-button>
              <b-collapse :id="flight.id" class="my-2 ">
                <b-card>
                  <p class="card-text">{{ flight.details || "No information is known" }}</p>
                </b-card>
              </b-collapse>
            </div>
          </div>
        </div>
      </li>
      <button @click="getOlderLaunches" type="button">More / Less information</button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "flights",
  data() {
    return {
      oldLaunces: false
    };
  },
  methods: {
    //Formatting data to look readable for visiters
    dataTime(data) {
      var day = data.split("T");
      var time = day[1].substring(0, 5);
      return day[0] + " -  UTC: " + time;
    },
    //Show older data onclick
    getOlderLaunches(){
      this.oldLaunces = !this.oldLaunces
      this.oldLaunces ? this.hideOrShow("d-flex", "d-none") : this.hideOrShow("d-none", "d-flex") ;
    },
    hideOrShow(addclass, removeclass){
      const olderlist = document.getElementsByClassName("older")
      for (let i = 0; i < olderlist.length; i++) {
          olderlist[i].classList.add(addclass);
          olderlist[i].classList.remove(removeclass);
      }
    }
  },
};
</script>