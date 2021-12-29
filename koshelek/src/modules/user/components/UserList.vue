<template>
  <ul :class="[isLoading ? 'preloader' : '', 'user-list']">
    <li v-for="user in userList" v-bind:key="user.email + user.name">
      <user-item :user="user"/>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';

import UserItem from "@/modules/user/components/UserItem.vue";

export default Vue.extend({
  methods: {
    ...mapActions(
        'userStore',
        ['setIsLoading', 'fetchUserList'],
    ),
  },

  computed: {
    ...mapGetters(
        'userStore',
        ['isLoading', 'userList'],
    ),
  },

  mounted() {
    this.fetchUserList();
  },

  components: {
    UserItem,
  }
})

</script>

<style lang="less">
@import "../../../style/global";

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  overflow-y: scroll;
  min-height: ~"calc(100vh - 64px)";
  max-height: ~"calc(100vh - 64px)";
  position: relative;
}
</style>