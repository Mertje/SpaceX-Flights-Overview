<template>
  <!-- Sending Api Data to Filtering.vue -->
  <div>{{ getData(allFlights) }}</div>
</template>

<script>
export default {
  name: "Fetching",
  props: {
    getData: Function,
  },
  data() {
    return {
      // All of the SpaceX space laucnes since the last
      allFlights: [],
    };
  },
  created() {
    //when component is called execute:
    this.getSpaceXdata();
  },
  methods: {
    //add all flights to variable from newest to oldest
    async getSpaceXdata() {
      this.allFlights = await fetch("https://api.spacexdata.com/v4/launches/")
      .then((res) => res.json());
      this.allFlights.reverse();
    },
  },
};
</script>
