export const state = () => ({
  allFlights: [],
  filteredList: []
});

export const mutations = {
  //API fetched data stored
  FETCH_FLIGHTS(state, allF) {
    state.allFlights = allF;
  },
  //Filtered data stored
  FETCH_FILTEREDFLIGHTS(state, filF){
    state.filteredList = filF;
  }
};

export const actions = {
  async getSpaceXdata({ commit }, { self }) {
    const response = await fetch(
      "https://api.spacexdata.com/v4/launches/"
    )
      .then((res) => res.json())
      .catch((error) => console.log(error.statusText));
    //Coomit Data to state
    commit("FETCH_FLIGHTS", response);
  },
};
