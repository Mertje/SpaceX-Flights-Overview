<template>
  <div id="listing" class="spacex-flights container">
    <div else>
      <ul>
        <!-- IDEA: add diffrent color to not launched one  -->
        <li class="my-4" v-for="flight in this.$store.state.apiCall.filteredList" :key="flight.id">
          <div class="d-flex">
            <!-- Backup img for if api can't find one -->
            <img :src="flight.links.patch.small ? flight.links.patch.small: '/spaceX.jpeg'":alt="flight.name" />

            <div>
              <p>Name Rocket: {{ flight.name }}</p>
              <p>Flight time {{ dataTime(flight.date_utc) }}</p>
              <!-- IDEA: Add collapse with more information -->
              <p>Information: {{ flight.details || " No information" }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "flights",
  data() {
    return {};
  },
  methods: {
    //Formatting data to look readable for visiters
    dataTime(data) {
      var day = data.split("T");
      var time = day[1].substring(0, 5);
      return day[0] + " -  UTC: " + time;
    },
  },
};
</script>