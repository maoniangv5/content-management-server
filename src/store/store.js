import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

const state = {
  imgUToken: ''
}

const mutations = {
  updateToken(state, token) {
    state.imgUToken = token
  }
}

export default new Vuex.Store({
  state, mutations
});
