<template>
  <li>
    <history-item-container>
      <template v-slot:item>
        <user-item-container>
          <template v-slot:image>
            <img :src="source.item.picture.thumbnail"  :alt="source.name"/>
          </template>
          <template v-slot:name>
            {{source.item.name}}
          </template>
        </user-item-container>
      </template>
      <template v-slot:type>
        <div :data-type="source.type">
          {{source.type}}
        </div>
      </template>
      <template v-slot:date>
        {{source.datetime.toTimeString()}}
      </template>
    </history-item-container>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';
import {History} from "@/modules/history/models";
import UserItemContainer from "@/components/UserItemContainer.vue";
import HistoryItemContainer from "@/components/HistoryItemContainer.vue";

export default Vue.extend({
  components: {
    HistoryItemContainer,
    UserItemContainer,
  },
  props: {
    source: {
      type: History,
    }
  },
})
</script>

<style>
[data-type="ADDING_TO_FAVORITES"] {
  color: green;
  font-weight: bold;
}

[data-type="REMOVING_FROM_FAVORITES"] {
  color: cornflowerblue;
  font-weight: bold;
}
</style>