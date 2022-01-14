<template>
  <div class="text-center mt-3">
    <span> Enter name or date to get specific information: </span>
    <br />
    <input class="rounded" type="text" v-model="search" placeholder="Search" />
    <br />
    <span>Total results: {{ filteredList.length }} </span>
  </div>
</template>

<script>
export default {
  name: "filters",
  data() {
    return {
      search: "",
    };
  },
  fetch() {
    this.$store.dispatch("apiCall/getSpaceXdata", { self: this });
  },
  computed: {
    filteredList() {
      return this.$store.state.apiCall.allFlights.filter((flight) => {
        return (
          flight.date_utc.toLowerCase().includes(this.search.toLowerCase()) ||
          flight.id.toLowerCase().includes(this.search.toLowerCase()) ||
          flight.name.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  watch: {
    //Store filtered data back in to apiCall.js
    filteredList: function (value) {
      this.$store.commit("apiCall/FETCH_FILTEREDFLIGHTS", value.reverse());
    },
  },
};
</script>