<template>
  <div class="user-list">
    <container>
      <template v-slot:content>
        <search-field
            :enabled="!isLoading"
            :filter="filter"
        />
      </template>
    </container>
    <virtual-list
        :class="[isLoading ? 'preloader' : '', 'user-list__content']"
        :data-key="'id'"
        :data-sources="userList"
        :data-component="UserItem"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';

import UserItem from "@/modules/user/components/UserItem.vue";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VirtualList from 'vue-virtual-scroll-list'
import Container from "@/components/Container.vue";
import SearchField from "@/components/SearchField.vue";

export default Vue.extend({
  methods: {
    ...mapActions(
        'userStore',
        ['setIsLoading', 'fetchUserList'],
    ),

    filter(query: string) {
      console.log(query);
    },
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
    SearchField,
    Container,
    VirtualList,
  }
})

</script>

<style lang="less">
@import "../../../style/global";
.user-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  &__content {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    position: relative;
    min-height: ~"calc(100vh - 120px)";
    max-height: ~"calc(100vh - 120px)";
  }
}
</style>