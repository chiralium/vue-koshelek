<template>
  <container>
    <template v-slot:content>
      <ul class="history-list" v-if="sourceList.length > 0">
        <history-item
            v-for="historyItem in sourceList"
            :source="historyItem"
            :key="historyItem.item.id"
        />
      </ul>
      <div v-else class="history-list_empty">
        Empty...
      </div>
    </template>
  </container>
</template>
<script lang="ts">
import Container from "@/components/Container.vue";
import Vue from 'vue';
import {mapGetters} from "vuex";
import HistoryItem from "@/modules/history/components/HistoryItem.vue";
import {History} from "@/modules/history/models";
import {User} from '@/modules/user/models';

export default Vue.extend({
  computed: {
    ...mapGetters('historyStore', [
        'historyList',
        'addingHistoryList',
        'removingHistoryList',
    ]),

    sourceList: function(): History<User> {
      switch (this.filterFactor) {
        case 'adding':
          return this.addingHistoryList;
        case 'removing':
          return this.removingHistoryList;
        default:
          return this.historyList;
      }
    },
  },

  props: {
    filterFactor: String,
  },

  components: {
    HistoryItem,
    Container,
  }
})
</script>

<style lang="less">
.history-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;

  &_empty {
    font-size: 32px;
    text-align: center;
  }
}
</style>