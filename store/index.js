export const state = () => ({
  allFlights: [],
  filteredList: [],
  rocketslist: []
});

export const mutations = {
  //API fetched data stored
  FETCH_FLIGHTS(state, allApiFlights) {
    state.allFlights = allApiFlights;
  },
  //Filtered data stored
  FETCH_FILTEREDFLIGHTS(state, allFilteredFlights) {
    state.filteredList = allFilteredFlights;
  },
  //API rocket data fetched
  FETCH_ROCKETS(state, allApiRockets) {
    state.rocketslist = allApiRockets;
  }
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
  }
};