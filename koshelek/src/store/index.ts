import Vue from 'vue'
import Vuex from 'vuex'
import userStore from "@/modules/user/store";
import favoritesStore from '@/modules/favorites/store';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore,
    favoritesStore,
  }
});
