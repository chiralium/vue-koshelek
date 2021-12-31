<template>
  <user-list-container :has-search-bar="false">
    <template v-slot:scroll-list>
      <virtual-list
          class="user-list__content"
          :data-key="'id'"
          :data-sources="favoritesList"
          :data-component="UserFavoriteItem"
      />
    </template>
  </user-list-container>
</template>
<script>
import UserListContainer from "../../../components/UserListContainer";
import UserFavoriteItem from "@/modules/favorites/components/UserFavoriteItem";
import {mapGetters} from "vuex";
import Vue from 'vue';

export default Vue.extend({
  computed: {
    ...mapGetters('favoritesStore', [
      'favoritesList',
    ]),
  },

  components: {
    UserListContainer,
  },

  data: function () {
    return {
      UserFavoriteItem,
    }
  },
});
</script>