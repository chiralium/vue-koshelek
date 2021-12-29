<template>
  <div>
    <label>
      Query:
      <input
          type="text"
          :disabled="!enabled"
          v-model="query"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { debounce } from "debounce";

export default Vue.extend({
  props: {
    enabled: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    },
    filter: {
      type: Function,
      required: true,
    },
  },

  data: function() {
    return {
      query: '',
      debounced: debounce(this.filter, 500),
    };
  },

  watch: {
    query: function(newQuery: string) {
      this.debounced(newQuery);
    }
  },
})
</script>