<template>
  <user-list-container>
    <template v-slot:search-field>
      <search-field
          :enabled="!isLoading"
          :filter="filter"
      />
    </template>
    <template v-slot:search-sorting>
      <button :disabled="currentSort === 'DESC'" @click="setSorting('DESC')">▼</button>
      <button :disabled="currentSort === 'ASC'" @click="setSorting('ASC')">▲</button>
    </template>
    <template v-slot:search-results>
      <div v-if="hasSearchResult">
        <b>Results: {{ filteredList.length }}</b>
      </div>
    </template>
    <template v-slot:scroll-list>
      <virtual-list
          :class="[isLoading ? 'preloader' : '', 'user-list__content']"
          :data-key="'id'"
          :data-sources="filteredList"
          :data-component="UserItem"
          :data-props="{
            isFavoriteItem: false,
          }"
      />
    </template>
  </user-list-container>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters} from 'vuex';

import UserItem from "@/modules/user/components/UserItem.vue";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VirtualList from 'vue-virtual-scroll-list'
import SearchField from "@/components/SearchField.vue";
import UserListContainer from "@/components/UserListContainer.vue";

export default Vue.extend({
  methods: {
    ...mapActions('userStore', [
      'setIsLoading',
      'fetchUserList',
      'setSearchQuery',
      'setSorting',
    ]),

    filter(query: string) {
      this.setSearchQuery(query)
    },
  },

  mounted() {
    this.fetchUserList();
  },

  computed: {
    ...mapGetters('userStore', [
      'isLoading',
      'userList',
      'searchQuery',
      'filteredList',
      'totalOccurrences',
      'currentSort',
    ]),

    hasSearchResult: function(): boolean {
      return this.totalOccurrences !== 0
    },
  },

  data: function () {
    return {
      UserItem,
    }
  },

  components: {
    UserListContainer,
    SearchField,
    VirtualList,
  }
})

</script>