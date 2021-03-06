import Vue from 'vue'
import Vuex from 'vuex'

import userStore from "@/modules/user/store";
import favoritesStore from '@/modules/favorites/store';
import historyStore from '@/modules/history/store';
import {historyPluginListener} from "@/modules/history/store/plugins";

Vue.use(Vuex)

export default new Vuex.Store({
  state: null,
  modules: {
    userStore,
    favoritesStore,
    historyStore,
  },
  plugins: [
    historyPluginListener,
  ]
});
