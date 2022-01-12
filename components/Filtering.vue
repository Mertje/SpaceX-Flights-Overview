<template>
  <div class="text-center">
    <!-- Sending fuction to Fetching.vue to recieve API data -->
    <fetching :getData="getFlights" />
    <!-- Sending Filtered information To Flights.vue -->
    {{ getDataFiltered(filteredList) }}
    <span> Enter name or date to get specific information: </span>
    <br />
    <input type="text" v-model="search" />
  </div>
</template>

<script>
import fetching from "./Fetching.vue";

export default {
  name: "filtering",
  data() {
    return {
      search: "",
      completelist: [],
    };
  },
  components: {
    fetching,
  },
  props: {
    getDataFiltered: Function,
  },
  methods: {
    //Get Flights from API Call and store intor new variable
    getFlights(flight) {
      this.completelist = flight;
    },
  },
  computed: {
    filteredList() {
      return this.completelist.filter((flight) => {
        return (
          flight.name.toLowerCase().includes(this.search.toLowerCase()) ||
          flight.date_utc.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
};
</script>
