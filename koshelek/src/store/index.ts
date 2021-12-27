import Vue from 'vue'
import Vuex from 'vuex'

import CountryStore from '@/store/country-store';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    countryStore: CountryStore,
  }
});
