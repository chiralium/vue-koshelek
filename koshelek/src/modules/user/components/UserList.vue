<template>
  <div class="user-list">
    <div class="user-list__toolbar">
      <container>
        <template v-slot:content>
          <div class="user-list__search">
            <search-field
                :enabled="!isLoading"
                :filter="filter"
            />
            <div v-if="totalOccurrences !== 0">
              <b>Results: {{ filteredList.length }}</b>
            </div>
          </div>
        </template>
      </container>
      <container>
        <template v-slot:content>
          <div class="user-list__sorting">
            <button :disabled="currentSort === 'DESC'" @click="setSorting('DESC')">▼</button>
            <button :disabled="currentSort === 'ASC'" @click="setSorting('ASC')">▲</button>
          </div>
        </template>
      </container>
    </div>
    <virtual-list
        :class="[isLoading ? 'preloader' : '', 'user-list__content']"
        :data-key="'id'"
        :data-sources="filteredList"
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
        ['setIsLoading', 'fetchUserList', 'setOccurrences', 'setSearchQuery', 'setSorting'],
    ),

    filter(query: string) {
      this.setSearchQuery(query)
    },
  },

  mounted() {
    this.fetchUserList();
  },

  computed: {
    ...mapGetters(
        'userStore',
        [
          'isLoading',
          'userList',
          'searchQuery',
          'filteredList',
          'totalOccurrences',
          'currentSort',
        ],
    ),
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

  &__toolbar {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 120px;
    gap: 12px;
  }

  &__sorting {
    display: flex;
    justify-content: center;
  }

  &__search {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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