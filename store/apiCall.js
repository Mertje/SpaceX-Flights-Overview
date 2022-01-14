export const state = () => ({
  allFlights: [],
  filteredList: [],
  rocketslist: [],
});

export const mutations = {
  //API fetched data stored
  FETCH_FLIGHTS(state, allF) {
    state.allFlights = allF;
  },
  //Filtered data stored
  FETCH_FILTEREDFLIGHTS(state, filF) {
    state.filteredList = filF;
  },
  //API rocket data fetched
  FETCH_ROCKETS(state, rocF) {
    state.rocketslist = rocF;
  },
};

export const actions = {
  async getSpaceXdata({ commit }, { self }) {
    const respLaunches = await fetch("https://api.spacexdata.com/v4/launches/")
      .then((res) => res.json())
      .catch((error) => console.log(error.statusText));

    const respRockets = await fetch("https://api.spacexdata.com/v4/rockets/")
      .then((res) => res.json())
      .catch((error) => console.log(error.statusText));
    //Coomit Data to state
    commit("FETCH_FLIGHTS", respLaunches);
    //Coomit Data to state
    commit("FETCH_ROCKETS", respRockets);
  },
};
