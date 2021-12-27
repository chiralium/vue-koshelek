import Vue from 'vue'
import Vuex from 'vuex'

import CountryStore from '@/modules/country/store';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    countryStore: {
      namespaced: true,
      ...CountryStore,
    },
  }
});
