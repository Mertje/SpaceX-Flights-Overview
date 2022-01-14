<template>
  <div class="text-center mt-3">
    <span>Enter launch name or launch date: </span>
    <br />
    <input class="rounded my-2 text-center" type="text" v-model="search" placeholder="Search" />
    <br />
    <!-- Better view off the total in array  -->
    <span>Total results: {{ filteredList.length }} </span>
  </div>
</template>

<script>
export default {
  name: "filters",
  data() {
    return {
      search: "",
      that: this,
    };
  },
  fetch() {
    //doule API call. Calling launces and rockets
    this.$store.dispatch("getSpaceXdata", { self: this });
  },
  computed: {
    //get Id by rocket name
    getFlightSearch() {
      return this.$store.state.rocketslist.filter((space) => {
        return space.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    //realtime filtering input box
    filteredList() {
      return this.$store.state.allFlights.filter((flight) => {
        return (
          flight.date_utc.toLowerCase().includes(this.search.toLowerCase()) ||
          flight.id.toLowerCase().includes(this.search.toLowerCase()) ||
          flight.name.toLowerCase().includes(this.search.toLowerCase()) ||
          flight.rocket.toLowerCase().includes(this.getFlightSearch[0].id)
        );
      });
    },
  },
  watch: {
    //Store filtered data back in to index.js
    filteredList: function (value) {
      this.$store.commit("FETCH_FILTEREDFLIGHTS", value.reverse());
    },
  },
};
</script>