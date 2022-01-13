<template>
  <div class="text-center">
    <span> Enter name or date to get specific information: </span>
    <br />
    <input type="text" v-model="search" />
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
          flight.name.toLowerCase().includes(this.search.toLowerCase()) ||
          flight.date_utc.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  watch: {
    filteredList: function(value) {
      this.$store.commit('apiCall/FETCH_FILTEREDFLIGHTS', value)
    },
  },
};
</script>
