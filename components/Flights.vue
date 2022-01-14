<template>
  <div id="listing" class="spacex-flights container">
    <ul id="flights">
      <li class="my-4" v-for="flight in this.$store.state.filteredList" :key="flight.id">
        <div style="border-radius: 20px; overflow:hidden;" :class="(flight.upcoming) ? 'd-flex':'d-none older'">
          <!-- Backup img for if api can't find one -->
          <img :src="flight.links.patch.small ? flight.links.patch.small: '/spaceX.jpeg'" :alt="flight.name" />
          <div class="pl-3 py-2 w-100">
            <p class="head-text"> 
              <span>Flight Name: {{ flight.name }} </span>
              <br>
              <!-- Function makes the data look more readable for humans -->
              <span>Launch Date/Time: {{ dataTime(flight.date_utc) }} </span>
            </p>
            <div>
              <b-button v-b-toggle="flight.id" variant="btn btn-outline-primary">Get more information </b-button>
              <b-collapse :id="flight.id" class="my-2 mr-3">
                <b-card>
                  <!-- upcoming flights adding more information about the rocket -->
                  <li class="folded-information" v-for="rockets in that.$store.state.rocketslist" :key="rockets.id">
                    <div v-if="rockets.id === flight.rocket">
                      <img class="img-fluid" :src="rockets.flickr_images[0]" alt="" />
                      <p> 
                        <span>Flight upcoming: {{flight.upcoming}} </span>
                        <br/>
                        <span>Flight Number: {{flight.flight_number}} </span>
                        <br/>
                        <span>Name Project: {{flight.name}} </span>
                        <br/>
                        <span>Name Rocket: {{rockets.name}} </span>
                      </p>
                      <p>{{ flight.details || "No detail is known about the launch" }} </p>
                    </div>
                  </li>
                </b-card>
              </b-collapse>
            </div>
          </div>
        </div>
      </li>
      <button class="btn btn-primary d-block my-0 mx-auto" @click="getOlderLaunches" type="button">More / Less information </button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "flights",
  data() {
    return {
      oldLaunces: false,
      //Calling this inside v-for statement
      that: this
    };
  },
  methods: {
    //Formatting data to look readable for visiters
    dataTime(data) {
      var day = data.split("T");
      var time = day[1].substring(0, 5);
      return day[0] + " -  UTC: " + time;
    },
    //Show or hide older data onclick
    getOlderLaunches(){
      this.oldLaunces = !this.oldLaunces;
      this.oldLaunces ? this.hideOrShow("d-flex", "d-none") : this.hideOrShow("d-none", "d-flex");
    },
    hideOrShow(addclass, removeclass){
      const olderlist = document.getElementsByClassName("older");
      //looping through every older array to add or remove class
      for (let i = 0; i < olderlist.length; i++) {
          olderlist[i].classList.add(addclass);
          olderlist[i].classList.remove(removeclass);
      };
    }
  }
};
</script>