<template>
  <virtual-list
      :class="[isLoading ? 'preloader' : '', 'user-list']"
      :data-key="'id'"
      :data-sources="userList"
      :data-component="UserItem"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';

import UserItem from "@/modules/user/components/UserItem.vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VirtualList from 'vue-virtual-scroll-list'

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

  data: function () {
    return {
      UserItem,
    }
  },

  components: {
    VirtualList,
  }
})

</script>

<style lang="less">
@import "../../../style/global";

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  min-height: ~"calc(100vh - 64px)";
  max-height: ~"calc(100vh - 64px)";
  position: relative;
}
</style>